class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent class constructor

    this.statusCode = statusCode; // Set the status code
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // Set the status
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
