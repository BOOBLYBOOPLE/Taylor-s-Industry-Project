const mongoose = require('mongoose');

const attendanceScoreSchema = new mongoose.Schema({
  date: {type: Date, required: true},
  present: {type: Number, required: true},
  absent: {type: Number, required: true},
})

const attendanceListSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee',
        required: true 
    },
    status: {type: String, enum: ['Present', 'Absent'], default: 'Absent'}
})

const AttendanceScore = mongoose.model('AttendanceScore', attendanceScoreSchema);
const AttendanceList = mongoose.model('AttendanceList', attendanceListSchema);

module.exports = {AttendanceScore, AttendanceList};