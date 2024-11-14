const Track = require('../models/trackModel');
const express = require('express');

const app = express();

app.use(express.json());


// Get All Tracks
exports.getAllTracks = async (req, res) => {
    try {
        const tracks = await Track.find();
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
        const track = await Trackk.findByIdAndUpdate(req.params.id);
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