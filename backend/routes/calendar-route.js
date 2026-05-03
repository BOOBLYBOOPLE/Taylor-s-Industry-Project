const express = require('express');
const router = express.Router();
const Calendar = require('../schema/calendar');

router.get('/', async(req, res) => {
    try{
        const calendar = await Calendar.find();
        res.json(calendar); 
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async(req, res) => {
    try{
        const calendar = new Calendar({
            text: req.body.text,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        });
        await calendar.save();
        res.status(201).json(calendar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async(req, res) => {
    try{ 
        await Calendar.findByIdAndDelete(req.params.id);
        res.json({ message: 'event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await Calendar.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;