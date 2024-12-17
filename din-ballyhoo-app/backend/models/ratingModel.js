const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    fan: { type: mongoose.Schema.Types.ObjectId, ref: 'Fan', required: true },
    track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' },
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
    webcast: { type: mongoose.Schema.Types.ObjectId, ref: 'Webcast' },
  },
  { timestamps: true }
);

// Ensure that a user can only rate each entity once
ratingSchema.index({ fan: 1, track: 1 }, { unique: true });
ratingSchema.index({ fan: 1, album: 1 }, { unique: true });
ratingSchema.index({ fan: 1, show: 1 }, { unique: true });
ratingSchema.index({ fan: 1, webcast: 1 }, { unique: true });

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
