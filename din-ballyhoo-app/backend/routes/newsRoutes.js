const express = require('express');
const newsController = require('../controllers/newsController');
const authController = require('../controllers/authController');
const checkPermissions = require('../middleware/permissionsMiddleware');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.route('/').get(newsController.getAllNews);

router.route('/:id').get(newsController.getNews);

router.use(authController.protect);

router
  .route('/')
  .post(
    checkPermissions('create-news'),
    authController.restrictTo('admin'),
    newsController.uploadNewsImage,
    newsController.createNews
  );

router
  .route('/:id')
  .get(newsController.getNews)
  .patch(
    checkPermissions('edit-news'),
    authController.restrictTo('admin'),
    newsController.updateNews
  )
  .delete(
    checkPermissions('delete-news'),
    authController.restrictTo('admin'),
    newsController.deleteNews
  );

module.exports = router;
