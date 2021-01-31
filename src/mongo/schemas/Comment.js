const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const options = {
    page: 1,
    limit: 10,
    collation: {
        locale: 'en'
    }
};

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
    },
    date: {
        type: String,
        ref: 'date',
        required: [true, 'La fecha es necesaria']
    }

});
schema.plugin(mongoosePaginate);

const Comment = mongoose.model('Comment', schema);

Comment.paginate({}, options).then({

});

module.exports = Comment;