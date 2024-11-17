const Track = require('../models/trackModel');
const APIFeatures = require('../utils/apiFeatures');


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
        const track = await Track.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: {
                track
            }
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
}
}

// Create Track
exports.createTrack = async (req, res) => {
    try {
        const newTrack = await Track.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                track: newTrack
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
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