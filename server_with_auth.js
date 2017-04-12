const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const path = require('path');

// connect to the database and load models
require('./server/models').connect(config.database);

const app = express();


//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
});

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));
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

//first allow routes that don't require authorization
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
app.post('/api/polls/:id', function (req, res){
     var id = req.params.id;
    var selection = req.body.name;
    updateVoteCount(id, selection, respondToUpdate);
    function respondToUpdate(){
       res.json({ message: 'Thanks for adding your vote'});
   };
});

  function updateVoteCount(id,selection,callback){
        db.collection('polls').update({ _id: ObjectId(id), "options.name": selection },{ $inc: { "options.$.votes": 1 } }, function(err,record){
            if (err) throw err;
            callback();
        });
        
    }
    
    //routes requiring authorization
    // pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);

app.use('/api', apiRoutes);
app.get('*', function (req,res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// start the server
app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});

}); //end of connection
