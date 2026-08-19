'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const seedPath = path.join(__dirname, '..', 'data', 'trips.json');

test('trip seed file contains valid, complete records', () => {
  const trips = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  const requiredFields = [
    'code',
    'name',
    'length',
    'start',
    'resort',
    'perPerson',
    'image',
    'description'
  ];

  assert.ok(Array.isArray(trips));
  assert.ok(trips.length > 0);

  const codes = new Set();
  for (const trip of trips) {
    for (const field of requiredFields) {
      assert.ok(trip[field] !== undefined && trip[field] !== '', `${field} is required`);
    }

    assert.equal(codes.has(trip.code), false, `duplicate trip code: ${trip.code}`);
    codes.add(trip.code);
    assert.ok(Number(trip.perPerson) >= 0);
    assert.equal(Number.isNaN(Date.parse(trip.start)), false);
  }
});
