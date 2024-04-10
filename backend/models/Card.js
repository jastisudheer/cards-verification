const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cardNumber: { type: String, required: true },
  cardholderName: { type: String, required: true },
  expiryDate: { type: String, required: true }
  // Note: CVV is not storing
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
