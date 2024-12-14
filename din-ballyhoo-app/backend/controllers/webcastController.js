const Webcast = require('../models/webcastModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllWebcasts = factory.getAll(Webcast);
exports.getWebcast = factory.getOne(Webcast);
exports.createWebcast = factory.createOne(Webcast);
exports.updateWebcast = factory.updateOne(Webcast);
exports.deleteWebcast = factory.deleteOne(Webcast);
