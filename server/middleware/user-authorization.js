const express = require('express');

const app = express();

module.exports = (req, res, next) => {

  const MongoClient = require('mongodb').MongoClient;

//for dev only
if(app.settings.env == "development"){
   require('dotenv').config(); 
}

//first allow routes that don't require authorization
var mongo_login = process.env.MONGO_LAB_LOGIN;
var ObjectId = require('mongodb').ObjectId; 

var mongoUrl = "mongodb://" + mongo_login + "@ds153400.mlab.com:53400/voice-your-vote";

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