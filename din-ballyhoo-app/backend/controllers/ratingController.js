const Rating = require('../models/ratingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// set Rating Entity Middleware
exports.setRatingEntity = (req, res, next) => {
  const { entityId, entityType } = req.params;

  if (entityType === 'track') req.body.track = entityId;
  if (entityType === 'album') req.body.album = entityId;
  if (entityType === 'show') req.body.show = entityId;
  if (entityType === 'webcast') req.body.webcast = entityId;

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

  // Create a new rating
  const newRating = await Rating.create({
    rating: req.body.rating,
    user: req.user.id,
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

  const ratings = await Rating(find(filter));

  res.status(200).json({
    status: 'success',
    results: ratings.length,
    data: {
      ratings,
    },
  });
};
