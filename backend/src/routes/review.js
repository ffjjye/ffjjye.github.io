const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const reviewCtrl = require('../controllers/reviewController');

// 获取图书评论
router.get('/books/:id/reviews', reviewCtrl.getBookReviews);
// 发表书评
router.post('/books/:id/reviews', authenticateToken, reviewCtrl.addReview);
// 获取书评详情
router.get('/:id', reviewCtrl.getReviewById);
// 编辑书评
router.put('/:id', authenticateToken, reviewCtrl.updateReview);
// 删除书评
router.delete('/:id', authenticateToken, reviewCtrl.deleteReview);

module.exports = router; 