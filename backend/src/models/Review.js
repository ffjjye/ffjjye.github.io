const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  likes: { type: Number, default: 0 },
  createTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema); 