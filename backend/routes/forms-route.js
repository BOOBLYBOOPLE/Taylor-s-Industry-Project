const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Forms = require('../schema/forms');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const newDoc = new Forms({
      date: req.body.date,
      name: req.file.originalname,
      filename: req.file.filename,
      description: req.body.description,
      size: req.file.size,
      submit: req.body.submit,
      path: req.file.path
    });

    const savedDoc = await newDoc.save();
    res.json(savedDoc);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const docs = await Forms.find().sort({ date: -1 });
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doc = await Forms.findById(req.params.id);
    
    if (!doc) {
      return res.status(404).json({ msg: 'Document not found' });
    }
    
    res.json(doc);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Document not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const doc = await Forms.findById(req.params.id);
    if (!doc) return res.status(404).json({ msg: 'Document not found' });

    if (fs.existsSync(doc.path)) {
       fs.unlink(doc.path, (err) => {
        if (err) console.error('Failed to delete local file:', err);
      });
    }

    await Forms.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Document deleted' });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;