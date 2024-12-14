const Shows = require('../models/showModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllShows = factory.getAll(Shows);
exports.getShow = factory.getOne(Shows);
exports.createShow = factory.createOne(Shows);
exports.updateShow = factory.updateOne(Shows);
exports.deleteShow = factory.deleteOne(Shows);
