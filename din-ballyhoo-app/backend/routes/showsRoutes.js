const express = require('express');
const showsController = require('../controllers/showsController');

const router = express.Router();

router
    .get(showsController.getAllShows)
    .post(showsController.createShow)
    .get(showsController.getShowById)
    .put(showsController.updateShow)
    .delete(showsController.deleteShow);

module.exports = router;

