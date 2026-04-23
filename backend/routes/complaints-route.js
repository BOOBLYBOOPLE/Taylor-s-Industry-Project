const express = require('express');
const router = express.Router();
const Complaints = require('../schema/complaints'); 
require('../schema/employee');

router.get('/', async (req, res) => {
  try {
    const complaints = await Complaints.find().populate('employeeId'); 
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async(req, res) => {
  try{
    const complaints = new Complaints({
      employeeId : req.body.employeeId,
      targetedEmployee: req.body.targetedEmployee,
      type: req.body.type,
      summary: req.body.summary,
      content: req.body.content,
      date: req.body.date,
      resolved: req.body.resolved
    });
    await complaints.save();
    res.status(201).json(complaints);
  } catch(error){
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaints.findById(req.params.id).populate('employeeId').populate('targetedEmployee');
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Complaints.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;