const Track = require('../models/trackModel');
const APIFeatures = require('../utils/apiFeatures');
const { gfs, storage } = require('../utils/multer');
const multer = require('multer');

// Multer configuration
const upload = multer({ storage });  // Initialize Multer with the GridFS storage engine

// Upload Track
exports.uploadTrack = async (req, res) => {
    try {
        // Check if it is an MP3 file
        if (!req.file) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please upload an MP3 file'
            });
        }

        // Create a new track
        const track = new Track({
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            fileId: req.file.id,  // Save the file ID from GridFS
        });

        // Save the track to the database
        const savedTrack = await track.save();

        // Return a response with the saved track
        res.status(201).json({
            status: 'success',
            data: {
                track: savedTrack
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


// Get All Tracks
exports.getAllTracks = async (req, res) => {
    try {
        const features = new APIFeatures(Tracks.find(), req.query) // Fetch all tracks from the database
            .filter() // Filter the tracks
            .sort() // Sort the tracks
            .limitFields() // Limit the fields
            .paginate(); // Paginate the tracks

        const tracks = await features.query; // Await the query
        res.status(200).json({
            status: 'success',
            results: tracks.length,
            data: {
                tracks
            }
        });
    }   catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

// get Track by Id
exports.getTrackById = async (req, res) => {
    try {
        // Fetch track metadata
        const track = await Track.findById(req.params.id)
        if (!track) {
            return res.status(404).json({
                status: 'fail',
                message: 'No track found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                track
            }
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'error',
            message: err.message,
        });
    }
}

// Get Track Stream

exports.streamTrackById = async (req, res) => {
try {
        
    const track = await Track.findById(req.params.id); // Fetch track metadata
    if (!track) {
            return res.status(404).json({
                status: 'fail',
                message: 'No track found with that ID'
            });
        }

    // Stream the MP3 file from GridFS
    const readStream = gfs.createReadStream({
        _id: track.fileId,  // Fetch the track's file ID
        root: 'tracks'  // Ensure this matches the GridFS bucket name
    });

    // Set response headers to stream the MP3 file
    res.set('Content-Type', 'audio/mpeg');
    res.set('Content-Disposition', `attachment; filename="${track.title}.mp3"`);

    // Pipe the read stream to the response
    readStream.pipe(res);

    // Handle errors
    readStream.on('error', (err) => {
        res.status(500).json({
            status: 'error',
            message: 'Error streaming track'
        });
    });
} catch (err) {
    res.status(404).json({
        status: 'error',
        message: err.message,
        });
    }
};


// Create Track
exports.createTrack = async (req, res) => {
    try {
        const newTrack = await Track.create({
            title: req.body.title,
            artist: req.body.artist,  
            album: req.body.album,  
            fileId: req.file.id,  // Save the file ID from GridFS
        });
        res.status(201).json({
            status: 'success',
            data: {
                track: newTrack
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}    

//update Track 
exports.updateTrack = async (req, res) => {
    try {
        const track = await Track.findByIdAndUpdate(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                track
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

// Delete Track
exports.deleteTrack = async (req, res) => {
    try {
        await Track.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}