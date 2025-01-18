const mongoose = require('mongoose');

const webcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  coverImage: {
    type: String,
    required: false,
  },
  tracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track',
    },
  ],
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required'],
  },
  setlist: {
    type: String,
    required: false,
  },
  guestArtists: {
    type: String,
    required: false,
  },
  viewCount: {
    type: Number,
    required: false,
  },
  likes: {
    type: Number,
    required: false,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  downloadLink: {
    type: String,
    required: false,
  },
  donateLing: {
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
webcastSchema.virtual('ratings', {
  ref: 'Rating', // Name of the Rating model
  foreignField: 'webcast', // Field in Rating that links to Webcast
  localField: '_id', // Field in Webcast that links to Rating
});

// Ensure virtual fields are included in JSON responses
webcastSchema.set('toJSON', { virtuals: true });
webcastSchema.set('toObject', { virtuals: true });

const webcast = mongoose.model('Webcast', webcastSchema);

module.exports = webcast;
