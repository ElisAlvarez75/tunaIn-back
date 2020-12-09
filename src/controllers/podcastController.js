const express = require('express');
const models = require('../mongo');


const podcastRouter = () => {

    let router = express.Router();

    //Get All
    router.get('/', (req, res) => {
        const comment = models.comment;

        return comment.find().then((result) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send();
            }
        }).catch((err) => {
            res.status(500).send({error: err})
        })
    });

    // Get ALL by ID
    router.get('/:podcastId', (req, res) => {
        let from = req.query.from || 0;
        from = Number(from);
        const comment = models.comment;
        return comment.find({podcast: req.params.podcastId}).skip(from).limit(5).then((result) => {
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
    router.post('/', (req, res) => {
        let body = req.body;
        let comment = new models.comment({
            comment: body.comment,
            user: body.user.id,
            podcast: body.podcast
        })
        return comment.save().then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({error: err})
        });
    });
    // UPDATE BY ID
    router.put('/:id', (req, res) => {
        const comment = models.comment;
        return comment.findByIdAndUpdate(req.params.id, {$set: {comment: req.body.comment}}, {'new': true})
            .then((result) => {
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(404).send("El ID no existe");
                }
            }).catch((err) => {
                res.status(500).send({error: err})
            });
    });
    //DELETE
    router.delete('/:id', (req, res) => {
        const comment = models.comment;
        return comment.findByIdAndDelete(req.params.id).then(() => {
            res.status(200).send();
        }).catch((err) => {
            res.status(500).send({error: err})
        });
    });
    return router;
};

module.exports = {
    podcastRouter
}