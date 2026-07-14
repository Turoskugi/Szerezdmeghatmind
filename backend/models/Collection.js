const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  spriteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sprite',
    required: true
  },
  owned: {
    type: Boolean,
    default: false
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
collectionSchema.index({ userId: 1, spriteId: 1 }, { unique: true });

module.exports = mongoose.model('Collection', collectionSchema);
