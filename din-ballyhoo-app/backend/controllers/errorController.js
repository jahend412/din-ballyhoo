const AppError = require('../utils/appError');

// Error handling for invalid database IDs
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
}

// Error handling for duplicate database fields
const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; // Extract the value from the error message
    
    const message = `Duplicate field value: ${value}. Please use another value!`; 
    return new AppError(message, 400);
}

// Error handling for validation errors
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

// Error handling for development
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

// Error handling for production
const sendErrorProd = (err, res) => {
    // Operational, trust error: send message to client
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    // Programming or other unknown error: don't leak error details
    } else {
        // 1) Log error
        console.error('ERROR', err);

        // 2) Send generic message
        const message = 'Something went very wrong!';

        res.status(500).json({
            status: 'error',
            message
        });
    }
};

// Export the error handling middleware
module.exports= (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development') {
       sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = {...err};  
        
        if (error.name === 'CastError') error = handleCastErrorDB(error);  
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

        sendErrorProd(err, res);
    }
};
