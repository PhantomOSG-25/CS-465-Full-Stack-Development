const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const auth = require('../config/jwt');

// Trips (public read)
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(auth, tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(auth, tripsController.tripsUpdateTrip)
  .delete(auth, tripsController.tripsDeleteTrip);

// Auth
router.post('/login', authController.login);

if (process.env.ALLOW_REGISTRATION === 'true') {
  router.post('/register', authController.register);
}

module.exports = router;
