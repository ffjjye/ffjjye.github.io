const ReadingHistory = require('../models/ReadingHistory');
const Book = require('../models/Book');

exports.getHistory = async (req, res, next) => {
  try {
    const history = await ReadingHistory.find({ user: req.user.id }).populate('book');
    res.json(history);
  } catch (err) { next(err); }
};

exports.addHistory = async (req, res, next) => {
  try {
    const { bookId } = req.body;
    const record = await ReadingHistory.create({ user: req.user.id, book: bookId });
    res.status(201).json(record);
  } catch (err) { next(err); }
}; 