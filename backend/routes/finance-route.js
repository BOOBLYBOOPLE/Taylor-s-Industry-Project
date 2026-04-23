const express = require('express');
const router = express.Router();
const Finance = require('../schema/finance'); 
const Graphs = require('../schema/financeGraphs');

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

router.get('/graphs', async(req, res) => {
  try{
    const graphs = await Graphs.find();
    res.json(graphs);
  } catch (error){
    res.status(500).json({ message: error.message });
  }
});

router.post('/graphs', async(req, res) => {
  const graph = new Graphs({
    animationEnabled: req.body.animationEnabled,
    exportEnabled: req.body.exportEnabled,
    titleText: req.body.titleText,
    axisYPrefix: req.body.axisYPrefix,
    toolTipShared: req.body.toolTipShared,
    fontSize: req.body.fontSize,
    data: req.body.data
  });

  try{
    const newGraph = await graph.save();
    res.status(201).json(newGraph);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

router.delete('/graphs/:id', async(req, res) => {
  try{
    await Graphs.findByIdAndDelete(req.params.id);
    res.json({ message: 'graph deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;