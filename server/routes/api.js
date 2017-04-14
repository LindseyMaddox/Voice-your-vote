"use strict";
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const router = new express.Router();
 //for dev only
 //if(app.settings.env == "development"){
   require('dotenv').config(); 
 //}
 //probably could pass this stuff in
 var mongo_login = process.env.MONGO_LAB_LOGIN;
 var ObjectId = require('mongodb').ObjectId; 
 var mongoUrl = "mongodb://" + mongo_login + "@ds153400.mlab.com:53400/voice-your-vote";

 MongoClient.connect(mongoUrl, (err, db) => {
   if (err) throw err;
   var db = db;

   router.post('/polls/create', function (req,res){
     console.log('test to see if req.user is avl in create method ' + req.user);
     addNewPoll(req.body,req.user.email, function(poll){
      var path = "/polls/" + poll.ops[0]["_id"];
      res.status(201).json({ location: path, message: 'Poll added'});;
    });
   });
   
     function addNewPoll(record, userEmail, callback){
        console.log("in database add method, name is " + record["name"]);
        var item = { "name": record["name"], "description": record["description"], options: record["options"],user: userEmail };
         db.collection('polls').insert( item , function(err,result){ 
             if(err) throw err;
             console.log("just added the following record to the database: " + JSON.stringify(result.ops));
             callback(result);
         });
    }
    const authorizationCheckMiddleware = require('../middleware/user-authorization');
    router.use('/polls/:id', authorizationCheckMiddleware);

    //this is to assess whether to include edit/delete buttons
    router.get('/polls/:id', function(req,res){
      res.status(200).end();
    });
    router.post('/polls/:id/edit', function (req, res){
     var id = req.params.id;
    var options = req.body.options;
    updatePollInfo(id, options, respondToUpdate);
    function respondToUpdate(record){
       res.json({ message: 'Poll updated'});
   };
});
 function updatePollInfo(id,options,callback){
        db.collection('polls').update({ _id: ObjectId(id) },{ $set: { "options": options } }, function(err,record){
            if (err) throw err;
            callback(record);
        });
        
    }
   router.delete('/polls/:id', function (req, res){
    var id = req.params.id;
    deletePoll(id, respondToDeletion);
    function respondToDeletion(){
      res.json( {"message": "successfully deleted poll"});
    }
  });
     function deletePoll(id, callback){
       db.collection('polls').remove( { "_id": ObjectId(id) }, function(err,result){ 
             if(err) throw err;
             callback();
         });
         
    }
 }); //end of connection
module.exports = router;