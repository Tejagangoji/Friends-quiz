const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("userModel", userModel);