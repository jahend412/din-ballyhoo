const Track = require('../models/trackModel');
const APIFeatures = require('../utils/apiFeatures');
const { gfs, storage } = require('../utils/multer');
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllTracks = factory.getAll(Track);
exports.getTrack = factory.getOne(Track, [
  {
    path: 'ratings', // Virtual field for ratings
    select: 'rating fan createdAt', // Only include these fields in the populated ratings
  },
  {
    path: 'favorites', // Virtual field for favorites
    select: 'fan createdAt', // Only include these fields in the populated favorites
  },
]);
exports.createTrack = factory.createOne(Track);
exports.updateTrack = factory.updateOne(Track);
exports.deleteTrack = factory.deleteOne(Track);

// Multer configuration
const upload = multer({ storage }); // Initialize Multer with the GridFS storage engine

// Upload Track
exports.uploadTrack = catchAsync(async (req, res, next) => {
  // Check if it is an MP3 file
  if (!req.file) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please upload an MP3 file',
    });
  }

  // Create a new track
  const track = new Track({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    fileId: req.file.id, // Save the file ID from GridFS
  });

  // Save the track to the database
  const savedTrack = await track.save();

  // Return a response with the saved track
  res.status(201).json({
    status: 'success',
    data: {
      track: savedTrack,
    },
  });
});

// Get Track Stream

exports.streamTrackById = catchAsync(async (req, res, next) => {
  const track = await Track.findById(req.params.id); // Fetch track metadata
  if (!track) {
    return res.status(404).json({
      status: 'fail',
      message: 'No track found with that ID',
    });
  }

  // Stream the MP3 file from GridFS
  const readStream = gfs.createReadStream({
    _id: track.fileId, // Fetch the track's file ID
    root: 'tracks', // Ensure this matches the GridFS bucket name
  });

  // Set response headers to stream the MP3 file
  res.set('Content-Type', 'audio/mpeg');
  res.set('Content-Disposition', `attachment; filename="${track.title}.mp3"`);

  // Pipe the read stream to the response
  readStream.pipe(res);

  // Handle errors
  readStream.on('error', (err) => {
    res.status(500).json({
      status: 'error',
      message: 'Error streaming track',
    });
  });
});

// Get Track play count
exports.incrementPlayCount = catchAsync(async (req, res, next) => {
  const updatedTrack = await Track.findByIdAndUpdate(
    req.params.id,
    { $inc: { playCount: 1 } },
    { new: true, runValidators: true }
  );

  if (!updatedTrack) {
    return res.status(404).json({
      status: 'fail',
      message: 'Track not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      track: updatedTrack,
    },
  });
});

// Get Popular Tracks
exports.getPopularTracks = catchAsync(async (req, res, next) => {
  // Get the top 10 tracks by play count
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const tracks = await Track.find()
    .sort({ playCount: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: 'success',
    results: tracks.length,
    data: { tracks },
  });
});
