const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');  // Make sure this path is correct

const trackController = require('../controllers/trackController');

router
    .route('/')
    .get(trackController.getAllTracks)
    .post(trackController.createTrack);
   
router
    .route('/:id')    
    .get(trackController.getTrackById)
    .put(trackController.updateTrack)
    .delete(trackController.deleteTrack);

router
    .route('/:id/stream', trackController.streamTrackById);


// Route to upload a track
router
    .post('/upload', upload.single('track'), (err, req, res, next) => {
    if (err) {
        // Handle any Multer errors (like file size, incorrect file type, etc.)
        return res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
    // Proceed to your controller method if there are no errors
    next();
}, trackController.uploadTrack);

module.exports = router;