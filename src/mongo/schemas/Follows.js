const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  
  id_followingUser: {
    type: String,
    ref: 'User',
    required: true,
  },
  id_followedUser: {
    type: String,
    ref: 'User',
    required: true,
  }

});

const Follows = mongoose.model('Follows', schema);

module.exports = Follows;
