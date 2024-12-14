const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commment: {
    type: String,
    required: [true, 'Comment is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment must belong to a user'],
  },
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    required: [true, 'Comment must belong to a track'],
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: [true, 'Comment must belong to an album'],
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: [true, 'Comment must belong to a show'],
  },
  webcast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Webcast',
    required: [true, 'Comment must belong to a webcast'],
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment', // References another comment
    default: null,
  },
});

commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentComment',
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
