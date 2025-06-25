const Review = require('../models/Review');
const Book = require('../models/Book');

exports.getBookReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ book: req.params.id }).populate('user', 'username avatar');
    res.json(reviews);
  } catch (err) { next(err); }
};

exports.addReview = async (req, res, next) => {
  try {
    const { content, rating } = req.body;
    const review = await Review.create({
      book: req.params.id,
      user: req.user.id,
      content,
      rating
    });
    // 更新图书评论数
    await Book.findByIdAndUpdate(req.params.id, { $inc: { reviewCount: 1 } });
    res.status(201).json(review);
  } catch (err) { next(err); }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate('user', 'username avatar');
    if (!review) return res.status(404).json({ message: '书评不存在' });
    res.json(review);
  } catch (err) { next(err); }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!review) return res.status(404).json({ message: '书评不存在或无权限' });
    res.json(review);
  } catch (err) { next(err); }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!review) return res.status(404).json({ message: '书评不存在或无权限' });
    // 更新图书评论数
    await Book.findByIdAndUpdate(review.book, { $inc: { reviewCount: -1 } });
    res.json({ message: '删除成功' });
  } catch (err) { next(err); }
}; 