const express = require('express');

const app = express();

module.exports = (req, res, next) => {

  const MongoClient = require('mongodb').MongoClient;

const config = require('../../config');
//first allow routes that don't require authorization
var ObjectId = require('mongodb').ObjectId; 

var mongoUrl = config.database
return MongoClient.connect(mongoUrl, (err, db) => {
    if (err) throw err;
    var db = db;
      var id = req.params.id;
  var userEmail = req.user.email;
    db.collection('polls').find(  { _id: ObjectId(id), user: userEmail  } ).toArray(function(err, poll) {
     if(err) throw err;
     if(poll.length == 0){
        return res.status(401).end();
     }
    return next();
 });

}); // end of connection
};