const express = require('express');
const trackController = require('../controllers/trackController');

const router = express.Router();

router
    .route('/')
    .get(trackController.getAllTracks)
    .post(trackController.createTrack)
    .get(trackController.getTrackById)
    .put(trackController.updateTrack)
    .delete(trackController.deleteTrack);

module.exports = router;