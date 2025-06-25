const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const groupCtrl = require('../controllers/groupController');

router.get('/', groupCtrl.getGroups);
router.post('/', authenticateToken, groupCtrl.createGroup);
router.get('/:id', groupCtrl.getGroupById);
router.put('/:id', authenticateToken, groupCtrl.updateGroup);
router.delete('/:id', authenticateToken, groupCtrl.deleteGroup);
router.post('/:id/join', authenticateToken, groupCtrl.joinGroup);
router.post('/:id/leave', authenticateToken, groupCtrl.leaveGroup);

module.exports = router; 