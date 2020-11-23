require('./connection');
const User = require('./schemas/User');
const Podcast = require('./schemas/Podcast');
const {initFirstUser} = require('./initFirstUser');

initFirstUser(User);

module.exports = {
  user: User,
  podcast: Podcast,
}
