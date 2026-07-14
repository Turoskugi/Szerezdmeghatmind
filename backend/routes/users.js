const express = require('express');
const User = require('../models/User');
const Collection = require('../models/Collection');

const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const owned = await Collection.countDocuments({ userId: req.params.userId, owned: true });
    
    res.json({ ...user.toJSON(), owned });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
