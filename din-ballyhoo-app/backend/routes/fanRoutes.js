const express = require('express');
const fanController = require('../controllers/fanController');

const router = express.Router();

router 
    .get(fanController.getAllFans)
    .post(fanController.createFan)

router
    .route('/:id')
    .get(fanController.getFan)
    .patch(fanController.updateFan)
    .delete(fanController.deleteFan);

module.exports = router;