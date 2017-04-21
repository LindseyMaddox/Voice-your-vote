"use strict";
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const config = require('.../config');
const router = new express.Router();

 var ObjectId = require('mongodb').ObjectId; 
 var mongoUrl = config.database;
 MongoClient.connect(mongoUrl, (err, db) => {
   if (err) throw err;
   var db = db;

   router.post('/polls/create', function (req,res){
       //validate form before adding
      console.log("req is " + JSON.stringify(req.body));
       if(req.body.name == "" || req.body.options.length == 0){
          return  res.status(400).json( { errors: 
           { name: "Poll must contain a name.", options: "Poll must contain at least one option."}});
       } else if(req.body.name == ""){
           
          return  res.status(400).json( { errors: 
           { name: "Poll must contain a name." }});
         } else if(req.body.options.length == 0){
             return  res.status(400).json( { errors:  { options: "Poll must contain at least one option."} });
         } else {
              addNewPoll(req.body,req.user.email, function(poll){
               var path = "/polls/" + poll.ops[0]["_id"];
               res.status(201).json({ location: path, message: 'Poll added'});
             });
         }
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
    
    //user info
    
    router.get('/account', function (req, res){
     //this should be returned by auth check
    var user = req.user;
      getPollInfoForUser(user, sumVotesForEachRecord);
      var account_summary = [];
      function sumVotesForEachRecord(records){

          records.forEach(function(el){
              var votes = 0;
            var temp_hash = {};
              el.options.forEach(function(option){
                  votes += option["votes"];
              });
              temp_hash["id"] = el["id"];
              temp_hash["name"] = el["name"];
              temp_hash["votes"] = votes;
              account_summary.push(temp_hash);
          });
          console.log("account summary is " + JSON.stringify(account_summary));
          res.json( { "vote summary": account_summary });
      }
  });
  
  function getPollInfoForUser(user, callback){
    //  db.collection('polls').aggregate.match({ user: user.email}).unwind('options').group({'_id':'$_id','': {'$push': '$players'}})
   db.collection('polls').find({ user: user.email }, {"name": 1, "options.votes": 1 }).toArray(function(err, record) {
      if(err) throw err;
      callback(record);
   });
  }
 }); //end of connection
module.exports = router;