const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables FIRST
const result = dotenv.config({ 
    path: path.resolve(__dirname, './config.env') 
});

// Check if .env file was loaded successfully
if (result.error) {
    console.error('Error loading .env file:', result.error);
    throw new Error('Unable to load environment variables');
}

const setupGridFsStorage = require('./utils/multer');
const app = require('./app');

// Construct the MongoDB URI
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

// MongoDB connection
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((conn) => {
    console.log('MongoDB Connected');

    // Start the app
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`App running on port ${port}...`);
    });

    return conn;
})
.catch(err => {
    console.error('Initialization error:', err);
    process.exit(1);
});