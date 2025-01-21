const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: [true, 'Band name is required'],
  },
  venue: {
    type: String,
    required: [true, 'Venue is required'],
  },
  releaseDate: {
    type: Date,
    required: false,
  },
  coverImage: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  setlist: {
    type: String,
    required: [true, 'Setlist is required'],
  },
  tracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track',
    },
  ],
  imageUrl: {
    type: String,
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
showSchema.virtual('ratings', {
  ref: 'Rating', // Name of the Rating model
  foreignField: 'show', // Field in Rating that links to Show
  localField: '_id', // Field in Show that links to Rating
});

// Ensure virtual fields are included in JSON responses
showSchema.set('toJSON', { virtuals: true });
showSchema.set('toObject', { virtuals: true });

const Show = mongoose.model('Show', showSchema);
module.exports = Show;
