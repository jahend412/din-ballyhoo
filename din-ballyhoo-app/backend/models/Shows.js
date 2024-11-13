const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    bandName: {
        type: String,
        required: [true, 'Band name is required']
    },
    venue: {
        type: String, 
        required: [true, 'Venue is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    setlist: {
        type: String,
        required: [true, 'Setlist is required']
    },
    audioTracks: [
        {
          trackTitle: { type: String, required: true },
          duration: { type: Number }, // in seconds or minutes
          trackUrl: { type: String, required: true }
        }
      ],
    imageUrl: {
        type: String,
    }
});

const Show = mongoose.model('Show', showSchema);
module.exports = Show; 