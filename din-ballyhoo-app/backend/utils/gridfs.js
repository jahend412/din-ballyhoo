const { GridFsStorage } = require('multer-gridfs-storage');
const gridfsStream = require('gridfs-stream');
const mongoose = require('mongoose');

// Construct the MongoDB URI
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

// Create a connection to the MongoDB database
const conn = mongoose.createConnection(DB);

// Initialize the GridFS stream
let gfs;
conn.once('open', () => {  // Once the connection is open
    gfs = gridfsStream(conn.db, mongoose.mongo); // Initialize the stream
    gfs.collection('tracks');  // Set the collection name
});

// Create GridFS storage engine
const storage = new GridFsStorage({  // Create a new GridFS storage engine
    url: DB,   // MongoDB URI
    file: (req, file) => {  // File configuration
        if (file.mimetype === 'audio/mpeg') {  // Accept only MP3 files
            return {
            bucketName: 'tracks', // Bucket name
            filename: `track-${Date.now()-}${file.originalname}`,  // File name
        };
    }
    return null;  // Reject non-MP3 files
    }
});

module.exports = { gfs, storage };  // Export the GridFS stream and storage engine


