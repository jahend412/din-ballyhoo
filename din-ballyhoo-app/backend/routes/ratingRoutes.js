const express = require('express');
const ratingController = require('../controllers/ratingController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes below this middleware
router.use(authController.protect);

// Routes for creating, getting, updating, and deleting ratings
router
  .route('/:entityType/:entityId/ratings') // for creating and retrieving ratings for an entity
  .get(ratingController.getRatingsForEntity) // Get all ratings for a specific entity
  .post(ratingController.createRating); // Create a new rating for a specific entity

router
  .route('/:entityType/:entityId/ratings/:id') // for updating and deleting a specific rating
  .patch(ratingController.updateRating) // Update a specific rating
  .delete(ratingController.deleteRating); // Delete a specific rating

module.exports = router;
