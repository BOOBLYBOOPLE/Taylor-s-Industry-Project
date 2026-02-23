const express = require('express');
const nodeCron = require('node-cron');
const cron = require('cron').CronJob;
const router = express.Router();
const { AttendanceScore, AttendanceList } = require('../schema/attendance');
const Employee = require('../schema/employee');

router.get('/', async (req, res) => {
  try {
    const list = await AttendanceList.find().populate('employeeId');
    const score = await AttendanceScore.find();

    res.json({
      attendanceList: list,
      attendanceScore: score
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await AttendanceList.findByIdAndDelete(req.params.id);
    await AttendanceScore.findByIdAndDelete(req.params.id);
    res.json({ message: 'Attendance record gone' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try{
    const attendanceScore = new Attendance.attendanceScore({
      date: req.body.date,
      present: req.body.present,
      absent: req.body.absent,
    });
    await attendanceScore.save();

    const attendanceList = new Attendance.attendanceList({
        employeeId: req.body.employeeId,
        status: req.body.status
    });
    await attendanceList.save();

    res.status(201).json({
      message: "Entries created",
      score: attendanceScore,
      list: attendanceList
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.put('/:id', async (req, res) => {
  const employeeId = req.params.id; 
  const { status } = req.body; 
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const updatedEntry = await AttendanceList.findOneAndUpdate(
      { employeeId: employeeId, date: today },
      { status: status },
      { new: true, upsert: true }
    );

    const presentCount = await AttendanceList.countDocuments({ date: today, status: 'Present' });
    const absentCount = await AttendanceList.countDocuments({ date: today, status: 'Absent' });

    const updatedScore = await AttendanceScore.findOneAndUpdate(
      { date: today },
      { present: presentCount, absent: absentCount },
      { new: true, upsert: true }
    );

    res.json({ 
      message: "Attendance updated successfully", 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;