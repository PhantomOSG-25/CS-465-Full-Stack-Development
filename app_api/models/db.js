const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/travlr';
const readline = require('readline');

const connect = async () => {
    try {
        await mongoose.connect(dbURI, { serverSelectionTimeoutMS: 5000 });
    } catch (err) {
        console.error('Unable to connect to MongoDB:', err.message);
    }
};

// Monitor connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected');
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Windows specific listener
if (process.platform === 'win32' && process.env.NODE_ENV !== 'test') {
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r1.on('SIGINT', () => {
        process.emit("SIGINT");
    });
}

// Configure for Graceful Shutdown
const gracefulShutdown = async (msg) => {
    await mongoose.connection.close();
    console.log(`Mongoose disconnected through ${msg}`);
};

// Event Listeners for graceful shutdowns
process.once('SIGUSR2', async () => {
    await gracefulShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', async () => {
    await gracefulShutdown('app termination');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await gracefulShutdown('app shutdown');
    process.exit(0);
});

// Import Mongoose schema
require('./travlr');
require('./users');

// Actually start the connection
connect();

module.exports = mongoose;
