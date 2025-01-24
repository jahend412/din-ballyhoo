const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const express = require('express');

// Load environment variables FIRST
const result = dotenv.config({
  path: path.resolve(__dirname, './config.env'),
});

// Check if .env file was loaded successfully
if (result.error) {
  console.error('Error loading .env file:', result.error);
  throw new Error('Unable to load environment variables');
}

const app = require('./app');

// Construct the MongoDB URI
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// MongoDB connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    // Start the app
    const port = process.env.PORT || 8080;
    const server = app.listen(port, () => {});

    return conn;
  });

// Middleware
process.on('uncaughtException', (err) => {
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  server.close(() => {
    // Always close the server like this!!!
    process.exit(1);
  });
});
