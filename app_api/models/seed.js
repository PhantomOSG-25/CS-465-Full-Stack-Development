const path = require('path');
const fs = require('fs');

const Mongoose = require('./db');
const Trip = require('./travlr');

const seedPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
const trips = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

seedDB()
    .then(() => console.log(`Seeded ${trips.length} trips`))
    .catch((err) => {
        console.error('Unable to seed trips:', err.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await Mongoose.connection.close();
    });
