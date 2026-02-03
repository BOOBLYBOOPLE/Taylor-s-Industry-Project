
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Recruitment = require('../schema/recruitment');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    // Unique filename: timestamp + original name
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage });

router.post('/add', upload.single('resume'), async (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    
    // Create new entry
    const newRecruitment = new Recruitment({
      name: req.body.name,
      age: req.body.age,
      University: req.body.University,
      date: req.body.date,
      status: req.body.status,
      resume: req.file ? url + '/uploads/' + req.file.filename : null,
      description: req.body.description,
      exp: req.body.exp
    });

    const savedRecruitment = await newRecruitment.save();
    res.status(201).json({ message: 'Success', data: savedRecruitment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recruitment = await Recruitment.findById(req.params.id);
    if (!recruitment) return res.status(404).json({ message: 'Not found' });
    res.json(recruitment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const list = await Recruitment.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Recruitment.findByIdAndDelete(req.params.id);
    res.json({ message: 'payroll died' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedRecruitment = await Recruitment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedRecruitment) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    
    res.json(updatedRecruitment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;