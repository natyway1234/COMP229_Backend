const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function(){
    // Use MONGO_URI from env if provided, otherwise use the existing atlas string, then local
    const envUri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL;
    const atlasConnection = 'mongodb+srv://hillsidesplc_db_user:YVrOgY9kZP6UR7Iq@cluster0.stsxxsq.mongodb.net/Portfolio?retryWrites=true&w=majority';
    const localConnection = 'mongodb://localhost:27017/Portfolio';

    const connectUri = envUri || atlasConnection;

    console.log('Attempting to connect to MongoDB...');
    if (envUri) {
        console.log('Using MongoDB URI from environment variables');
    } else {
        console.log('Using default MongoDB Atlas connection');
    }

    mongoose.connect(connectUri, {
        // current mongoose v6+ no longer needs these options, but it's harmless
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('====> Successfully connected to MongoDB.');
    }).catch(err => {
        console.error('Primary Mongo connection failed:', err.message || err);
        if (connectUri !== localConnection) {
            console.log('Trying local MongoDB...');
            return mongoose.connect(localConnection, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(() => {
                console.log('====> Connected to local MongoDB.');
            }).catch(localErr => {
                console.error('Local MongoDB connection also failed:', localErr.message || localErr);
                throw localErr;
            });
        }
        throw err;
    });

    let mongodb = mongoose.connection;

    mongodb.on('error', (err) => {
        console.error('MongoDB Connection Error:', err.message || err);
    });

    mongodb.on('disconnected', () => {
        console.log('MongoDB disconnected. Attempting to reconnect...');
    });

    mongodb.once('open', () => {
        console.log('====> MongoDB connection is open and ready.');
    });

    return mongodb;
}
