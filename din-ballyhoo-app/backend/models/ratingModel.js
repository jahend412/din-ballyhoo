const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Rating is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Rating must belong to a user'],
  },
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    required: [true, 'Rating must belong to a track'],
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: [true, 'Rating must belong to an album'],
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: [true, 'Rating must belong to a show'],
  },
  webcast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Webcast',
    required: [true, 'Rating must belong to a webcast'],
  },
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
