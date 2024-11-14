const express = require('express');
const webcastController = require('../controllers/webcastController');

const router = express.Router();

router  
    .get(webcastController.getAllWebcasts)
    .post(webcastController.createWebcast)
    .get(webcastController.getWebcastById)
    .put(webcastController.updateWebcast)
    .delete(webcastController.deleteWebcast);

module.exports = router;

