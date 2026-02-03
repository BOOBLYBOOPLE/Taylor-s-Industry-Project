const express = require('express');
const router = express.Router();
const Employee = require('../schema/employee');

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async(req, res) => {
  try{
    const employee = await Employee.findById(req.params.id);
    if(!employee){
      return res.status(404).json({message: 'Employee not found'});
    }
    res.json(employee);
  } catch {
    res.status(500).json({message: error.message});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const employee = new Employee({
      name: req.body.name,
      department: req.body.department,
      title: req.body.title,
      DOB: req.body.DOB,
      dateOfEntry: req.body.dateOfEntry,
      email: req.body.email,
      phone: req.body.phone,
      salary: req.body.salary,
      workingHours: req.body.workingHours,
      about: req.body.about
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;