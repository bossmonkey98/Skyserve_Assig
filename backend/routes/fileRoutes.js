const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { saveShapes, getShapes, saveMarkers, getMarkers } = require('../controllers/fileController');

const router = express.Router();

router.post('/saveShapes', authMiddleware, saveShapes);
router.get('/getShapes', authMiddleware, getShapes);
router.post('/saveMarkers', authMiddleware, saveMarkers);
router.get('/getMarkers', authMiddleware, getMarkers);

module.exports = router;
