// app_api/controllers/trips.js
const mongoose = require('mongoose');

// Register the model
require('../models/travlr'); 

// Get model
const Trip = mongoose.model('trips');

// GET /api/trips - list all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip
      .find({})
      .exec();

    return res
      .status(200)
      .json(trips);

  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error fetching trips', error: err.message });
  }
};

// GET: /api/trips - list a single trip
// Regardless of outcome, response must include HTML status code
//and json message to the requesting client

const tripsFindByCode = async (req, res) => {
  const tripCode = req.params.tripCode; // must match your route definition

  try {
    const trip = await Trip
      .findOne({ code: tripCode })
      .exec();

    // Uncomment to see result in console
    // console.log(trip);

    if (!trip) { // Database returned no data
      return res
        .status(404)
        .json({ message: `Trip with code ${tripCode} not found` });
    } else { // Return resulting trip
      return res
        .status(200)
        .json(trip);
    }

  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error fetching trip', error: err.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode

};
