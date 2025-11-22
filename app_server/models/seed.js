const Mongoose = require('./db');   // this loads db.js and triggers connect()
const Trip = require('./travlr');

const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
}).catch(err => {
    console.error('Seeding error:', err);
    process.exit(0);
});
