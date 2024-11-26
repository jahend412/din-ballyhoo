const express = require('express');
const router = express.Router();
const setupGridFsStorage = require('../utils/multer');

const app = express();

// Body parsing middleware MUST come before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = setupGridFsStorage();

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


    router
        .post('/upload', (req, res) => {
        // Log incoming request details
        console.log('Upload Request Received:', {
            body: req.body,
            files: req.files,
            headers: req.headers
        });
    
        const upload = setupGridFsStorage();
    
        // Use a Promise-based approach for better error handling
        const uploadSingle = (req, res) => {
            return new Promise((resolve, reject) => {
                upload.single('file')(req, res, (err) => {
                    if (err) {
                        console.error('Upload Middleware Error:', err);
                        return reject(err);
                    }
                    resolve(req.file);
                });
            });
        };
    
        uploadSingle(req, res)
            .then(file => {
                if (!file) {
                    return res.status(400).json({ 
                        status: 'error', 
                        message: 'No file uploaded' 
                    });
                }
    
                // Create track object with additional metadata
                const track = {
                    filename: file.filename,
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size,
                    title: req.body.title || 'Unknown Title',
                    artist: req.body.artist || 'Unknown Artist'
                };
    
                // Log the uploaded file details
                console.log('Uploaded track:', track);
    
                // Respond with success
                res.status(201).json({
                    status: 'success',
                    data: { track }
                });
            })
            .catch(err => {
                console.error('Upload Error:', err);
                res.status(500).json({ 
                    status: 'error', 
                    message: err.message || 'File upload failed'
                });
            });
    });

module.exports = router;