const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  coverImage: {
    type: String,
    required: false,
  },
  datePosted: {
    type: Date,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
});

const News = mongoose.model('News', newsSchema);
module.exports = News;
