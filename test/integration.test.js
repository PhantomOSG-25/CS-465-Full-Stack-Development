'use strict';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'integration-test-secret-that-is-not-used-outside-tests';
process.env.ALLOW_REGISTRATION = 'true';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

const seedTrips = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'trips.json'), 'utf8')
);

let database;
let app;

test.before(async () => {
  database = await MongoMemoryServer.create();
  process.env.MONGODB_URI = database.getUri('travlr');

  app = require('../app');
  await mongoose.connection.asPromise();
  await mongoose.model('trips').insertMany(seedTrips);
});

test.after(async () => {
  await mongoose.disconnect();
  await database.stop();
});

test('complete administrator and trip-management workflow', async () => {
  const client = request(app);
  const credentials = {
    name: 'Portfolio Reviewer',
    email: 'reviewer@example.invalid',
    password: 'correct horse battery staple'
  };

  const list = await client.get('/api/trips').expect(200);
  assert.equal(list.body.length, seedTrips.length);

  const publicPage = await client.get('/travel').expect(200);
  assert.match(publicPage.text, /Gale Reef/);
  assert.match(publicPage.text, /gale-reef\.jpg/);

  await client
    .post('/api/register')
    .send({ ...credentials, password: 'too-short' })
    .expect(400);

  const registration = await client
    .post('/api/register')
    .send(credentials)
    .expect(200);
  assert.equal(typeof registration.body.token, 'string');

  await client.post('/api/register').send(credentials).expect(409);

  await client
    .post('/api/login')
    .send({ email: credentials.email, password: 'incorrect password' })
    .expect(401);

  const login = await client
    .post('/api/login')
    .send({ email: credentials.email, password: credentials.password })
    .expect(200);
  const token = login.body.token;
  assert.equal(typeof token, 'string');

  const newTrip = {
    code: 'TEST270901',
    name: 'Integration Reef',
    length: '2 nights / 3 days',
    start: '2027-09-01T08:00:00Z',
    resort: 'Test Harbor · 4 stars',
    perPerson: 649,
    image: 'gale-reef.jpg',
    description: 'A temporary trip created by the automated integration workflow.'
  };

  const unauthorized = await client
    .post('/api/trips')
    .send(newTrip)
    .expect('Content-Type', /json/)
    .expect(401);
  assert.match(unauthorized.body.message, /authorization token/i);

  const created = await client
    .post('/api/trips')
    .set('Authorization', `Bearer ${token}`)
    .send(newTrip)
    .expect(201);
  assert.equal(created.body.code, newTrip.code);

  const updated = await client
    .put(`/api/trips/${newTrip.code}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ ...newTrip, perPerson: 699 })
    .expect(200);
  assert.equal(updated.body.perPerson, 699);

  const retrieved = await client.get(`/api/trips/${newTrip.code}`).expect(200);
  assert.equal(retrieved.body.perPerson, 699);

  await client
    .delete(`/api/trips/${newTrip.code}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204);

  await client.get(`/api/trips/${newTrip.code}`).expect(404);
});
