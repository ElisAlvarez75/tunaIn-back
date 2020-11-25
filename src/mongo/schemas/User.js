const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
  },

  comments: [{

    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
  }]

});

const User = mongoose.model('User', schema);

module.exports = User;
