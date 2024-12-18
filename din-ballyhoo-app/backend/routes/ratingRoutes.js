const express = require('express');
const ratingController = require('../controllers/ratingController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes below this middleware
router.use(authController.protect);

// Routes for creating and retrieving ratings for a specific entity
router
  .route('/:entityType/:entityId') // For creating and retrieving ratings for an entity
  .get(ratingController.getRatingsForEntity) // Get all ratings for a specific entity
  .post(ratingController.createRating); // Create a new rating for a specific entity

router
  .route('/:entityType/:entityId/ratings')
  .get(
    authController.protect,
    ratingController.setRatingEntity, // Middleware to validate and set entity
    ratingController.getRatingsForEntity // Controller to handle the request
  )
  .post(
    authController.protect,
    ratingController.setRatingEntity, // Middleware to validate and set entity
    ratingController.createRating // Controller to create the rating
  );

// Routes for updating or deleting a specific rating by ID
router
  .route('/:entityType/:entityId/ratings/:id') // For updating and deleting a specific rating
  .patch(ratingController.updateRating) // Update a specific rating
  .delete(ratingController.deleteRating); // Delete a specific rating

module.exports = router;
