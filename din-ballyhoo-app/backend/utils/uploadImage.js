const multer = require('multer');

// Configure storage settings
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

// Multer instance with defined storage and file filter
const upload = multer({
  storage,
  fileFilter,
});

// Export a function to handle image uploads for a specific field name
exports.uploadImage = (fieldName) => upload.single(fieldName);
