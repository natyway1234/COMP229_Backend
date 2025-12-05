const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function(){
    // Use MONGO_URI from env if provided, otherwise use the existing atlas string, then local
    const envUri = process.env.MONGO_URI;
    const atlasConnection = 'mongodb+srv://hillsidesplc_db_user:Conferencing_4387@cluster0.stsxxsq.mongodb.net/Portfolio?retryWrites=true&w=majority';
    const localConnection = 'mongodb://localhost:27017/Portfolio';

    const connectUri = envUri || atlasConnection;

    console.log('====> Attempting to connect to MongoDB...');
    if (envUri) {
        console.log('====> Using MONGO_URI from environment variables');
    } else {
        console.log('====> Using Atlas connection string');
    }

    mongoose.connect(connectUri, {
        // current mongoose v6+ no longer needs these options, but it's harmless
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(err => {
        console.error('====> Primary Mongo connection failed:', err.message || err);
        if (connectUri !== localConnection) {
            console.log('====> Trying local MongoDB...');
            return mongoose.connect(localConnection);
        }
        throw err;
    });

    let mongodb = mongoose.connection;

    mongodb.on('error', (err) => {
        console.error('====> MongoDB Connection Error:', err.message || err);
    });
    
    mongodb.on('connecting', () => {
        console.log('====> MongoDB connecting...');
    });
    
    mongodb.on('connected', () => {
        console.log('====> MongoDB connected successfully!');
    });
    
    mongodb.once('open', () => {
        console.log('====> Connected to MongoDB. Database is ready!');
    });

    return mongodb;
}
