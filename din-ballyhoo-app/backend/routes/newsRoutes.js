const express = require('express');
const newsController = require('../controllers/newsController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/news')
  .get(newsController.getAllNews)
  .post(
    checkPermissions('create-news'),
    authController.protect,
    authController.restrictTo('admin'),
    newsController.createNews
  );

router
  .route('/news/:id')
  .get(newsController.getNews)
  .patch(
    checkPermissions('edit-news'),
    authController.protect,
    authController.restrictTo('admin'),
    newsController.updateNews
  )
  .delete(
    checkPermissions('delete-news'),
    authController.protect,
    authController.restrictTo('admin'),
    newsController.deleteNews
  );

module.exports = router;
