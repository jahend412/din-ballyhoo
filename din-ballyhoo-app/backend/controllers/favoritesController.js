const Favorites = require('../models/favoritesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Add to favorites
exports.addToFavorites = catchAsync(async (req, res, next) => {
  const { type, itemId } = req.body; // Type: track, album, show, webcast; itemId: ID of the item to add to favorites

  if (!['track', 'album', 'show', 'webcast'].includes(type)) {
    return next(new AppError('Invalid type', 400));
  }

  // Find or create the favorites document for the fan
  let favorites = await Favorites.findOne({ user: req.user.id });
  if (!favorites) {
    favorites = await Favorites.create({ user: req.user.id });
  }

  // Add the item to the appropriate array
  if (!favorites[type + 's'].includes(itemId)) {
    favorites[type + 's'].push(itemId);
    await favorites.save();
  }

  res.status(200).json({
    status: 'success',
    data: {
      favorites,
    },
  });
});
