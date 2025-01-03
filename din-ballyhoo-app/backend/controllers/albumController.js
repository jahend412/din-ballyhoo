const Album = require('../models/albumModel');
const multer = require('multer');
const factory = require('./handlerFactory');

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

    const newAlbum = await Album.create({
      title,
      artist,
      releaseDate,
      coverImage: req.file ? req.file.path : undefined, // Add the uploaded file path
    });

    res.status(201).json({
      status: 'success',
      data: {
        album: newAlbum,
      },
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
]);
exports.deleteAlbum = factory.deleteOne(Album);
