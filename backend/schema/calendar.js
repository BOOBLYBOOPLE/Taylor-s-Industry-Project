const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    text: {type: String},
    start_date: {type: Date},
    end_date: {type: Date}
});

module.exports = mongoose.model('Calendar', calendarSchema);
