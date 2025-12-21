const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

router.use((req, res, next) => {
  console.log('API ROUTER HIT:', req.method, req.originalUrl);
  next();
});

router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip);

module.exports = router;
