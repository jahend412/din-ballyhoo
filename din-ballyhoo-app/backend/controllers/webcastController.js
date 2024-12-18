const Webcast = require('../models/webcastModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllWebcasts = factory.getAll(Webcast);
exports.getWebcast = factory.getOne(Webcast, [
  {
    path: 'ratings', // Virtual field for ratings
    select: 'rating fan createdAt', // Only include these fields in the populated ratings
  },
  {
    path: 'favorites', // Virtual field for favorites
    select: 'fan createdAt', // Only include these fields in the populated favorites
  },
]);
exports.createWebcast = factory.createOne(Webcast);
exports.updateWebcast = factory.updateOne(Webcast);
exports.deleteWebcast = factory.deleteOne(Webcast);
