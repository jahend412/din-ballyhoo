const Rating = require('../models/ratingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const mongoose = require('mongoose');

// set Rating Entity Middleware
exports.setRatingEntity = (req, res, next) => {
  const { entityId, entityType } = req.params;

  const trimmedEntityId = entityId.trim();
  if (!mongoose.Types.ObjectId.isValid(trimmedEntityId)) {
    return next(new AppError('Invalid ID format', 400));
  }

  if (entityType === 'track') req.body.track = trimmedEntityId;
  if (entityType === 'album') req.body.album = trimmedEntityId;
  if (entityType === 'show') req.body.show = trimmedEntityId;
  if (entityType === 'webcast') req.body.webcast = trimmedEntityId;

  next();
};

// Create a rating
exports.createRating = catchAsync(async (req, res, next) => {
  const { rating } = req.body;
  const { entityId, entityType } = req.params;

  // Validate that rating is within an acceptable range (1-5)
  if (rating < 1 || rating > 5) {
    return next(new AppError('Rating must be between 1 and 5', 400));
  }

  // Ensure entityType an entityId are provided
  if (!entityType || !entityId) {
    return next(new AppError('Entity type and entity ID are required', 400));
  }

  // Check if the user has already rated this entity
  const existingRating = await Rating.findOne({
    user: req.user.id,
    [entityType]: entityId,
  });

  if (existingRating) {
    return next(new AppError('You have already rated this item', 400));
  }

  // Create a new rating
  const newRating = await Rating.create({
    rating: req.body.rating,
    fan: req.user.id,
    [req.params.entityType]: req.params.entityId, // Automatically include the entity reference
  });

  res.status(201).json({
    status: 'success',
    data: {
      rating: newRating,
    },
  });
});

// Get rating by entity
exports.getRatingsForEntity = async (req, res, next) => {
  const { entityId, entityType } = req.params;

  const filter = {};
  if (entityType === 'track') filter.track = entityId;
  if (entityType === 'album') filter.album = entityId;
  if (entityType === 'show') filter.show = entityId;
  if (entityType === 'webcast') filter.webcast = entityId;

  const ratings = await Rating.find(filter);

  res.status(200).json({
    status: 'success',
    results: ratings.length,
    data: {
      ratings,
    },
  });
};

// Update a rating
exports.updateRating = catchAsync(async (req, res, next) => {
  const updatedRating = await Rating.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      rating: updatedRating,
    },
  });
});

// Delete a rating
exports.deleteRating = catchAsync(async (req, res, next) => {
  await Rating.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
