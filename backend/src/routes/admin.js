const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middlewares/auth');
const { getUsers, blockUser } = require('../controllers/adminController');

router.get('/users', authenticateToken, requireAdmin, getUsers);
router.post('/block-user', authenticateToken, requireAdmin, blockUser);

 