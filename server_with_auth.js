const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const path = require('path');
const app = express();


//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Expose-Headers', 'Location');
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 
 'Access-Control-Allow-Headers, Origin,Accept,X-Requested-With, Content-Type, Access-Control-Request-Method,Access-Control-Request-Headers');
 next();
});

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));
const MongoClient = require('mongodb').MongoClient;

//first allow routes that don't require authorization

var ObjectId = require('mongodb').ObjectId; 

var mongoUrl = config.database;
MongoClient.connect(mongoUrl, (err, db) => {
  if (err) throw err;
  var db = db;
app.get('/api/base/polls', function(req,res){
    getAllPolls(function(polls) {
        res.set("Content-Type", 'application/json');
         res.json(polls);
    });
   
});

app.get('/api/base/polls/:id', function (req, res){
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
app.post('/api/base/polls/:id', function (req, res){
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
    // connect to the database and load models
require('./server/models').connect(config.database);

    // pass the passport middleware
    
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authenticationCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api/restricted', authenticationCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);
const apiRoutes = require('./server/routes/api');
app.use('/api/restricted', apiRoutes);

app.get('*', function (req,res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
}); //close mongo connection

// start the server
  app.listen(process.env.PORT || 8080, function () {
     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });