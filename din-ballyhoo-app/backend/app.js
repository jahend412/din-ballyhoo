const express = require('express');

const morgan = require('morgan');

const albumRoutes = require('./routes/albumRoutes');
const bandMemberRoutes = require('./routes/bandMemberRoutes');
const fanRoutes = require('./routes/fanRoutes');
const merchRoutes = require('./routes/merchRoutes');
const userRoutes = require('./routes/userRoutes');
const trackRoutes = require('./routes/trackRoutes');
const showRoutes = require('./routes/showRoutes');
const webcastRoutes = require('./routes/webcastRoutes');

const app = express();

//  Error handling   * This is a catch-all route handler
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/albums', albumRoutes);
app.use('/api/v1/bandMembers', bandMemberRoutes);
app.use('/api/v1/fans', fanRoutes);
app.use('/api/v1/merch', merchRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tracks', trackRoutes);
app.use('/api/v1/shows', showRoutes);
app.use('/api/v1/webcasts', webcastRoutes);

module.exports = app;