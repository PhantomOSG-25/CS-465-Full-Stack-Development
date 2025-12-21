const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(404).json(err);
  }
};

// GET: /api/trips/:tripCode
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode });

    if (!trip) {
      return res.status(404).json({ message: 'tripCode not found' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(404).json(err);
  }
};

// POST: /api/trips
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    const q = await newTrip.save();
    return res.status(201).json(q);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// PUT: /api/trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
  try {
    const q = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true, runValidators: true }
    ).exec();

    if (!q) {
      return res.status(404).json({ message: 'tripCode not found' });
    }

    return res.status(200).json(q);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};
