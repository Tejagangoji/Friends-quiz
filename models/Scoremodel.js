const mongoose = require('mongoose');

const Scoremodel = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Scoremodel', Scoremodel);