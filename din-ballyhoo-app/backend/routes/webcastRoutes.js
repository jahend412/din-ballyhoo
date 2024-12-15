const express = require('express');
const webcastController = require('../controllers/webcastController');
const authController = require('../controllers/authController');
const checkPermissions = require('../middleware/permissionsMiddleware');

const router = express.Router();

// GET all webcasts
router
  .route('/')
  .get(checkPermissions('view-webcast'), webcastController.getAllWebcasts)
  .post(checkPermissions('create-webcast'), webcastController.createWebcast);

// GET, PATCH, DELETE a specific webcast by ID
router
  .route('/:id')
  .get(checkPermissions('view-webcast'), webcastController.getWebcast)
  .patch(checkPermissions('edit-webcast'), webcastController.updateWebcast)
  .delete(checkPermissions('delete-webcast'), webcastController.deleteWebcast);

module.exports = router;
