const _Mongoose = require('mongoose');
const _AppSettings = require('./appsettings');

const url = _AppSettings.DBPath;

const connect = async () => {
    try {
        await _Mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(_ => {
            console.log('Successfully connected to MongoDB.');
        })
    }
    catch(err) {
        console.error('A error occured while attempt to connect to Mongo', err);
        process.exit(-1);
    }
}

module.exports = connect();