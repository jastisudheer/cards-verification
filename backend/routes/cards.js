const express = require('express');
const auth = require('../middleware/auth');
const Card = require('../models/Card');
const validateCardNumber = require('../utils/validateCardNumber'); // Assume this is implemented
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { cardNumber, cardholderName, expiryDate } = req.body;

  if (!validateCardNumber(cardNumber)) {
    return res.status(400).json({ msg: 'Invalid card number' });
  }

  try {
    const newCard = new Card({
      user: req.user.id,
      cardNumber,
      cardholderName,
      expiryDate
    });

    const card = await newCard.save();
    res.json(card);
  } catch (err) {
    console.error('Card Creation Error:', err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user.id }).select('-cvv');
    res.json(cards);
  } catch (err) {
    console.error('Card Retrieval Error:', err.message);
    res.status(500).send('Server error');
  }
});
// @route    DELETE api/cards/:id
// @desc     Delete a card
// @access   Private
router.delete('/:cardId', auth, async (req, res) => {
  try {
      const card = await Card.findOneAndDelete({ _id: req.params.cardId, user: req.user.id });
      if (!card) {
          return res.status(404).json({ msg: 'Card not found or user not authorized to delete this card' });
      }
      res.json({ msg: 'Card deleted successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});


module.exports = router;
