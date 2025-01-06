const mongoose = require('mongoose');

const GeoFileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: { type: String, required: true },
  fileType: { type: String, enum: ['GeoJSON', 'KML', 'TIFF'], required: true },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GeoFile', GeoFileSchema);
