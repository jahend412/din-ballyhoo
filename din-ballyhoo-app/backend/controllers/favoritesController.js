const Favorites = require('../models/favoritesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Track = require('../models/trackModel'); // Assuming you have models for these
const Album = require('../models/albumModel');
const Show = require('../models/showModel');
const Webcast = require('../models/webcastModel');

// Add to favorites
exports.addToFavorites = catchAsync(async (req, res, next) => {
  const { type, itemId } = req.params; // Get type and itemId from URL params

  console.log('Type:', type); // Debugging

  // Ensure that the type is valid
  if (!['track', 'album', 'show', 'webcast'].includes(type)) {
    return next(new AppError('Invalid type', 400));
  }

  // Validate that the item exists
  let item;
  switch (type) {
    case 'track':
      item = await Track.findById(itemId);
      break;
    case 'album':
      item = await Album.findById(itemId);
      break;
    case 'show':
      item = await Show.findById(itemId);
      break;
    case 'webcast':
      item = await Webcast.findById(itemId);
      break;
    default:
      return next(new AppError('Invalid type', 400));
  }

  if (!item) {
    return next(new AppError('Item not found', 404));
  }

  // Find or create the favorites document for the user
  let favorites = await Favorites.findOne({ fan: req.user.id });
  if (!favorites) {
    favorites = await Favorites.create({ fan: req.user.id });
  }

  // Add the item to the appropriate favorites array if not already there
  if (!favorites[type + 's'].includes(itemId)) {
    favorites[type + 's'].push(itemId);
    await favorites.save();
  }

  res.status(200).json({
    status: 'success',
    message: `${type} added to favorites`,
    data: {
      favorites,
    },
  });
});

// Remove from favorites
exports.removeFromFavorites = catchAsync(async (req, res, next) => {
  const { type, itemId } = req.params; // Type: track, album, show, webcast; itemId: ID of the item to remove from favorites

  if (!['track', 'album', 'show', 'webcast'].includes(type)) {
    return next(new AppError('Invalid type', 400));
  }

  const favorites = await Favorites.findOne({ fan: req.user.id });
  if (!favorites) {
    return next(new AppError('No favorites found for this user', 404));
  }

  // Remove the item from the appropriate array
  favorites[type + 's'] = favorites[type + 's'].filter(
    (id) => id.toString() !== itemId
  );
  await favorites.save();

  res.status(200).json({
    status: 'success',
    data: {
      favorites,
    },
  });
});

// Get All favorites
exports.getFavorites = catchAsync(async (req, res, next) => {
  const favorites = await Favorites.findOne({ fan: req.user.id })
    .populate('tracks')
    .populate('albums')
    .populate('shows')
    .populate('webcasts');

  if (!favorites) {
    return next(new AppError('No favorites found for this user', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      favorites,
    },
  });
});
