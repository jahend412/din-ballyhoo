const multer = require('multer');
const gridfsStream = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Construct the MongoDB URI
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

// Connect to the MongoDB database
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => { 
    console.log('MongoDB Connected');
})
.catch(err => {
    console.log('MongoDB connection error:', err)
});

// Create a connection to the MongoDB database
const conn = mongoose.connection;

// Initialize the GridFS stream
let gfs;
conn.once('open', () => {
    gfs = gridfsStream(conn.db, mongoose.mongo); // Initialize GridFS stream
    gfs.collection('tracks'); // Set the collection name

    console.log('GridFS stream is ready');
});

    // Now create the storage configuration after the DB connection is open
    const storage = new GridFsStorage({
        url: DB,
        file: (req, file) => {
            // Check if the file is an MP3
            if (file.mimetype === 'audio/mpeg') {
                return {
                    bucketName: 'tracks',  // The collection name in GridFS
                    filename: `track-${Date.now()}-${file.originalname}`, // Unique filename
                };
            } else {
                return null;  // This will cause Multer to reject non-MP3 files
            }
        }
    });

    const upload = multer({ storage });

    // Export the upload object only after the connection is established
    module.exports = { gfs, upload, storage };
