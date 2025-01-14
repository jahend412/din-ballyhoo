const Album = require('../models/albumModel');
const Track = require('../models/trackModel');
const factory = require('./handlerFactory');
const multer = require('multer');

// Multer configuration
// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Generate a unique filename
  },
});

// File filter to ensure only image files are uploaded
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Not an image! Please upload only images.'), false); // Reject the file
  }
};

// Multer middleware
const upload = multer({
  storage,
  fileFilter,
});

// Middleware to handle image uploads for album cover
exports.uploadAlbumCover = upload.single('coverImage');

// Create a new album with the uploaded image
// Create a new album with the uploaded image
exports.createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseDate } = req.body;
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

    // Create the album
    const newAlbum = await Album.create({
      title,
      artist,
      releaseDate,
      details,
      coverImage: req.file ? req.file.path : undefined, // Add the uploaded file path
    });

    // Create and link tracks if provided
    const trackPromises = tracks.map(async (track) => {
      // Ensure the track has a title and URL
      if (!track.title || !track.url) {
        throw new Error('Track title and URL are required');
      }

      const newTrack = await Track.create({
        title: track.title,
        artist: track.artist || artist, // Use the album artist if track artist is not provided
        album: newAlbum._id, // Link the track to the album
        url: track.url,
        trackNumber: track.trackNumber || 1, // Set track number if provided
        // Optionally add other fields like duration, audioFile, etc.
        duration: track.duration || 0,
        audioFile: track.audioFile || '', // If applicable, handle audio file URL
      });

      return newTrack._id;
    });

    const trackIds = await Promise.all(trackPromises);

    // Add the track IDs to the album's tracks array
    await Album.findByIdAndUpdate(newAlbum._id, {
      $push: { tracks: { $each: trackIds } },
    });

    // Respond with the created album and tracks
    res.status(201).json({
      status: 'success',
      data: {
        album: newAlbum,
        tracks: trackIds,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Update an album with a new cover image
exports.updateAlbum = async (req, res, next) => {
  try {
    const updatedData = { ...req.body };

    // If a new file is uploaded, update the coverImage field
    if (req.file) {
      updatedData.coverImage = req.file.path;
    }

    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAlbum) {
      return res.status(404).json({
        status: 'fail',
        message: 'No album found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        album: updatedAlbum,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Use factory functions for other CRUD operations
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
  {
    path: 'tracks', // Add this to populate the tracks
    select: 'title artist url', // Specify the fields you want to include for tracks
  },
]);
exports.deleteAlbum = factory.deleteOne(Album);
