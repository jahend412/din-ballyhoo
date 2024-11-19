const Shows = require('../models/showModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllShows = async (req, res) => {
    try {
       const features = new APIFeatures(Shows.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const shows = await features.query;
    
        res.status(200).json({
            status: 'success',
            results: shows.length,
            data: {
                shows
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.createShow = async (req, res) => {
    try {
        const newShow = await Shows.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                show: newShow
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getShowById = async (req, res) => {
    try {
        const show = await Shows.findById(req.params.id);
        if (!show) {
            return res.status(404).json({
                status: 'fail',
                message: 'No show found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                show
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.updateShow = async (req, res) => {
    try {
        const show = await Shows.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!show) {
            return res.status(404).json({
                status: 'fail',
                message: 'No show found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                show
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteShow = async (req, res) => {
    try {
        const show = await Shows.findByIdAndDelete(req.params.id);
        if (!show) {
            return res.status(404).json({
                status: 'fail',
                message: 'No show found with that ID'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

