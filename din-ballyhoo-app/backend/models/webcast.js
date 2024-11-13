const mongoose = require('mongoose');

const webcastSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    imageUrl: {
        type: String,
        required: false
    },
    videoUrl: {
        type: String,
        required: [true, 'Video URL is required']
    },
    setlist: {
        type: String,
        required: false
    },
    guestArtists: {
        type: String,
        required: false
    },
    viewCount: {
        type: Number,
        required: false
    },
    likes: {
        type: Number,
        required: false
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            required: false
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    downloadLink: {
        type: String,
        required: false
    },
    donateLing: {
        type: String,
        required: false
    },
});

const webcast = mongoose.model('Webcast', webcastSchema);

module.exports = webcast;