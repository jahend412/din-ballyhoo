const Album = require('../models/albumModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllAlbums = factory.getAll(Album);
exports.getAlbum = factory.getOne(Album);
exports.createAlbum = factory.createOne(Album);
exports.updateAlbum = factory.updateOne(Album);
exports.deleteAlbum = factory.deleteOne(Album);
