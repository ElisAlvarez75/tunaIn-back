const express = require('express');
const models = require('../mongo');

const searchRouter = express.Router();
  searchRouter.get('/', (req, res) => {
    models.user.find({}, function(err, users) {
      let userMap = {};

      users.forEach(function(user){
        userMap[user.id] = user;
      })
        res.json(users);
    });
});

searchRouter.get('/:nombre', (req, res) => {
    let nombre = req.params.nombre;
      models.user.find({"nombre": {"$regex": nombre, "$options": "i"}},{
      }, function(err, users) {
        console.log(users.username);    
        res.send(users);
    }).limit(5);
});

module.exports = {
    searchRouter,
  }
