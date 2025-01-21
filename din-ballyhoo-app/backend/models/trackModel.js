const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema(
  {
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
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Show',
      required: false,
    },
    webcast: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Webcast',
      required: false,
    },
    url: {
      type: String,
      required: [true, 'Track URL is required'],
    },
    duration: {
      type: Number,
      min: 0,
    },

    trackNumber: {
      type: Number,
    },
    composer: {
      type: String,
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
    playCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

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
