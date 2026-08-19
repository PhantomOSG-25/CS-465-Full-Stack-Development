
const mongoose = require('mongoose');

// Define the trip schema
const tripSchema = new mongoose.Schema({
    code:  { type: String, required: true, unique: true, trim: true, index: true },
    name:  { type: String, required: true, trim: true, index: true },
    length: { type: String, required: true, trim: true },
    start: { type: Date, required: true },
    resort: { type: String, required: true, trim: true },
    perPerson: { type: Number, required: true, min: 0 },
    image: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
});

const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;
