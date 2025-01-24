const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checkPermissions = require('../middleware/permissionsMiddleware');

const app = express();

router.use(authController.protect);

// Body parsing middleware MUST come before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const trackController = require('../controllers/trackController');

router
  .route('/')
  .get(checkPermissions('view-track'), trackController.getAllTracks)
  .post(checkPermissions('create-track'), trackController.createTrack);

router.get('/popular', trackController.getPopularTracks);

router
  .route('/:id')
  .get(checkPermissions('view-track'), trackController.getTrack)
  .patch(checkPermissions('edit-track'), trackController.updateTrack)
  .delete(checkPermissions('delete-track'), trackController.deleteTrack);

router.route('/:id/stream', trackController.streamTrackById);

router.patch('/:id/increment-playcount', trackController.incrementPlayCount);

// Closing the route and router
module.exports = router;
