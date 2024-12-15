const express = require('express');
const showController = require('../controllers/showController');
const authController = require('../controllers/authController');
const checkPermissions = require('../middleware/permissionsMiddleware');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(checkPermissions('view-show'), showController.getAllShows)
  .post(checkPermissions('create-show'), showController.createShow);

router
  .route('/:id')
  .get(checkPermissions('view-show'), showController.getShow)
  .patch(checkPermissions('edit-show'), showController.updateShow)
  .delete(checkPermissions('delete-show'), showController.deleteShow);

module.exports = router;
