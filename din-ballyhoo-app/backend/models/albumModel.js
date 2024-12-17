const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  artist: {
    type: String,
    required: [true, 'Artist is required'],
  },
  genre: {
    type: String,
    required: false,
  },
  releaseDate: {
    type: Date,
    required: false,
  },
  coverImage: {
    type: String,
    required: false,
  },
  tracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track',
      required: false,
    },
  ],
  producer: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
