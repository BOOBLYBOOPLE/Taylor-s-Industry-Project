const express = require('express');
const router = express.Router();
const Finance = require('../schema/finance'); 

router.get('/', async (req, res) => {
  try {
    const finance = await Finance.find(); 
    res.json(finance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async(req, res) => {
  try{
    const finance = new Finance({
      total: req.params.total,
    });
    await finance.save();
    res.status(201).json(finance);
  } catch(error){
    res.status(500).json({message: error.message});
  }
});

router.delete('/:id', async(req, res) => {
  try{
    await Finance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Records deleted' });
  } catch (error){
    res.status(500).json({message: error.message});
  }
});

module.exports = router;