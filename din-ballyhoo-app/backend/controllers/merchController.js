const Merch = require('../models/merchModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.aliasTopMerch = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-price';
  req.query.fields = 'name,price';
  next();
};

// Route Handlers
exports.getAllMerch = factory.getAll(Merch);
exports.getMerch = factory.getOne(Merch);
exports.createMerch = factory.createOne(Merch);
exports.updateMerch = factory.updateOne(Merch);
exports.deleteMerch = factory.deleteOne(Merch);

// Get Merch Stats
exports.getMerchStats = catchAsync(async (req, res, next) => {
  const stats = await Merch.aggregate([
    {
      $match: { price: { $gte: 5 } },
    },
    {
      $group: {
        _id: null, // Grouping everything together
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
