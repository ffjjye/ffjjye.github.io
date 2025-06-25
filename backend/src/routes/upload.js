const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { authenticateToken } = require('../middlewares/auth');

// 上传头像
router.post('/avatar', authenticateToken, upload.single('avatar'), (req, res) => {
  res.json({ url: '/uploads/' + req.file.filename });
});
// 上传小组图片
router.post('/group-image', authenticateToken, upload.single('groupImage'), (req, res) => {
  res.json({ url: '/uploads/' + req.file.filename });
});
// 上传图书封面
router.post('/book-cover', authenticateToken, upload.single('bookCover'), (req, res) => {
  res.json({ url: '/uploads/' + req.file.filename });
});

module.exports = router; 