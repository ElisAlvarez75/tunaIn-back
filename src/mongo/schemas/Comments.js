const mongoose = require('mongoose');
const Comments = mongoose.model('Comments');

const schema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        unique: true,
    },
    like: {
        type: Boolean
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