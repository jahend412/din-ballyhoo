const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const albumRoutes = require('./routes/albumRoutes');
const commentRoutes = require('./routes/commentRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
// const bandMemberRoutes = require('./routes/bandMemberRoutes');
// const fanRoutes = require('./routes/fanRoutes');
const merchRoutes = require('./routes/merchRoutes');
const userRoutes = require('./routes/userRoutes');
const trackRoutes = require('./routes/trackRoutes');
const showRoutes = require('./routes/showRoutes');
const webcastRoutes = require('./routes/webcastRoutes');

const app = express();

// 1. Global Middleware
app.use(helmet()); // Helmet helps secure Express apps by setting various HTTP headers

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 2. Rate limiting middleware
const limiter = rateLimit({
  max: 100, // Maximum 100 requests per hour
  windowMs: 60 * 60 * 1000, // 100 requests per hour
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

// Body parser middleware
app.use(express.json({ limit: '100kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attacks
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      //  To Be Added with specific routes that require sanitization
    ],
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes

app.use('/api/v1/albums', albumRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/favorites', favoritesRoutes);
// app.use('/api/v1/bandMembers', bandMemberRoutes);
// app.use('/api/v1/fans', fanRoutes);
app.use('/api/v1/merch', merchRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tracks', trackRoutes);
app.use('/api/v1/shows', showRoutes);
app.use('/api/v1/webcasts', webcastRoutes);

// Error handling middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
