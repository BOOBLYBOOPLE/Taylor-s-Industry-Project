const mongoose = require('mongoose');

const formsSchema = new mongoose.Schema({
    date: {type: Date},
    name: {type: String, required: true},
    filename: {type: String},
    description: { type: String },
    size: {type: Number},
    submit: {type: String},
    path: {type: String}
});

module.exports = mongoose.model('Forms', formsSchema); 