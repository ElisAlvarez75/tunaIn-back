const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    podcast: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Podcast'
    }

});

const Comments = mongoose.model('Comments', schema);

module.exports = Comments;