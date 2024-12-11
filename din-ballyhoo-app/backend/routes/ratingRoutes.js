const express = require('express');
const ratingController = require('../controllers/ratingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(ratingController.getAllRatings)
  .post(ratingController.createRating);

router
  .route('/:id')
  .patch(ratingController.updateRating)
  .delete(ratingController.deleteRating);

module.exports = router;
