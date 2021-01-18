const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
      },
      
    description: {
        type: String,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },

    podcast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Podcast',
        required: true,
    }],

    published: {
      type: Boolean,
      default: true
    },

})

const Playlist = mongoose.model('Playlist', schema);

module.exports = Playlist;