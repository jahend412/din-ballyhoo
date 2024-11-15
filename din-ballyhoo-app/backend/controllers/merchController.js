const Merch = require('../models/merchModel');
const express = require('express');

const app = express();

app.use(express.json());

// Get All Merch
exports.getAllMerch = async (req, res) => {
    try {
        const merch = await Merch.find();
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