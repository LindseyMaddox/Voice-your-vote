const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const router = new express.Router();
const app = express();

router.delete('/api/polls/:id', function (req,res){
  console.log("test that we got to delete method for id " + req.params.id);
});
// //for dev only
// if(app.settings.env == "development"){
//   require('dotenv').config(); 
// }
// var mongo_login = process.env.MONGO_LAB_LOGIN;
// var ObjectId = require('mongodb').ObjectId; 
// var mongoUrl = "mongodb://" + mongo_login + "@ds153400.mlab.com:53400/voice-your-vote";

// MongoClient.connect(mongoUrl, (err, db) => {
//   if (err) throw err;
//   var db = db;

//   router.post('/api/polls/create', function (req,res){
//       addNewPoll(req.body, function(poll){
//         // res.json({message:"Thanks for creating a poll. Will redirect later"});
//           res.redirect('/'); // or to new poll
//       });
//   })
//   router.post('/api/polls/:id/edit', function (req, res){
//     var id = req.params.id;
//     var options = req.body.options;
//     updatePollInfo(id, options, respondToUpdate);
//     function respondToUpdate(record){
//       console.log("Poll updated to " + record);
//       res.json({ message: 'Poll updated'});
//     };
//   });

//   router.delete('/api/polls/:id', function (req, res){
//     console.log("should maybe be hitting here?");
//     var id = req.params.id;
//     deletePoll(id, respondToDeletion);
//     function respondToDeletion(){
//       res.json( {"message": "successfully deleted poll"});
//     };
//   });
    
//   function addNewPoll(record, callback){
//     console.log("in database add method, name is " + record["name"]);
//     var item = { "name": record["name"], "description": record["description"], options: record["options"] };
//     db.collection('polls').insert( item , function(err,result){ 
//       if(err) throw err;
//         console.log("just added the following record to the database: " + JSON.stringify(result.ops));
//         callback(result);
//     });
//   }
//   function updatePollInfo(id,options,callback){
//     db.collection('polls').update({ _id: ObjectId(id) },{ $set: { "options": options } }, function(err,record){
//       if (err) throw err;
//       callback(record);
//     });
//   }
//   function deletePoll(id, callback){
//     db.collection('polls').remove( { "_id": ObjectId(id) }, function(err,result){ 
//       if(err) throw err;
//       callback();
//     });
//   }
// }); //end of connection
module.exports = router;