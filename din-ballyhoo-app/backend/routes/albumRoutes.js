const express = require('express');
const albumController = require('../controllers/albumController');
const router = express.Router();

router
  .route('/') // Specify the base path for both methods
  .get(albumController.getAllAlbums) // Fetch all albums
  .post(albumController.createAlbum); // Add a new album

router
  .route('/:id') // Specify the path for operations on a specific album by ID
  .get(albumController.getAlbum) // Get a specific album by ID
  .patch(albumController.updateAlbum) // Update album by ID
  .delete(albumController.deleteAlbum); // Delete album by ID

module.exports = router;
