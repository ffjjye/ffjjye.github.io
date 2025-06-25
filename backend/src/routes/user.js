const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { getUser, updateUser, updateAvatar } = require('../controllers/userController');

router.get('/:id', authenticateToken, getUser);
router.put('/:id', authenticateToken, updateUser);
router.put('/avatar', authenticateToken, upload.single('avatar'), updateAvatar);

module.exports = router; 