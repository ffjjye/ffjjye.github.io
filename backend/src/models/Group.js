const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  bookCount: { type: Number, default: 0 },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  createTime: { type: Date, default: Date.now },
  avatar: { type: String, default: '' }
});

module.exports = mongoose.model('Group', groupSchema); 