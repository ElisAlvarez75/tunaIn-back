const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'El comentario es necesario']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       // unique: true
    },
    podcast: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Podcast',
        required: [true, 'El Podcast es necesario']
    }

});

const Comment = mongoose.model('Comment', schema);


module.exports = Comment;