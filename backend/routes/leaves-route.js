const express = require('express');
const router = express.Router();
const Leaves = require('../schema/leaves'); 
require('../schema/employee');

router.get('/', async (req, res) => {
  try {
    const leaves = await Leaves.find().populate('employeeId'); 
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const leave = await Leaves.findById(req.params.id).populate('employeeId');
    
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async(req, res) => {
  try{
    const leaves = new Leaves({
      employeeId : req.body.employeeId,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      amount: req.body.amount,
      status: req.body.status,
      content: req.body.content,
      paid: req.body.paid,
      type: req.body.type
    });
    await leaves.save();
    res.status(201).json(leaves);
  } catch(error){
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

// Update an existing Leave
router.put('/:id', async (req, res) => {
  try {
    const updatedLeave = await Leaves.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedLeave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Leaves.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;