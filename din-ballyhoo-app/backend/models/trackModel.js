const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title is required']
    },
    artist: {
        type: String,
        required: [true, 'Artist is required']
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: false
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required']
    },
    audioFile: {
        type: String, // URL to the audio file
        required: [true, 'Audio file is required']
    },
    coverImage: {
        type: String, 
        required: [true, 'Cover image is required']
    },
    trackNumber: {
        type: Number,
        required: [true, 'Track number is required']
    },
    songWriter: {
        type: String,
        required: false
    },
    producer: {
        type: String,
        required: false
    },
    genre: {
        type: String,
        required: false
    },
    releaseDate: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;