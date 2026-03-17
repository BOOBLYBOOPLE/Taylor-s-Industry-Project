const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    sender: {type: String, required: true},
    recipient: { type: String, required: true },
    subject: {type: String, required: true},
    content: {type: String, required: true},
    draft: {type: Boolean},
    important: {type: Boolean},
    trashed: {type: Boolean},
    spam: {type: Boolean},
    sent: {type: Boolean},
    received: {type: Boolean},
    sendDate: {type: Date}
});

module.exports = mongoose.model('email', emailSchema);