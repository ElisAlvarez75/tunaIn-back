require('./connection');
const User = require('./schemas/User');
const Podcast = require('./schemas/Podcast');
const Comment = require("./schemas/Comment");
const Favoritos = require('./schemas/Favoritos');
const Playlist = require('./schemas/Playlist');
const {initFirstUser} = require('./initFirstUser');

initFirstUser(User);

module.exports = {
  user: User,
  podcast: Podcast,
  comment: Comment,
  favoritos: Favoritos,
  playlist: Playlist,
}

