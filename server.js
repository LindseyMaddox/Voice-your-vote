const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const app = express();
//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
var mongo_login = process.env.MONGO_LAB_LOGIN;
var mongoUrl = "mongodb://llmaddox:Noc110228Pip@ds153400.mlab.com:53400/voice-your-vote";
//var mongoUrl = "mongodb://" + mongo_login + "@ds153400.mlab.com:53400/voice-your-vote"
MongoClient.connect(mongoUrl, (err, db) => {
  if (err) throw err;
  var db = db;
// serve static assets normally
app.use(express.static(__dirname + '/public'));


app.get('/api/polls', function(req,res){
    var polls = getAllPolls();
    console.log("polls are " + polls);
   res.json(polls);
})

app.get('/api/polls/:id', function (req, res){
    var id = req.params.id
   var poll = getPoll(id);
   console.log("poll is " + poll);
   res.json(poll);
});

function getAllPolls(){
    db.collection('polls').find( ).toArray(function(err, polls) {
    if(err) throw err;
       console.log(polls);
        return polls;
});
}
function getPoll(id){
    db.collection('polls').find(  {  "name": "Best Band"  } ).toArray(function(err, polls) {
    if(err) throw err;
       console.log(polls);
        return polls;
});
}

app.post('/api/polls', function (req, res){
    console.log("test that server is getting the request " + JSON.stringify(req.body));
 
});

// Handles all non api routes so you do not get a not found error
app.get('*', function (req,res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port);
console.log("server started on port " + port);

}); //end of connection

