const Merch = require('../models/merchModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.aliasTopMerch = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-price';
    req.query.fields = 'name,price';
    next();
}

// Get All Merch
exports.getAllMerch = catchAsync(async (req, res, next) => {

// Execute Query
        const features = new APIFeatures(Merch.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

        const merch = await features.query;
        res.status(200).json({
            status: 'success',
            results: merch.length,
            data: {
                merch
            }
        });
});

// Create New Merch
exports.createMerch = catchAsync(async (req, res, next) => {
  
        const newMerch = await Merch.create(req.body);
        res.status(201).json({
            stauts: 'success',
            data: {
                merch: newMerch
            }
        });
});

// Get Merch By ID
exports.getMerchById = catchAsync(async (req, res, next) => {
        const merch = await Merch.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                merch
            }
        });
});

// Update Merch
exports.updateMerch = catchAsync(async (req, res, next) => {
    
        const merch = await Merch.findByIdAndUpdate
        (req.body, req.params);
        res.status(200).json({
            status: 'success',
            data: {
                merch
            }
        });
});

// Delete Merch
exports.deleteMerch = catchAsync(async (req, res, next) => {
    
        await Merch.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
});

// Get Merch Stats
exports.getMerchStats = catchAsync(async (req, res, next) => {
    
        const stats = await Merch.aggregate([
            {
                $match: { price: { $gte: 5 } }
            },
            {
                $group: {
                    _id: null, // Grouping everything together
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            }
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        });
});
