const Album = require('../models/albumModel');
const express = require('express');

const app = express();

app.use(express.json());

// Test route to confirm server is working
app.get('/', (req, res) => {
    res.send('This is working');
})

// Get All Albums
exports.getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        res.status(200).json({
            status: 'success',
            results: albums.length,
            data: {
                albums
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

// Create New Album
exports.postNewAlbum = async (req, res) => {
    try {
        const newAlbum = await Album.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                album: newAlbum
            }
        }) 
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

// Get Album By ID
exports.getAlbumById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                album
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

// Update Album
exports.patchAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                album
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

// Delete Album
exports.deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                album
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}
