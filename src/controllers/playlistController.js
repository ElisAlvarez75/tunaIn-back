const express = require('express');
const mongoose = require('mongoose');
const Playlist = require('../mongo/schemas/Playlist');
const Podcast = require('../mongo/schemas/Podcast');

const playlistRouter = () => {
  let router = express.Router();

//GET ALL PLAYLIST
router.get('/', (req, res) => {
 Playlist.find().then((result) => {
    if(result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
 }).catch((err) => {
    res.status(500).json({error: err})
 })
});

// GET A PLAYLIST BY ID
router.get('/:playlistId', (req, res) => {
  Playlist.findById(req.params.playlistId).then((result) => {
    if(result){
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  }).catch((err) => {
     res.status(500).json({error: err})
  })
});

// CREATE  A PLAYLIST
router.post('/', (req, res) => {
 const body = req.body;
 const createPlaylist = new Playlist({
  title: req.body.title,
  description: req.body.description,
  user: body.user,
  list: body.list,
 })

  createPlaylist.save().then((result) => {
    res.json(result);
  }).catch((err) => {
    res.status(500).json({error: err})
  });
});

//UPDATE TITTLE, DESCRIPTION OF A PLAYLIST
router.put('/:id', (req, res) => {
  const updateData=  {};
    if(req.body.title){
      updateData.title = req.body.title;
    }
    if(req.body.description){
      updateData.description = req.body.description;
    }
  Playlist.findByIdAndUpdate(req.params.id, updateData,{'new': true}).then((result) => {
    if(result) {
       res.status(200).json(result);
    } else {
       res.status(404).json("ID NOT FOUND");
    }
   }).catch((err) => {
       res.status(500).json({error: err})
   });
});
//  UPDATE PLAYLIST WITH NEW PODCAST
router.put('/:playlistId/podcast', (req, res) => {
  if (req.body.list){
    const idArray = req.body.list.map( podcast => mongoose.Types.ObjectId(podcast));
    Podcast.find({'_id' : {$in : idArray}}).then((result) =>{
       const array = result.map(podcast => podcast._id);
       Playlist.findByIdAndUpdate(req.params.playlistId, {$push : {list: array}}, {new:true}).then((r) => {
        if(r) {
          res.status(200).json(r);
        } else {
          res.status(404).json("ID NOT FOUND");
        }
       }).catch((err) => {
          res.status(500).json({error: err})
       })  
    });
   }
});

//DELETE PLAYLIST
router.delete('/:playlistId', (req, res, ) => {
 Playlist.findByIdAndDelete(req.params.playlistId).then(() => {
        res.status(200).json();
    }).catch((err) => {
        res.status(500).json({error: err})
    });
});  

// REMOVE A PODCAST OF A PLAYLIST
router.patch('/:playlistId/podcast', (req, res) => {
  if (req.body.list){
     const idArray = req.body.list.map( podcast => mongoose.Types.ObjectId(podcast));
      Podcast.find({'_id' : {$in : idArray}}).then((result) =>{
        const array = result.map(podcast => podcast._id);
         
      Playlist.updateMany( {'_id':req.params.playlistId}, {$pull : {list: array}}).then((r) => {
        console.log();
        if(r) {
          res.status(200).json(r);
        } else {
          res.status(404).json({erros:"ID NOT FOUND"});
        }
       }).catch((err) => {
          res.status(500).json({error: err})
       })  
    });   
  }
});

return router;

}; 
module.exports = {
    playlistRouter
}

