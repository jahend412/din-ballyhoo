const mongoose = require('mongoose');

const bandInfoSchema = new mongoose.Schema({
    bandName: {
        type: String,
        required: [true, 'Band name is required']
    },
    genre: {
        type: String,
        required: false
    },
    members: [
        {
            name: {type: String, required: true},
            role: {type: String, required: true},
            instruments: {type: Array, required: false},
            socialLinks: { 
                type: Map,
                of: String,
                required: false
                // Example: {facebook: 'https://www.facebook.com/ballyhoo', twitter: 'https://twitter.com/ballyhoo'}
            }
        }
    ],
    biography: {
        type: String,
        required: false
    },

    yearFormed: {
        type: Number,
        requured: false
    },
    orgin: {
        type: String,
        required: false
    },
    recordLabel: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    socialLinks: {
        type: Map,
        of: String,
        required: false
    },
});

const BandInfo = mongoose.model('BandInfo', bandInfoSchema);

module.exports = BandInfo;

    