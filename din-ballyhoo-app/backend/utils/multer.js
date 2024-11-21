const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const dotenv = require('dotenv');

// Explicitly specify the path to the .env file
const result = dotenv.config({ 
    path: path.resolve(__dirname, '../config.env') 
});

// Check if .env file was loaded successfully
if (result.error) {
    console.error('Error loading .env file:', result.error);
    throw new Error('Unable to load environment variables');
}

// Validate required environment variables
const requiredEnvVars = ['DATABASE', 'DATABASE_PASSWORD'];
requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`Missing required environment variable: ${varName}`);
        console.error('Current environment variables:', process.env);
        throw new Error(`Missing required environment variable: ${varName}`);
    }
});

// Construct the MongoDB URI
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

const setupGridFsStorage = () => {
    const storage = new GridFsStorage({
        url: DB,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                // Add comprehensive logging
                console.log('GridFS Storage - Incoming file:', {
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    requestBody: req.body
                });

                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        console.error('Crypto random bytes error:', err);
                        return reject(err);
                    }
                    
                    try {
                        // Generate a unique filename
                        const filename = `track-${Date.now()}-${file.originalname}`;
                        
                        const fileInfo = {
                            bucketName: 'tracks',
                            filename: filename,
                            metadata: {
                                title: req.body.title || 'Unknown Title',
                                artist: req.body.artist || 'Unknown Artist'
                            }
                        };
                        
                        resolve(fileInfo);
                    } catch (processingError) {
                        console.error('File info processing error:', processingError);
                        reject(processingError);
                    }
                });
            });
        },
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    });

    // Add error event listeners
    storage.on('connection', (db) => {
        console.log('GridFS Storage connected to database');
    });

    storage.on('error', (error) => {
        console.error('GridFS Storage Connection Error:', error);
    });

    // Configure multer with file filtering and limits
    const upload = multer({ 
        storage: storage,
        fileFilter: (req, file, cb) => {
            console.log('File Filter - Incoming file:', {
                originalname: file.originalname,
                mimetype: file.mimetype
            });

            // Only allow audio files
            if (file.mimetype.startsWith('audio/')) {
                cb(null, true);
            } else {
                cb(new Error('Only audio files are allowed'), false);
            }
        },
        limits: {
            fileSize: 50 * 1024 * 1024 // 50MB file size limit
        }
    });

    return upload;
};

module.exports = setupGridFsStorage;