const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const express = require('express');

// Load environment variables only if not in production (Heroku)
if (process.env.NODE_ENV !== 'production') {
  console.log('NODE_ENV:', process.env.NODE_ENV);
  const result = dotenv.config({
    path: path.resolve(__dirname, './.env'),
  });

  if (result.error) {
    console.error('Error loading .env file:', result.error);
    throw new Error('Unable to load environment variables');
  }
}

const app = require('./app');

// Construct the MongoDB URI from the environment variable
const DB = process.env.DATABASE;

// MongoDB connection
mongoose
  .connect(DB)
  .then(() => {
    console.log('MongoDB connected successfully');
    const port = process.env.PORT || 8080;
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});
