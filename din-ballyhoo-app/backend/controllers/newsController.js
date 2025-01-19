const News = require('../models/newsModel');
const factory = require('./handlerFactory');
const multer = require('multer');

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
exports.uploadNewsImage = upload.single('coverImage');

exports.createNews = async (req, res, next) => {
  try {
    const { title, content, datePosted } = req.body;

    const newNews = await News.create({
      title,
      content,
      datePosted,
      coverImage: req.file ? req.file.path : undefined, // Add the uploaded file path
    });

    res.status(201).json({
      status: 'success',
      data: {
        news: newNews,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllNews = factory.getAll(News);
exports.getNews = factory.getOne(News);
exports.updateNews = factory.updateOne(News);
exports.deleteNews = factory.deleteOne(News);
