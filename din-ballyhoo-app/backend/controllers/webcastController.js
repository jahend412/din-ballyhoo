const Webcast = require('../models/webcastModel');
const Track = require('../models/trackModel');
const factory = require('./handlerFactory');
const { uploadImage } = require('../utils/uploadImage');

// Middleware to handle webcast cover image upload
exports.uploadWebcastCover = uploadImage('coverImage');

// Create a new webcast with the uploaded image and tracks
exports.createWebcast = async (req, res, next) => {
  try {
    console.log('Received request body:', req.body); // Check the full body
    const { title, artist, releaseDate, details } = req.body;
    let tracks = req.body.tracks;

    // Parse tracks if it's a string
    if (typeof tracks === 'string') {
      tracks = JSON.parse(tracks);
    }

    // Validate the tracks are in the correct format
    if (!Array.isArray(tracks) || tracks.length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Tracks array is required and cannot be empty',
      });
    }

    // Continue with the rest of the logic for creating the webcast
    const newWebcast = await Webcast.create({
      title,
      artist,
      releaseDate,
      details,
      coverImage: req.file?.path || undefined,
    });

    const trackPromises = tracks.map(async (track) => {
      if (!track.title || !track.url) {
        throw new Error('Track title and URL are required');
      }

      const newTrack = await Track.create({
        title: track.title,
        artist: track.artist || artist,
        webcast: newWebcast._id,
        url: track.url,
        trackNumber: track.trackNumber || 1,
        duration: track.duration || 0,
        audioFile: track.audioFile || '',
      });

      return newTrack._id;
    });

    const trackIds = await Promise.all(trackPromises);

    await Webcast.findByIdAndUpdate(newWebcast._id, {
      $push: { tracks: { $each: trackIds } },
    });

    res.status(201).json({
      status: 'success',
      data: {
        webcast: newWebcast,
        tracks: trackIds,
      },
    });
  } catch (error) {
    console.error('Error creating webcast:', error);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

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

exports.updateWebcast = factory.updateOne(Webcast);
exports.deleteWebcast = factory.deleteOne(Webcast);
