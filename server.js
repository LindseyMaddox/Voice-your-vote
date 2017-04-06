const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const app = express();
//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
});

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
// serve static assets normally
app.use(express.static(__dirname + '/public'));


app.get('/api/polls', function(req,res){
    getAllPolls(function(polls) {
        res.set("Content-Type", 'application/json');
         res.json(polls);
    });
   
});

app.get('/api/polls/:id', function (req, res){
    var id = req.params.id
   getPoll(id, function(poll){
       res.json(poll[0]);
   });
});

function getAllPolls(callback){
    db.collection('polls').find( ).toArray(function(err, polls) {
    if(err) throw err;
     callback(polls);
});
}
function getPoll(id,callback){
    db.collection('polls').find(  { _id: ObjectId("58e63d5d734d1d12d73a30e2")  } ).toArray(function(err, poll) {
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
    // var id = req.params.id;
    var id = "58e63d5d734d1d12d73a30e2";
    var selection = req.body.name;
    updateVoteCount(id, selection, function(poll){
       res.json({ message: 'Thanks for adding your vote'});
   });
});

    function updateVoteCount(id,selection,callback){
        db.collection('polls').update ({ _id: ObjectId(id), "options.name": selection },{ $inc: { "options.$.votes": 1 } }, function(err,record){
            if (err) throw err;
            console.log("after update, record is now " + record);
            callback(record);
        });
    }
    function addNewPoll(record, callback){
        var option1 = { name: record["options"], votes: 0 };
        var options = [];
        //once we have multiple options, we can switch this to an each.
        options.push(option1);
        var item = { "name": record["name"], "description": record["description"], options };
         db.collection('polls').insert( item ), function(err,result){ 
             if(err) throw err;
             console.log("just added the following record to the database: " + result);
             callback(result);
         };
    }
// Handles all non api routes so you do not get a not found error
app.get('*', function (req,res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port);
console.log("server started on port " + port);

}); //end of connection

