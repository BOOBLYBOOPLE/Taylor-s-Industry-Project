const mongoose = require('mongoose');

const complaintsSchema = new mongoose.Schema({
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee',
        required: true 
    },
    targetedEmployee: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee'
    },
    type: { type: String },
    summary: { type: String },
    content: { type: String },
    date: { type: Date, default: Date.now },
    resolved: {type: Boolean}
});

module.exports = mongoose.model('Complaints', complaintsSchema);