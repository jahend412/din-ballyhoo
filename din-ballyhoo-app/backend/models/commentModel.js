const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
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
    required: false,
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
  merch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merch',
    required: false,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
});

commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentComment',
});

commentSchema.set('toJSON', { virtuals: true });
commentSchema.set('toObject', { virtuals: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
