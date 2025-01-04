const express = require('express');
const albumController = require('../controllers/albumController');
const authController = require('../controllers/authController');
const checkPermissions = require('../middleware/permissionsMiddleware');

const router = express.Router();

// Protect all routes below this middleware
router.use(authController.protect);

// Route to fetch all albums or create a new album with a cover image
router
  .route('/')
  .get(checkPermissions('view-album'), albumController.getAllAlbums) // Fetch all albums
  .post(
    checkPermissions('create-album'),
    // albumController.uploadAlbumCover, // Middleware to handle file uploads
    albumController.createAlbum // Create a new album
  );

// Routes for specific album operations
router
  .route('/:id')
  .get(checkPermissions('view-album'), albumController.getAlbum) // Get a specific album by ID
  .patch(
    checkPermissions('edit-album'),
    // albumController.uploadAlbumCover, // Middleware for updating the album's cover image
    albumController.updateAlbum // Update album details
  )
  .delete(checkPermissions('delete-album'), albumController.deleteAlbum); // Delete album by ID

module.exports = router;
