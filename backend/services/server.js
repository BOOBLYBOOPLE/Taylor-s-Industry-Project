const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('../middleware/auth');
const path = require('path');

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

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch(err => console.error(err));
