const express = require('express');
const router = express.Router();
const Employee = require('../schema/employee');
const User = require('../schema/user');

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

    await createUser.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });

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
      about: req.body.about,
      password: req.body.password
    });
    await employee.save();
    res.status(201).json(employee);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/createUser', async (req, res) => {
  try{
    
    const createUser = new User({
      username: req.body.name,
      password: req.body.password,
      email: req.body.email,
      role: req.body.role
    });
    await createUser.save();
    res.status(201).json(createUser);

  } catch (error){
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;