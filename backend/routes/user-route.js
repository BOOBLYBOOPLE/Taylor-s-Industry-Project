const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../schema/user');
const Employee = require('../schema/employee');

const router = express.Router();
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
    try{
        const userreq = new user(req.body);
        await userreq.save();
        res.status(201).json({message: 'Registered'});
    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
})

router.post('/login', async(req, res) => {
    try{
        const {username, password} = req.body;

        const userreq = await user.findOne({username});
        if(!userreq) {
            console.log('User not found in DB');
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const passMatch = await bcrypt.compare(password, userreq.password);
        if(!passMatch){
            console.log('Password mismatch');
            return res.status(401).json({ message: 'Invalid credentials' });
        } 

        const JWT_SECRET =  process.env.JWT_SECRET || 'secret123';
        const token = jwt.sign(
            {id: userreq._id, role: userreq.role},
            JWT_SECRET
        );

        res.json({
            token, user: {
                id: userreq._id,
                username: userreq.username,
                role: userreq.role
            }
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/profile', auth, (req, res) => {
  res.json({ message: 'User view' });
});

router.get('/admin', auth, auth.adminOnly, (req, res) => {
    res.json({ message: 'Admin dashboard' });
  }
);

router.get('/all', auth, async(req, res) => {
    try{
        const users = await user.find({ _id: { $ne: req.user.id } }).select('username _id');
        res.json(users);
    } catch (err){
        res.status(500).json({ error: err.message });
    }
});

router.put('/change-password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        const userDoc = await user.findById(userId);
        const isMatch = await bcrypt.compare(currentPassword, userDoc.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        userDoc.password = newPassword;
        await userDoc.save();
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/reset-password-direct', async (req, res) => {
    try {
        const { identifier, newPassword } = req.body;

        const userDoc = await user.findOne({
            $or: [{ username: identifier }, { email: identifier }]
        });

        if (!userDoc) {
            return res.status(404).json({ message: 'User not found' });
        }

        userDoc.password = newPassword;
        await userDoc.save();
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;