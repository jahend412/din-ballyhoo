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
  coverImageUrl: {
    type: String,
    required: false,
  },
  tracks: [
    {
      title: {
        type: String,
        required: [true, 'Track title is required'],
      },
      url: {
        type: String,
        required: [true, 'Track URL is required'],
      },
      duration: {
        type: Number,
        required: false,
      },
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
  favorites: {
    type: Number,
    default: 0,
  },
});

// Virtual field for ratings
albumSchema.virtual('ratings', {
  ref: 'Rating', // Name of the Rating model
  foreignField: 'album', // Field in Rating that links to Album
  localField: '_id', // Field in Album that links to Rating
});

// Ensure virtual fields are included in JSON responses
albumSchema.set('toJSON', { virtuals: true });
albumSchema.set('toObject', { virtuals: true });

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
