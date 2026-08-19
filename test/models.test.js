'use strict';

process.env.JWT_SECRET = 'test-only-secret-that-is-not-used-outside-tests';

const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

require('../app_api/models/travlr');
require('../app_api/models/users');

const Trip = mongoose.model('trips');
const User = mongoose.model('User');

test('trip model accepts valid seed-shaped data', async () => {
  const trip = new Trip({
    code: 'TEST100',
    name: 'Test Journey',
    length: '2 nights',
    start: new Date('2030-01-01T00:00:00Z'),
    resort: 'Test Resort',
    perPerson: 499,
    image: 'test.jpg',
    description: 'A test trip'
  });

  await assert.doesNotReject(() => trip.validate());
});

test('trip model rejects a negative price', async () => {
  const trip = new Trip({
    code: 'TEST101',
    name: 'Invalid Journey',
    length: '2 nights',
    start: new Date('2030-01-01T00:00:00Z'),
    resort: 'Test Resort',
    perPerson: -1,
    image: 'test.jpg',
    description: 'A test trip'
  });

  await assert.rejects(
    () => trip.validate(),
    (err) => Boolean(err.errors?.perPerson)
  );
});

test('user password hash validates the correct password only', () => {
  const user = new User({ name: 'Test User', email: 'test@example.invalid' });
  user.setPassword('correct horse battery staple');

  assert.equal(user.validPassword('correct horse battery staple'), true);
  assert.equal(user.validPassword('incorrect password'), false);
  assert.notEqual(user.hash, 'correct horse battery staple');
});

test('generated JWT contains identity and expiration claims', () => {
  const user = new User({ name: 'Test User', email: 'test@example.invalid' });
  user.setPassword('correct horse battery staple');

  const payload = jwt.verify(user.generateJWT(), process.env.JWT_SECRET);
  assert.equal(payload.email, 'test@example.invalid');
  assert.equal(payload.name, 'Test User');
  assert.ok(payload.exp > Math.floor(Date.now() / 1000));
});
