const express = require('express');
const router = express.Router();
const Payroll = require('../schema/payroll'); 
require('../schema/employee');

router.get('/', async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate('employeeId'); 
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async(req, res) => {
  try{
    const payroll = await Payroll.findById(req.params.id);
    if(!payroll){
      return res.status(404).json({message: 'payroll not found'});
    }
    res.json(payroll);
  } catch {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.post('/', async(req, res) => {
  try{
    const payroll = new Payroll({
      employeeId : req.body.employeeId,
      date: req.body.date,
      amount: req.body.amount,
      hoursWorked: req.body.hoursWorked,
      deductions: req.body.deductions,
      bonuses: req.body.bonuses
    });
    await payroll.save();
    res.status(201).json(payroll);
  } catch(error){
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Payroll.findByIdAndDelete(req.params.id);
    res.json({ message: 'payroll died' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;