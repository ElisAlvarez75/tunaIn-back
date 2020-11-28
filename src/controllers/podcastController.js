const express = require('express')
const models = require('../mongo');


const podcastRouter = () => {

    let router = express.Router();

    router.use('/comments', (req, res) => {

        const user = req.user.id;
        const comment = new models.comments({
            comment_id: req.comment.id
        });

        return comment.save().then(result => {
            models.user.findByIdAndUpdate(user, {$push: {comments: result._id}})
                .then((result) => {
                    res.status(200).send(user)
                })
        }).catch((err) => {
            res.status(500).send({error: err})
        });
    });

    //Get one by ID
    router.get('/:comments/:id', (req, res) => {
        const comments = models[req.params.comments];
        return comments.findById(req.params.id).then((result) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send();
            }
        }).catch((err) => {
            res.status(500).send({error: err})
        })
    });

    // CREATE
    router.post('/:comments', (req, res) => {
        const comments = models[req.params.comments];
        const newcomments = new comments(req.body);
        return newcomments.save().then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({error: err})
        });
    });
    // UPDATE BY ID
    router.put('/:comments/:id', (req, res) => {
        const comments = models[req.params.comments];
        return comments.findByIdAndUpdate(req.params.id, req.body, {'new': true})
            .then((result) => {
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(404).send();
                }
            }).catch((err) => {
                res.status(500).send({error: err})
            });
    });
    //DELETE
    router.delete('/:comments/:id', (req, res) => {
        const comments = models[req.params.comments];
        return comments.findByIdAndDelete(req.params.id).then(() => {
            res.status(204).send();
        }).catch((err) => {
            res.status(500).send({error: err})
        });
    });
    return router;
};

module.exports = {
    podcastRouter
}