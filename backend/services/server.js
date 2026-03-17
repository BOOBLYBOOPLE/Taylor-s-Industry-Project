const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('../middleware/auth');
const path = require('path');
const { Server } = require('socket.io');
const http = require('http');
const { AttendanceScore, AttendanceList } = require('../schema/attendance');
const Employee = require('../schema/employee');
const User = require('../schema/user');
const Message = require('../schema/chat');

const PORT = process.env.PORT || 5000;

require('dotenv').config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors:{
    origin: PORT,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  socket.on('join', async ({roomId, username}) => {

    socket.data.username = username;
    const currentRooms = Array.from(socket.rooms);
    currentRooms.forEach(room => {
      if (room != socket.id) socket.leave(room);
    });

    socket.join(roomId);
    socket.data.currentRooms = roomId;

    try{
      const history = await Message.find({ room: roomId }).sort({ timestamp: -1 }).limit(50);
      socket.emit('message history', history.reverse());
    } catch(err){
      console.error("Error loading history:", err);
    }
    socket.to(roomId).emit('user joined', username)
  });

  socket.on('chat message', async ({ roomId, msg }) => {
    try{
      const newMessage = await Message.create({
        room: roomId,
        senderName: socket.data.username,
        content: msg,
        timestamp: new Date()
      });

      io.to(roomId).emit('chat message', {
        username: newMessage.senderName,
        message: newMessage.content,
        timestamp: newMessage.timestamp
      });
    } catch (err) {
      console.error("Message save failed:", err);
    }
  });

  socket.on('disconnect', () => {
    if(socket.data.username){
      io.emit('user left', socket.data.username)
    }
  });
});

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
app.use('/api/emails', require('../routes/email-route'));
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



mongoose.connection.once('open', () => {
  initializeDailyAttendance();
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch(err => console.error(err));

server.listen(PORT, () => console.log("running chat server"));