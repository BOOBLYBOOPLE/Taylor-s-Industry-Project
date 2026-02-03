const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  department: {type: String, required: true},
  title: {type: String, required: true},
  DOB: {type: Date},
  dateOfEntry: {type: Date},
  email: {type: String},
  phone: {type: String},
  salary: {type: Number, required: true},
  workingHours: {type: String, required: true},
  about: {type: String}
})

module.exports = mongoose.model('Employee', employeeSchema);