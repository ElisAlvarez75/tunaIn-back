const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id_author: {
    type: String,
    ref: 'User',
    required: true,
  },
  id_podcast: {
    //type: String,
    type: mongoose.Schema.ObjectId,
    ref: 'Podcast',
  },

});

const Favoritos = mongoose.model('Favoritos', schema);

module.exports = Favoritos;
