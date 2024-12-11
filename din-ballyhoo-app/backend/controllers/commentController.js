const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Set Comment Entity Middleware
exports.setCommentEntity = (req, res, next) => {
  const { entityId, entityType } = req.params;

  // Validation for entityType
  const validEntityTypes = ['track', 'album', 'show', 'webcast'];
  if (!validEntityTypes.includes(entityType)) {
    return next(new AppError('Invalid entity type', 400));
  }

  if (entityType === 'track') req.body.track = entityId;
  if (entityType === 'album') req.body.album = entityId;
  if (entityType === 'show') req.body.show = entityId;
  if (entityType === 'webcast') req.body.webcast = entityId;

  next();
};

// Create a comment
exports.createComment = catchAsync(async (req, res) => {
  const { comment } = req.body;

  const newComment = await Comment.create({
    comment: req.body.comment,
    user: req.user.id,
    [req.params.entityType]: req.params.entityId, // Automatically include the entity reference
  });

  res.status(201).json({
    status: 'success',
    data: {
      comment: newComment,
    },
  });
});

// Get comment by entity
exports.getCommentsForEntity = async (req, res, next) => {
  const { entityId, entityType } = req.params;

  const filter = {};
  if (entityType === 'track') filter.track = entityId;
  if (entityType === 'album') filter.album = entityId;
  if (entityType === 'show') filter.show = entityId;
  if (entityType === 'webcast') filter.webcast = entityId;

  const comments = await Comment.find(filter).populate('user', 'username');

  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: {
      comments,
    },
  });
};
