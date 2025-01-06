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
exports.createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseDate } = req.body;
    let tracks = req.body.tracks;

    // Parse tracks if it's a string
    if (typeof tracks === 'string') {
      tracks = JSON.parse(tracks);
    }

    // Create the album
    const newAlbum = await Album.create({
      title,
      artist,
      releaseDate,
      coverImage: req.file ? req.file.path : undefined, // Add the uploaded file path
    });

    // Create and link tracks if provided
    if (Array.isArray(tracks) && tracks.length > 0) {
      const trackPromises = tracks.map(async (track) => {
        const newTrack = await Track.create({
          title: track.title,
          artist: track.artist || artist,
          album: newAlbum._id,
          url: track.url,
        });
        return newTrack._id;
      });

      const trackIds = await Promise.all(trackPromises);

      // Add the tracks to the album
      await Album.findByIdAndUpdate(newAlbum._id, {
        $push: { tracks: { $each: trackIds } },
      });
    }

    // Respond with the created album
    res.status(201).json({
      status: 'success',
      data: newAlbum, // Return the created album
    });
  } catch (error) {
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
