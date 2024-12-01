const Shows = require('../models/showModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllShows = catchAsync(async (req, res, next) => {
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
      shows,
    },
  });
});

exports.createShow = catchAsync(async (req, res, next) => {
  const newShow = await Shows.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      show: newShow,
    },
  });
});

exports.getShowById = catchAsync(async (req, res, next) => {
  const show = await Shows.findById(req.params.id);
  if (!show) {
    return res.status(404).json({
      status: 'fail',
      message: 'No show found with that ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      show,
    },
  });
});

exports.updateShow = catchAsync(async (req, res, next) => {
  const show = await Shows.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!show) {
    return res.status(404).json({
      status: 'fail',
      message: 'No show found with that ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      show,
    },
  });
});

exports.deleteShow = catchAsync(async (req, res, next) => {
  const show = await Shows.findByIdAndDelete(req.params.id);
  if (!show) {
    return res.status(404).json({
      status: 'fail',
      message: 'No show found with that ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
