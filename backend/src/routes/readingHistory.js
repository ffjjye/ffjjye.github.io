const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const readingCtrl = require('../controllers/readingHistoryController');

router.get('/', authenticateToken, readingCtrl.getHistory);
router.post('/', authenticateToken, readingCtrl.addHistory);

module.exports = router; 