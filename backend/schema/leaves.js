const mongoose = require('mongoose');

const leavesSchema = new mongoose.Schema({
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee',
        required: true 
    },
    type: {type: String},
    dateStart: {type: Date, default: Date.now, required: true},
    dateEnd: {type: Date, default:Date.now, required: true},
    status: {type: String},
    content: {type: String},
    paid: {type: Boolean}
});

module.exports = mongoose.model('Leaves', leavesSchema); 