const express = require('express');
const auth = require('../middleware/auth');
const Card = require('../models/Card');
const router = express.Router();

// @route    GET /api/admin/cards
// @desc     Get all cards for all users (Admin only)
// @access   Private
router.get('/cards', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    // Make sure to replace 'Card' with your actual card model
    const cards = await Card.find().populate('user', 'username').select('-cvv');
    res.json(cards);
  } catch (err) {
    console.error('Card Retrieval Error:', err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
