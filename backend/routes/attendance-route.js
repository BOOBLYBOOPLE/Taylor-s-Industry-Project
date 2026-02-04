const express = require('express');
const router = express.Router();
const Attendance = require('../schema/attendance');
require('../schema/employee');

router.get('/', async (req, res) => {
  try {
    const attendanceList = await Attendance.attendanceList.find().populate('employeeId');
    res.json(attendanceList);

    const attendanceScore = await Attendance.attendanceScore.find();
    res.json(attendanceScore);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Attendance.attendanceList.findByIdAndDelete(req.params.id);
    await Attendance.attendanceScore.findByIdAndDelete(req.params.id);
    res.json({ message: 'Attendance record gone' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async(req, res) =>{
    try{
      const updatedAttendance = await Attendance.attendanceList.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
      );
      res.json(updatedAttendance);
    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
  try {
    const attendanceScore = new Attendance.attendanceScore({
      date: req.body.date,
      present: req.body.present,
      absent: req.body.absent,
    });
    await attendanceScore.save();
    res.status(201).json(attendanceScore);

    const attendanceList = new Attendance.attendanceList({
        employeeId: req.body.employeeId,
        status: req.body.status
    });
    await attendanceList.save();
    res.status(201).json(attendanceList);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;