const { Router } = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { Readable } = require('stream');
const { WriteStream } = require('fs');
const { podcast } = require('../mongo');
const { jwtSecret } = require('../config');
const Podcast = require('../mongo/schemas/Podcast');
const router = Router();

router.get('/:trackID', (req, res) => {
    const trackID = req.params.trackID;

    res.set("content-type", "audio/mp3");
    res.set("accept-ranges", "bytes");

    const GridFS = Grid(mongoose.connection.db, mongoose.mongo);
    const downloadStream = GridFS.createReadStream({ _id: trackID });
    downloadStream.on('data', chunk => {
        res.write(chunk);
      });

    downloadStream.on('error', () => {
        res.sendStatus(404);
    });
        
    downloadStream.on('end', () => {
        res.end();
    });

    });

    router.post('/', (req, res) => {
        // Definiendo storage en memoria
        const storage = multer.memoryStorage();
    
        //Configurando multer
        const upload = multer({
        storage,
        limits: {
          fields: 5, //Parametros extra que le pasaremos (el name)
          fileSize: 60000000, //Tamano maximo del file
          files: 1, //numero de archivos a subir
          parts: 6 // Dos tipos de campos (el track y el name)
        }
    });

    const callback = err => {
        if (err) {
          console.log(err);
          return res.status(500).json({message: err.message});
        } else if (!req.body.name) {
          return res.status(400).json({message: 'Track name required'});
        }
        else if (!req.body.description) {
          return res.status(400).json({message: 'Track description required'});
        }

    let trackName = req.body.name;
    let trackDescription = req.body.description;
    let trackcategories = req.body.categories;
    let trackLocation = req.body.location;
    let trackUserId = req.user.id;
    console.log(req);
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    const GridFS = Grid(mongoose.connection.db, mongoose.mongo);

    const writestream = GridFS.createWriteStream({
      filename: trackName
      });
      const id = writestream.id;
     
      readableTrackStream.pipe(writestream);

      writestream.on('error', function (error) {
        return res.status(500).json({ error });
      });
    
      
    writestream.on('close', function (file) {
        const podcast = new Podcast({
          title: trackName,
          description: trackDescription,
          categories: trackcategories,
          location: trackLocation,
          img: 'imageeeen',
          audio: writestream.id,
          id_author: trackUserId
        });
        
        return podcast.save().then(result =>{
        }).then(
          res.status(200).json({message:"Track uploaded successfully"})
        ).catch((err) => {
          res.status(500).send({erorr:err})
        });
        return res.status(201).json({message: 'File uploaded successfully', id});
      });
  
    };
  
  
    upload.single('track')(req, res, callback);
  
  
  });
  
  
  module.exports = {
    router,
  }
