const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({

    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee',
        required: true 
    },
    
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    hoursWorked: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 }, 
    bonuses: { type: Number, default: 0 },
    netPay: {type: Number, default: 0}
});

module.exports = mongoose.model('Payroll', payrollSchema);