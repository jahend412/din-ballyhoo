const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
      process.exit(1);
});

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
    const server = app.listen(port, () => {
        console.log(`App running on port ${port}...`);
    });

    return conn;
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION! Shutting down...');
    server.close(() => {  // Always close the server like this!!!
        process.exit(1);
    });
});

