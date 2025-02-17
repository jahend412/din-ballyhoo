const Shows = require('../models/showModel');
const factory = require('./handlerFactory');
const { uploadImage } = require('../utils/uploadImage');

// Middleware to handle show cover image upload
exports.uploadShowCover = uploadImage('coverImage');

exports.getAllShows = factory.getAll(Shows);
exports.getShow = factory.getOne(Shows, [
  {
    path: 'ratings', // Virtual field for ratings
    select: 'rating fan createdAt', // Only include these fields in the populated ratings
  },
  {
    path: 'favorites', // Virtual field for favorites
    select: 'fan createdAt', // Only include these fields in the populated favorites
  },
]);
exports.createShow = factory.createOne(Shows);
exports.updateShow = factory.updateOne(Shows);
exports.deleteShow = factory.deleteOne(Shows);
