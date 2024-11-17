const Album = require('../models/albumModel');
const APIFeatures = require('../utils/apiFeatures');

// Get All Albums
exports.getAllAlbums = async (req, res) => {
    try {
       // Execute Query
        const features = new APIFeatures(Album.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

        const albums = await features.query; // Await the query
        res.status(200).json({
            status: 'success',
            results: albums.length, // Include the number of results
            data: {
                albums, // Return the fetched albums here
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message, // Include a readable error message
        });
    }
};


// Create New Album
exports.createAlbum = async (req, res) => {
    try {
        const newAlbum = await Album.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                album: newAlbum
            }
        });
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
exports.updateAlbum = async (req, res) => {
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
