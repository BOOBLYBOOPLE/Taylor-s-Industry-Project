const mongoose = require('mongoose');

const recruitmentSchema = new mongoose.Schema({
  name: {type: String},
  age: {type: Number},
  University: {type: String},
  date: {type: Date},
  status: {type: String},
  resume: {type: String},
  description: {type: String},
  exp: {type: String}
})

module.exports = mongoose.model('Recruitment', recruitmentSchema);