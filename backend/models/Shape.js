const mongoose = require('mongoose');

const shapeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shapes: { type: Object, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Shape', shapeSchema);
