const express = require('express');
const albumController = require('../controllers/albumController');
const authController = require('../controllers/authController');
const checkPermissions = require('../middleware/permissionsMiddleware');

const router = express.Router();

// Protect all routes below this middleware
router.use(authController.protect);

router
  .route('/') // Specify the base path for both methods
  .get(checkPermissions('view-album'), albumController.getAllAlbums) // Fetch all albums
  .post(checkPermissions('create-album'), albumController.createAlbum); // Add a new album

router
  .route('/:id') // Specify the path for operations on a specific album by ID
  .get(checkPermissions('view-album'), albumController.getAlbum) // Get a specific album by ID
  .patch(checkPermissions('edit-album'), albumController.updateAlbum) // Update album by ID
  .delete(checkPermissions('delete-album'), albumController.deleteAlbum); // Delete album by ID

module.exports = router;
