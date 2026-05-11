const mongoose = require('mongoose');

const formsSchema = new mongoose.Schema({
    date: {type: Date},
    name: {type: String, required: true},
    filename: {type: String},
    description: { type: String },
    size: {type: Number},
    employeeId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee',
        required: true 
    },
    path: {type: String}
});

module.exports = mongoose.model('Forms', formsSchema); 