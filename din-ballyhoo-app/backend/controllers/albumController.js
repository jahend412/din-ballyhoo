const Album = require('../models/albumModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

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

exports.createAlbum = factory.createOne(Album);
exports.updateAlbum = factory.updateOne(Album);
exports.deleteAlbum = factory.deleteOne(Album);
