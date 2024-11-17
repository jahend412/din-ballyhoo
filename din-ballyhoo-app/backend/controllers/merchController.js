const Merch = require('../models/merchModel');
const express = require('express');

const app = express();

app.use(express.json());

exports.aliasTopMerch = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-price';
    req.query.fields = 'name,price';
    next();
}

// Get All Merch
exports.getAllMerch = async (req, res) => {
    try {

// Filtering
const queryObj = { ...req.query }; // Destructure the query object
const excludedFields = ['page', 'sort', 'limit', 'fields']; // Define the fields to exclude from the query object
excludedFields.forEach((el) => delete queryObj[el]); // Loop through the excluded fields and delete them from the query object


// Advanced Filtering
let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

const query = Merch.find(JSON.parse(queryStr));

// Sorting
if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query.sort(sortBy);
} else {
    query.sort('-createdAt');
}

// Field Limiting
if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query.select(fields);
} else {
    query.select('-__v');
}

// Pagination
const page = req.query.page * 1 || 1;
const limit = req.query.limit * 1 || 100;
const skip = (page - 1) * limit;

query.skip(skip).limit(limit);

const numMerch = await Merch.countDocuments();
if (req.query.page) {
    if (skip >= numMerch) throw new Error('This page does not exist');
} 
        
// Execute Query
        
        const merch = await query;
        res.status(200).json({
            status: 'success',
            results: merch.length,
            data: {
                merch
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

// Create New Merch
exports.createMerch = async (req, res) => {
    try {
        const newMerch = await Merch.create(req.body);
        res.status(201).json({
            stauts: 'success',
            data: {
                merch: newMerch
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

// Get Merch By ID
exports.getMerchById = async (req, res) => {
    try {
        const merch = await Merch.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                merch
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}  
// Update Merch
exports.updateMerch = async (req, res) => {
    try {
        const merch = await Merch.findByIdAndUpdate
        (req.body, req.params);
        res.status(200).json({
            status: 'success',
            data: {
                merch
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

// Delete Merch
exports.deleteMerch = async (req, res) => {
    try {
        await Merch.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}