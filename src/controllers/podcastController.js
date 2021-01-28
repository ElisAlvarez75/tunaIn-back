const express = require('express');
const models = require('../mongo');


const podcastRouter = () => {
  let router = express.Router();

  /* Get All */
  router.get('/', (req, res) => {
    models.comment.find().then((result) => {
     if (result) {
       res.status(200).json(result);
     } else {
       res.status(404).json();
     }
    }).catch((err) => {
      res.status(500).send({error: err})
    })
  });
  /* Get ALL by ID */
  router.get('/:podcastId', (req, res) => {
    let from = req.query.from || 0;
        from = Number(from);
        
    models.comment.find({podcast: req.params.podcastId}).skip(from).limit(5)
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json();
        }
      }).catch((err) => {
        res.status(500).send({error: err})
      })
    });
    /* Get one by ID */
    router.get('/:id', (req, res) => {
        const comment = models[req.params.comment];
        return comment.findById(req.params.id).then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json();
            }
        }).catch((err) => {
            res.status(500).send({error: err})
        })
    });
    /* CREATE */
    router.post('/:id', (req, res) => {
        let body = req.body;
        let comment = new models.comment({
            comment: body.comment,
            user: req.user.id,
            podcast: body.podcast.id
        })
        return comment.save().then((result) => {
            res.json(result);
        }).catch((err) => {
            res.status(500).send({error: err})
        });
    });
    /* UPDATE BY ID */
    router.put('/:id', (req, res) => {
      models.comment.findByIdAndUpdate(req.params.id, {$set: {comment: req.body.comment}}, {'new': true})
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).send("El ID no existe");
          }
        }).catch((err) => {
           res.status(500).send({error: err})
        });
    });
    /* DELETE */
    router.delete('/:id', (req, res) => {
      models.comment.findByIdAndDelete(req.params.id)
        .then(() => {
          res.status(200).json();
       }).catch((err) => {
          res.status(500).send({error: err})
       });
    });
    return router;
};

module.exports = {
    podcastRouter
}