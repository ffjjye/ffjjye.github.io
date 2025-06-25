const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const messageCtrl = require('../controllers/messageController');

router.get('/', authenticateToken, messageCtrl.getMessages);
router.get('/system', authenticateToken, messageCtrl.getSystemMessages);
router.get('/friend/:id', authenticateToken, messageCtrl.getFriendMessages);
router.post('/', authenticateToken, messageCtrl.sendMessage);
router.put('/:id/read', authenticateToken, messageCtrl.markAsRead);

module.exports = router; 