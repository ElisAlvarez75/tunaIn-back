const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  fecha: {
    type: Date, 
  },
  id_user: {
    type: String,
    required: true,
    unique: true,
  },
  

});

const User = mongoose.model('User', schema);

module.exports = User;