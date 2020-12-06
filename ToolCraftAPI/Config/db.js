// Dependencies
const _Mongoose = require('mongoose');

// Models
const TCError = require('../App/Models/Constants/TCError');
const Messaging = require('../App/Models/Constants/Messaging');
const ErrorMessage = require('../App/Models/Constants/ErrorMessages');

const url = 'mongodb://localhost:27017/ToolCraftDB';

const connect = async () => {
    try {
        await _Mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(_ => {
            console.log(Messaging.MongoConnectionAttemptSuccess);
        })
    }
    catch(err) {
        let error = TCError(ErrorMessage.MongoConnectionAttempt, err)
        console.error(error.message, error);
        process.exit(-1);
    }
}

module.exports = connect();