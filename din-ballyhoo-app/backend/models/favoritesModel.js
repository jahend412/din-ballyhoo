const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
  fan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // 'User' is the name of the model
    required: [true, 'Favorite must belong to a fan'],
  },
  tracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track', // 'Track' is the name of the model
    },
  ],
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album', // 'Album' is the name of the model
    },
  ],
  shows: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Show', // 'Show' is the name of the model
    },
  ],
  webcasts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Webcast', // 'Webcast' is the name of the model
    },
  ],
});

// Ensure fans can have only one favorite
favoritesSchema.indexes({ fan: 1 }, { unique: true });

const Favorites = mongoose.model('Favorites', favoritesSchema);
module.exports = Favorites;
