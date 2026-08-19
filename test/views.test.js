'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const handlebars = require('hbs').handlebars;

const root = path.join(__dirname, '..');
const views = path.join(root, 'app_server', 'views');
const seedTrips = JSON.parse(
  fs.readFileSync(path.join(root, 'data', 'trips.json'), 'utf8')
);

handlebars.registerPartial(
  'header',
  fs.readFileSync(path.join(views, 'partials', 'header.hbs'), 'utf8')
);
handlebars.registerPartial(
  'footer',
  fs.readFileSync(path.join(views, 'partials', 'footer.hbs'), 'utf8')
);
handlebars.registerHelper('formatDate', (value) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(value))
);
handlebars.registerHelper('formatCurrency', (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(Number(value) || 0)
);

function render(view, context) {
  const source = fs.readFileSync(path.join(views, view), 'utf8');
  return handlebars.compile(source)(context);
}

test('public Handlebars pages render with their expected content', () => {
  const shared = { adminBaseUrl: 'http://localhost:4200' };
  const home = render('index.hbs', { ...shared, title: 'Travlr Getaways' });
  const travel = render('travel.hbs', {
    ...shared,
    title: 'Explore trips',
    trips: seedTrips
  });
  const error = render('error.hbs', {
    ...shared,
    status: 404,
    message: 'Not Found'
  });

  assert.match(home, /The water is calling\./);
  assert.match(travel, /Gale Reef/);
  assert.match(travel, /\$799/);
  assert.match(error, /Error 404/);
  assert.doesNotMatch(`${home}${travel}${error}`, /{{[^}]+}}/);
});

test('every seed image exists in both runtime clients', () => {
  assert.equal(
    fs.existsSync(path.join(root, 'public', 'images', 'hero-coast.jpg')),
    true
  );

  for (const trip of seedTrips) {
    assert.equal(
      fs.existsSync(path.join(root, 'public', 'images', trip.image)),
      true,
      `missing public image: ${trip.image}`
    );
    assert.equal(
      fs.existsSync(path.join(root, 'app_admin', 'src', 'assets', 'images', trip.image)),
      true,
      `missing admin image: ${trip.image}`
    );
  }
});
