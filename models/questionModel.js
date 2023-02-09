const mongoose = require('mongoose');

const questionModel = mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('questionModel', questionModel);