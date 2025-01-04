const Album = require('../models/albumModel');
const factory = require('./handlerFactory');

// Update an album with a new cover image
exports.updateAlbum = factory.updateOne(Album);

// Use factory functions for other CRUD operations
exports.createAlbum = factory.createOne(Album);
exports.getAllAlbums = factory.getAll(Album);
exports.getAlbum = factory.getOne(Album, [
  {
    path: 'ratings', // Virtual field for ratings
    select: 'rating fan createdAt', // Only include these fields in the populated ratings
  },
  {
    path: 'favorites', // Virtual field for favorites
    select: 'fan createdAt', // Only include these fields in the populated favorites
  },
]);
exports.deleteAlbum = factory.deleteOne(Album);
