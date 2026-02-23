const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('../middleware/auth');
const path = require('path');
const { AttendanceScore, AttendanceList } = require('../schema/attendance');
const Employee = require('../schema/employee');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/employees', require('../routes/employee-route'));
app.use('/api/users', require('../routes/user-route'));
app.use('/api/leaves', require('../routes/leaves-route'));
app.use('/api/finance', require('../routes/payroll-route'));
app.use('/api/recruitment', require('../routes/recruitment-route'));
app.use('/api/complaints', require('../routes/complaints-route'));
app.use('/api/forms', require('../routes/forms-route'));
app.use('/api/attendance', require('../routes/attendance-route'));
app.use('/api/finance-analytics', require('../routes/finance-route'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const initializeDailyAttendance = async () => {
  try{
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const exists = await AttendanceScore.findOne({ date: today });

    if(!exists){
      const totalEmployees = await Employee.countDocuments();
      const allEmployees = await Employee.find();

      await AttendanceScore.create({
        date: today,
        present: 0,
        absent: totalEmployees
      });

      const roster = allEmployees.map(emp => ({
        date: today,
        employeeId: emp._id,
        status: 'Absent'
      }));

      await AttendanceList.insertMany(roster);
      console.log("Init");
    }

  } catch (error) {
    console.error("bruh: ", error)
  }
}

const cleanUpAndExit = async (signal) => {
  console.log(`${signal}`);
  try{
    await AttendanceList.deleteMany({});
    await AttendanceScore.deleteMany({});

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

process.on('SIGINT', () => cleanUpAndExit('SIGINT'));
process.on('SIGTERM', () => cleanUpAndExit('SIGTERM'));

const PORT = process.env.PORT || 5000;

mongoose.connection.once('open', () => {
  initializeDailyAttendance();
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch(err => console.error(err));
