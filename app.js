var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Connect to MongoDB via Mongoose
require('dotenv').config();
require('./app_api/models/db');
require('./app_api/config/passport');

// Define routers
var indexRouter = require('./app_server/routes/index');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');

var handlebars = require('hbs');

var app = express();

const passport = require('passport');

// Disable etags so Angular never gets 304 with empty body
app.set('etag', false);

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// register handlebars partials
handlebars.registerPartials(__dirname + '/app_server/views/partials');
handlebars.registerHelper('formatDate', (value) => {
  if (!value) return '';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(value));
});
handlebars.registerHelper('formatCurrency', (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(Number(value) || 0)
);

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:4200';
const adminBaseUrl = process.env.ADMIN_BASE_URL || 'http://localhost:4200';

app.use((req, res, next) => {
  res.locals.adminBaseUrl = adminBaseUrl;
  next();
});

// API CORS and cache policy for the Angular client.
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', clientOrigin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  res.header('Surrogate-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// routes
app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  const status = err.status || 500;

  if (req.originalUrl.startsWith('/api')) {
    const message = status >= 500 ? 'Internal server error' : err.message;
    return res.status(status).json({ message });
  }

  res.locals.message = err.message;
  res.locals.status = status;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(status);
  res.render('error');
});

module.exports = app;
