const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const app = express();
//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// serve static assets normally

app.use(express.static('./public/'));
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
});
const authRoutes = require('./server/auth');
app.use('/auth', authRoutes);

const MongoClient = require('mongodb').MongoClient;

//for dev only
if(app.settings.env == "development"){
   require('dotenv').config(); 
}
var mongo_login = process.env.MONGO_LAB_LOGIN;
var ObjectId = require('mongodb').ObjectId; 
var mongoUrl = "mongodb://" + mongo_login + "@ds153400.mlab.com:53400/voice-your-vote";

MongoClient.connect(mongoUrl, (err, db) => {
  if (err) throw err;
  var db = db;

app.get('/api/polls', function(req,res){
    getAllPolls(function(polls) {
        res.set("Content-Type", 'application/json');
         res.json(polls);
    });
   
});

app.get('/api/polls/:id', function (req, res){
    var id = req.params.id;
   getPoll(id, returnPoll);
   function returnPoll(poll) {
       res.json(poll);
   }
});

function getAllPolls(callback){
    db.collection('polls').find( ).toArray(function(err, polls) {
    if(err) throw err;
     callback(polls);
});
}
function getPoll(id,callback){
    db.collection('polls').find(  { _id: ObjectId(id)  } ).toArray(function(err, poll) {
    if(err) throw err;
    callback(poll);
});
}

app.post('/api/polls/create', function (req,res){
    addNewPoll(req.body, function(poll){
       // res.json({message:"Thanks for creating a poll. Will redirect later"});
        res.redirect('/'); // or to new poll
    });
})
app.post('/api/polls/:id', function (req, res){
     var id = req.params.id;
    var selection = req.body.name;
    updateVoteCount(id, selection, respondToUpdate);
    function respondToUpdate(){
        res.redirect('/');
       res.json({ message: 'Thanks for adding your vote'});
   };
});

app.delete('/api/polls/:id', function (req, res){
     var id = req.params.id;
console.log("made it to the app delete method in express");
    deletePoll(id, respondToDeletion);
    function respondToDeletion(){
       res.json( {"message": "successfully deleted poll"});
   };
});
    

    function updateVoteCount(id,selection,callback){
        db.collection('polls').update({ _id: ObjectId(id), "options.name": selection },{ $inc: { "options.$.votes": 1 } }, function(err,record){
            if (err) throw err;
            callback();
        });
        
    }
    
    function addNewPoll(record, callback){
        console.log("in database add method, name is " + record["name"]);
        var item = { "name": record["name"], "description": record["description"], options: record["options"] };
         db.collection('polls').insert( item , function(err,result){ 
             if(err) throw err;
             console.log("just added the following record to the database: " + JSON.stringify(result.ops));
             callback(result);
         });
    }
      function deletePoll(id, callback){
       db.collection('polls').remove( { "_id": ObjectId(id) }, function(err,result){ 
             if(err) throw err;
             callback();
         });
         
    }
// Handles all non api routes so you do not get a not found error
app.get('*', function (req,res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port);
console.log("server started on port " + port);

}); //end of connection

