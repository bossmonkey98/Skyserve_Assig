const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/auth');
const { uploadFile, getFiles } = require('../controllers/fileController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', protect, upload.single('file'), uploadFile);
router.get('/', protect, getFiles);

module.exports = router;
