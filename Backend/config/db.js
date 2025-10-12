const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function(){
    // Use MONGO_URI from env if provided, otherwise use the existing atlas string, then local
    const envUri = process.env.MONGO_URI;
    const atlasConnection = 'mongodb+srv://hillsidesplc_db_user:YVrOgY9kZP6UR7Iq@cluster0.stsxxsq.mongodb.net/Portfolio?retryWrites=true&w=majority';
    const localConnection = 'mongodb://localhost:27017/Portfolio';

    const connectUri = envUri || atlasConnection;

    mongoose.connect(connectUri, {
        // current mongoose v6+ no longer needs these options, but it's harmless
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(err => {
        console.error('Primary Mongo connection failed:', err.message || err);
        if (connectUri !== localConnection) {
            console.log('Trying local MongoDB...');
            return mongoose.connect(localConnection);
        }
        throw err;
    });

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', () => {
        console.log('====> Connected to MongoDb.');
    })

    return mongodb;
}
