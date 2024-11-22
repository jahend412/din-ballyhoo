const Webcast = require('../models/webcastModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllWebcasts = catchAsync(async (req, res, next) => {
    
        // Execute the query
        const features = new APIFeatures(Webcast.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const webcasts = await features.query;
        res.status(200).json({
            status: 'success',
            results: webcasts.length,
            data: {
                webcasts
            }
        });
});

exports.createWebcast = catchAsync(async (req, res, next) => {
    
        const newWebcast = await Webcast.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                webcast: newWebcast
            }
        });
});

exports.getWebcastById = catchAsync(async (req, res, next) => {
    
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
});

exports.updateWebcast = catchAsync(async (req, res, next) => {
    
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
});

exports.deleteWebcast = catchAsync(async (req, res, next) => {
    
        await Webcast.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
});
