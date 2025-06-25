const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const collectionCtrl = require('../controllers/collectionController');

router.get('/', authenticateToken, collectionCtrl.getCollections);
router.post('/', authenticateToken, collectionCtrl.addCollection);
router.delete('/:id', authenticateToken, collectionCtrl.deleteCollection);

module.exports = router; 