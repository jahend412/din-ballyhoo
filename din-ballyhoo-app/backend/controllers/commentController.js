const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setCommentEntity = (req, res, next) => {
  const { entityId, entityType } = req.params;

  // Validation for entityType
  const validEntityTypes = ['track', 'album', 'show', 'webcast'];
  if (!validEntityTypes.includes(entityType)) {
    return next(new AppError('Invalid entity type', 400));
  }

  // Dynamically set the entity in the request body
  if (entityType === 'track') req.body.track = entityId;
  if (entityType === 'album') req.body.album = entityId;
  if (entityType === 'show') req.body.show = entityId;
  if (entityType === 'webcast') req.body.webcast = entityId;

  next();
};

exports.getAllComments = async (req, res, next) => {
  try {
    // Fetch all comments from the database, without filtering by entity type
    const comments = await Comment.find({})
      .populate('user', 'name')
      .populate({
        path: 'replies',
        populate: {
          path: 'user',
          select: 'name',
        },
      });

    res.status(200).json({
      status: 'success',
      results: comments.length,
      data: {
        comments,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createComment = catchAsync(async (req, res, next) => {
  const { comment, parentComment } = req.body; // parentComment is optional for replies

  // If a parentComment is provided, validate that it exists
  if (parentComment) {
    const existingComment = await Comment.findById(parentComment);
    if (!existingComment) {
      return next(new AppError('Parent comment not found', 404));
    }
  }

  // Dynamically set the entity (track, album, show, or webcast) based on the entity type
  const newComment = await Comment.create({
    comment,
    user: req.user.id,
    createdAt: new Date().toISOString(),
    parentComment: parentComment || null, // Include parentComment if it's a reply
    [req.params.entityType]: req.params.entityId, // Dynamically set the entity field (track, album, etc.)
  });

  // Populate the user field with the user's name
  await newComment.populate('user', 'name');

  res.status(201).json({
    status: 'success',
    data: {
      comment: newComment,
    },
  });
});

exports.getCommentsForEntity = async (req, res, next) => {
  const { entityId, entityType } = req.params;

  // Dynamically create a filter based on entityType and entityId
  const filter = {};

  // Ensure you're filtering for the correct entity type and entity ID
  if (entityType === 'track') filter.track = entityId;
  if (entityType === 'album') filter.album = entityId;
  if (entityType === 'show') filter.show = entityId;
  if (entityType === 'webcast') filter.webcast = entityId;
  if (entityType === 'merch') filter.merch = entityId; // Explicit filter for 'merch'

  try {
    // Fetch top-level comments (comments with no parentComment) and populate user & replies
    const comments = await Comment.find({ ...filter, parentComment: null })
      .populate('user', 'name') // Populate the user who posted the comment
      .populate({
        path: 'replies', // Populate the replies field
        populate: { path: 'user', select: 'name' }, // Populate user data for replies
      });

    res.status(200).json({
      status: 'success',
      results: comments.length,
      data: {
        comments,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update a comment
exports.updateComment = catchAsync(async (req, res, next) => {
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true, // Return the updated document
      runValidators: true, // Ensure that validation runs on update
    }
  );

  if (!updatedComment) {
    return next(new AppError('No comment found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      comment: updatedComment,
    },
  });
});

// Delete a comment
exports.deleteComment = catchAsync(async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
