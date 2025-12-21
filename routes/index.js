const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const { auth } = require('../config/jwt');

// Auth
router.post('/register', authController.register);
router.post('/login', authController.login);

// Trips (public read)
router.route('/trips')
  .get(tripsController.tripsList)
  .post(auth, tripsController.tripsAddTrip); // protected add

router.route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(auth, tripsController.tripsUpdateTrip)
  .delete(auth, tripsController.tripsDeleteTrip);

module.exports = router;
