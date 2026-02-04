const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
    total: {type: Number}
});

module.exports = mongoose.model('Finance', financeSchema);