const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  categories: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  img: {
    type: Buffer,
    required: true,
  },
  audio: {
    type: Buffer,
    required: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  id_author: {
    type: String,
    ref: 'User',
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  published: {
    type: Boolean,
    default: true
  },
  totalFavorites: {
    type: String,
    get: (value) => `${value} favoritos`,
  },
});

const Podcast = mongoose.model('Podcast', schema);
const User = mongoose.model('User');

module.exports = Podcast;
