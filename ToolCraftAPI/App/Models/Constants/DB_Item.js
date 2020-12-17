const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    id: {
        type: Number
    }
})

module.exports = mongoose.model('Item', ItemSchema);