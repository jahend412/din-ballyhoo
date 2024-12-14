const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes below this middleware
router.use(authController.protect);

// Routes for creating, getting, updating, and deleting comments
router
  .route('/:entityType/:entityId')
  .get(commentController.getCommentsForEntity)
  .post(commentController.createComment); // POST for creating comments

router
  .route('/:entityType/:entityId/comments/:id') // for updating and deleting a specific comment
  .patch(commentController.updateComment) // Update a specific comment
  .delete(commentController.deleteComment); // Delete a specific comment

module.exports = router;
