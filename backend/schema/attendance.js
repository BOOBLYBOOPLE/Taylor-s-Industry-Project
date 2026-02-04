const mongoose = require('mongoose');

const attendanceScoreSchema = new mongoose.Schema({
  date: {type: Date, required: true},
  present: {type: Number, required: true},
  absent: {type: Number, required: true},
})

const attendanceListSchema = new mongoose.Schema({
      employeeId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Employee',
          required: true 
      },
    status: {type: Boolean}
})

const attendanceScore = mongoose.model('AttendanceScore', attendanceScoreSchema);
const attendanceList = mongoose.model('AttendanceList', attendanceListSchema);

module.exports = {attendanceScore, attendanceList};