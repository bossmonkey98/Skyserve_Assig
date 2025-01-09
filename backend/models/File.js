const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  path: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
