const express = require('express');
const Sprite = require('../models/Sprite');

const router = express.Router();

// Get all sprites
router.get('/', async (req, res) => {
  try {
    const sprites = await Sprite.find();
    res.json(sprites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sprites by category
router.get('/category/:category', async (req, res) => {
  try {
    const sprites = await Sprite.find({ category: req.params.category });
    res.json(sprites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
