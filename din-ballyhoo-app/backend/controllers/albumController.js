const Album = require('../models/albumModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

// Get All Albums
exports.getAllAlbums = catchAsync(async (req, res, next) => {
  // Execute Query
  const features = new APIFeatures(Album.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const albums = await features.query; // Await the query
  res.status(200).json({
    status: 'success',
    results: albums.length, // Include the number of results
    data: {
      albums, // Return the fetched albums here
    },
  });
});

// Create New Album
exports.createAlbum = catchAsync(async (req, res, next) => {
  const newAlbum = await Album.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      album: newAlbum,
    },
  });
});

// Get Album By ID
exports.getAlbumById = catchAsync(async (req, res, next) => {
  const album = await Album.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      album,
    },
  });
});

// Update Album
exports.updateAlbum = catchAsync(async (req, res, next) => {
  const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      album,
    },
  });
});

// Delete Album
exports.deleteAlbum = catchAsync(async (req, res, next) => {
  const album = await Album.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      album,
    },
  });
});
