const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');
const checkPermissions = require('../middleware/permissionsMiddleware');

const router = express.Router();

// Protect all routes below this middleware
router.use(authController.protect);

// Get all comments from all entities (albums, tracks, merch, etc.)
router.route('/').get(commentController.getAllComments);

// Routes for creating, getting, updating, and deleting comments
router
  .route('/:entityType/:entityId')
  .get(
    checkPermissions('view-comments'),
    commentController.getCommentsForEntity
  )
  .post(checkPermissions('create-comment'), commentController.createComment); // POST for creating comments

router
  .route('/:entityType/:entityId/comments/:id') // for updating and deleting a specific comment
  .patch(checkPermissions('edit-comments'), commentController.updateComment) // Update a specific comment
  .delete(checkPermissions('delete-comment'), commentController.deleteComment); // Delete a specific comment

module.exports = router;
