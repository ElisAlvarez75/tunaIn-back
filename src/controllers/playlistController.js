const express = require('express');
const models = require('../mongo');


// GET ALL PLAYLIST

const playlistRouter = () => {

    let router = express.Router();

router.get('/', (req, res) => {

const allPlaylist = models.playlist;

return allPlaylist.find().then((result) => {
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send();
    }
}).catch((err) => {
    res.status(500).send({error: err})
})

});
// GET A PLAYLIST BY ID
router.get('/:playlistId', (req, res) => {

    const playlistFound = models.playlist;
    
    return playlistFound.find(req.params.id).then((result) => {
        
        if (result){
            res.status(201).send(playlistFound);
        } else {
            res.status(404).send();
        }
    }).catch((err) => {
        res.status(500).send({error: err})
    })
     
});
// CREATE PLAYLIST
router.post('/', (req, res) => {
    const body = req.body;
    const createPlaylist = new models.playlist({
        tittle: body.tittle,
        description: body.description,
        user: body.user.id,
        podcast: [body.podcast.id],
    })
    return createPlaylist.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({error: err})
    });
});

//UPDATE TITTLE AND DESCRIPTION OF A PLAYLIST
router.put('/:id', (req, res) => {
    const updatePlaylist = models.playlist;
     
    return updatePlaylist.findByIdAndUpdate(req.params.id, {$set: {updatePlaylist: req.body.playlist}},{'new': true})
        .then((result) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send("ID NOT FOUND");
            }
        }).catch((err) => {
            res.status(500).send({error: err})
        });
});

//PUSH A PODCAST TO A PLAYLIST

    
  

//DELETE PLAYLIST
router.delete('/:id', (req, res) => {
    const deletePlaylist = models.playlist;
    return deletePlaylist.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).send();
    }).catch((err) => {
        res.status(500).send({error: err})
    });
});

//DELETE A PODCAST OF A PLAYLIST
};
module.exports = {
    playlistRouter
}

