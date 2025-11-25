const Mongoose = require('./db');   // this loads db.js and triggers connect()
const Trip = require('./travlr');

//Read seed data from json file
var fs = require('fs');
var trips = json.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});
