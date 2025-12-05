const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async function(){
    if (mongoose.connection.readyState === 1) {
        console.log('====> MongoDB already connected');
        return mongoose.connection;
    }

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
    console.log('====> Connection URI:', connectUri.replace(/:[^:@]+@/, ':****@'));

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
    
    mongodb.on('disconnected', () => {
        console.log('====> MongoDB disconnected');
    });
    
    mongodb.once('open', () => {
        console.log('====> Connected to MongoDB. Database is ready!');
    });

    try {
        await mongoose.connect(connectUri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log('====> MongoDB connection established');
    } catch (err) {
        console.error('====> Primary Mongo connection failed:', err.message || err);
        if (connectUri !== localConnection) {
            console.log('====> Trying local MongoDB...');
            try {
                await mongoose.connect(localConnection, {
                    serverSelectionTimeoutMS: 5000,
                    socketTimeoutMS: 45000,
                });
                console.log('====> Local MongoDB connection established');
            } catch (localErr) {
                console.error('====> Local MongoDB connection also failed:', localErr.message || localErr);
                throw localErr;
            }
        } else {
            throw err;
        }
    }

    return mongodb;
}
