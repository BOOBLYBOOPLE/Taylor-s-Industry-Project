const express = require('express');
const router = express.Router();
const nodemailer =  require('nodemailer');
const email = require('../schema/email');
const user = require('../schema/user');
const { ImapFlow } = require('imapflow');
const { simpleParser } = require('mailparser');

router.get('/', async(req, res) => {
    try{
        const emails = (await email.find());
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/:id', async(req, res) => {
    try{
        const userEmail = await email.findById(req.params.id);
        if(!userEmail)
            return res.status(404).json({message: "no email"});
        res.status(200).json(userEmail);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.put('/:id', async(req, res) => {
    try {
    const updatedEmail = await email.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }
    );
        res.json(updatedEmail);
    } catch (err) {
    res.status(500).json({ message: err.message + req.body.important});
    }
})

router.post('/draft', async(req, res) => {
    const { recipient, userId, subject, content } = req.body;

    try{
        const foundUser = await user.findById(userId);
        if (!foundUser) {
            return res.status(404).json({ error: "User not found: " + req.body});
        }

        const userEmail = foundUser.email;

        const draftEmail = new email({
            userId: userId,
            recipient: recipient,
            sender: userEmail,
            subject: subject,
            content: content,
            sendDate: new Date(),
            sent: false,
            draft: true,
            important: false,
            trashed: false,
            spam: false,
            received: false
        });
        await draftEmail.save();
        res.status(200).json({message:'email drafted' });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/sync', async (req, res) => {
    const { userId } = req.body;
    
    const foundUser = await user.findById(userId);
    
    const client = new ImapFlow({
        host: 'imap.gmail.com',
        port: 993,
        secure: true,
        auth: {
            user: foundUser.email, 
            pass: process.env.SMTP_PASS
        }
    });
    await client.connect();
    let lock = await client.getMailboxLock('INBOX');
    try {
        for await (let message of client.fetch('1:*', { envelope: true, source: true })) {
            const parsed = await simpleParser(message.source);
            const exists = await email.findOne({ 
                subject: message.envelope.subject, 
                sendDate: message.envelope.date 
            });

            if (!exists) {
                await email.create({
                    userId: userId,
                    sender: message.envelope.from[0].address,
                    recipient: foundUser.email,
                    subject: message.envelope.subject,
                    content: parsed.text,
                    sendDate: message.envelope.date,
                    sent: false,
                    draft: false,
                    important: false,
                    trashed: false,
                    spam: false,
                    received: true
                });
            }
        }
        res.status(200).json({ message: "Sync Complete" });
    } finally {
        lock.release();
    }
    await client.logout();
    if (!res.headersSent) {
        return res.status(200).json({ message: "Sync Complete" });
    }
});

router.post('/send', async(req, res) => {
    const { recipient, userId, subject, cc, content } = req.body;

    try{
        const foundUser = await user.findById(userId);
        if (!foundUser) {
            return res.status(404).json({ error: "User not found: " });
        }

        const userEmail = foundUser.email;
        let transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: userEmail,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: userEmail,
            to: recipient,
            cc: cc,
            subject: subject,
            text: content,
            html: content
        };
        await transporter.sendMail(mailOptions);

        const newEmail = new email({
            userId: userId,
            recipient: recipient,
            sender: userEmail,
            subject: subject,
            cc: cc,
            content: content,
            sendDate: new Date(),
            sent: true,
            draft: false,
            important: false,
            trashed: false,
            spam: false,
            received: false
        });
        await newEmail.save();
        res.status(200).json({message:'email sent' });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete("/:id", async(req, res) => {
    try{
        await email.findByIdAndDelete(req.params.id);
        res.json({message: "Deleted"});
    } catch {
        res.json({message: error.message});
    }
});

module.exports = router;