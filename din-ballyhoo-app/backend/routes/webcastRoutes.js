const express = require('express');
const webcastController = require('../controllers/webcastController');
const authController = require('../controllers/authController');
const checkPermissions = require('../middleware/permissionsMiddleware');

const router = express.Router();

const protect = authController.protect;

// GET all webcasts
router
  .route('/')
  .get(
    protect,
    checkPermissions('view-webcast'),
    webcastController.getAllWebcasts
  ) // Protect first, then check permission
  .post(
    protect,
    checkPermissions('create-webcast'),
    webcastController.uploadWebcastCover,
    webcastController.createWebcast
  );

// GET, PATCH, DELETE a specific webcast by ID
router
  .route('/:id')
  .get(protect, checkPermissions('view-webcast'), webcastController.getWebcast)
  .patch(
    protect,
    checkPermissions('edit-webcast'),
    webcastController.updateWebcast
  )
  .delete(
    protect,
    checkPermissions('delete-webcast'),
    webcastController.deleteWebcast
  );

module.exports = router;
