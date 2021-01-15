const { Router } = require('express');
const mongoose = require('mongoose');
const express = require('express');
const models = require('../mongo');
const router = Router();


router.get('/', (req, res) => {
    models.user.find({}, function(err, users) {
        let userMap = {};

        users.forEach(function(user){
            userMap[user.id] = user;
        })
        res.send("por defecto");
    });
});
router.get('/:nombre', (req, res) => {
    let nombre = req.params.nombre;
    models.user.find({"nombre": {"$regex": nombre, "$options": "i"}},{
      

    }, function(err, users) {
        

        console.log(users.username);    
        

        res.send(users);
    }).limit(5);
});
module.exports = {
    router,
  }
