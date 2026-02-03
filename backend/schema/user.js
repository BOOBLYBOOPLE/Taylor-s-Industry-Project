const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    email: {type: String, trim: true},
    role: {type: String, default: 'user', enum: ['user', 'admin']},
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

module.exports = mongoose.model('user', userSchema);