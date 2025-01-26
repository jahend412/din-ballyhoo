const AppError = require('../utils/appError');

// Error handling for invalid database IDs
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Error handling for duplicate database fields
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; // Extract the value from the error message

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// Error handling for validation errors
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Error handling for invalid JWT tokens
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

// Error handling for expired JWT tokens
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

// Error handling for development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Error handling for production
const sendErrorProd = (err, res) => {
  // Check if headers have already been sent to avoid multiple responses
  if (res.headersSent) {
    console.error('Response already sent, skipping error response.');
    return;
  }

  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  if (err.isOperational) {
    res.status(statusCode).json({
      status,
      message: err.message || 'Something went wrong!',
    });
  } else {
    // 1) Log the unexpected error
    console.error('ERROR:', err);

    // 2) Send a generic message to avoid leaking details
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

// Export the error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(err, res);

    sendErrorProd(err, res);
  }
};
