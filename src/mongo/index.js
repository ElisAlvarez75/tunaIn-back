require('./connection');
const User = require('./schemas/User');
const Podcast = require('./schemas/Podcast');
const Comment = require("./schemas/Comment");
const Favoritos = require('./schemas/Favoritos');
const Follows = require('./schemas/Follows');
const Comment = require("./schemas/Comment");
const {initFirstUser} = require('./initFirstUser');

initFirstUser(User);

module.exports = {
  user: User,
  podcast: Podcast,
  comment: Comment,
  favoritos: Favoritos,
  follows: Follows,
  comment: Comment,

}

