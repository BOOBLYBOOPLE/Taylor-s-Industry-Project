const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    room: { type: String },
    senderName: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('message', messageSchema);