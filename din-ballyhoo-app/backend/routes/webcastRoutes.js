const express = require('express');
const webcastController = require('../controllers/webcastController');

const router = express.Router();

// GET all webcasts
router.get('/', webcastController.getAllWebcasts);

// POST a new webcast
router.post('/', webcastController.createWebcast);

// GET a single webcast by ID
router.get('/:id', webcastController.getWebcastById);

// PUT (update) a webcast by ID
router.put('/:id', webcastController.updateWebcast);

// DELETE a webcast by ID
router.delete('/:id', webcastController.deleteWebcast);

module.exports = router;
