const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', schema);

module.exports = User;
