const express = require('express');
const showController = require('../controllers/showController');

const router = express.Router();

router
  .route('/')
  .get(showController.getAllShows)
  .post(showController.createShow);

router
  .route('/:id')
  .get(showController.getShowById)
  .patch(showController.updateShow)
  .delete(showController.deleteShow);

module.exports = router;
