const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  inputImageUrl: { type: String},
  outputImageUrl: { type: String},
  theme: { type: String },
  room: { type: String },
  dimensions: { type: String },
  // budget: { type: String},
  colorPalette: { type: String },
  rating: { type: Number},
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rating', ratingSchema);