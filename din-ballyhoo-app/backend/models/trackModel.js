const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  artist: {
    type: String,
    required: [true, 'Artist is required'],
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: false,
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
  },
  duration: {
    type: Number,
  },
  audioFile: {
    type: String, // URL to the audio file
  },
  coverImage: {
    type: String,
  },
  trackNumber: {
    type: Number,
  },
  songWriter: {
    type: String,
    required: false,
  },
  producer: {
    type: String,
    required: false,
  },
  genre: {
    type: String,
    required: false,
  },
  releaseDate: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  favorites: {
    type: Number,
    default: 0,
  },
});

// Virtual field for ratings
trackSchema.virtual('ratings', {
  ref: 'Rating', // Name of the Rating model
  foreignField: 'track', // Field in Rating that links to Track
  localField: '_id', // Field in Track that links to Rating
});

// Ensure virtual fields are included in JSON responses
trackSchema.set('toJSON', { virtuals: true });
trackSchema.set('toObject', { virtuals: true });

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
