const mongoose = require('mongoose');

const merchSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    size: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    stock: {
        type: Boolean,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    }
});

const Merch = mongoose.model('Merch', merchSchema);

module.exports = Merch;

