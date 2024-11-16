const express = require('express');
const merchController = require('../controllers/merchController');

const router = express.Router();



router
    .route('/')
    .get(merchController.getAllMerch)
    .post(merchController.createMerch)
    .get(merchController.getMerchById)
    .put(merchController.updateMerch)
    .delete(merchController.deleteMerch);

module.exports = router;



