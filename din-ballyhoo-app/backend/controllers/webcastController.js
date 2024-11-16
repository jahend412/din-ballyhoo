const Webcast = require('../models/webcastModel');

exports.getAllWebcasts = async (req, res) => {
    try {
        const webcasts = await Webcast.find();
        res.status(200).json({
            status: 'success',
            results: webcasts.length,
            data: {
                webcasts
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.createWebcast = async (req, res) => {
    try {
        const newWebcast = await Webcast.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                webcast: newWebcast
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.getWebcastById = async (req, res) => {
    try {
        const webcast = await Webcast.findById(req.params.id);
        if (!webcast) {
            return res.status(404).json({
                status: 'fail',
                message: 'No webcast found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                webcast
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.updateWebcast = async (req, res) => {
    try {
        const webcast = await Webcast.findByIdAndUpdate
            (req.params.id, req.body, {
                new: true,
                runValidators: true
            });
        if (!webcast) {
            return res.status(404).json({
                status: 'fail',
                message: 'No webcast found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                webcast
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.deleteWebcast = async (req, res) => {
    try {
        await Webcast.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}
