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
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
