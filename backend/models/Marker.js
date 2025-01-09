const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  markers: { type: Array, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Marker', markerSchema);
