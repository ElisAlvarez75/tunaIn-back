const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  
  id_author: {
    type: String,
    ref: 'User',
    required: true,
  },
  id_podcast: {
    type: String,
    ref: 'Podcast',
    required: true,
  }
  
});

const Favoritos = mongoose.model('Favoritos', schema);

module.exports = Favoritos;
