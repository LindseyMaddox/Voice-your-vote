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

app.use(express.static(__dirname + '/public'));
app.get('*', function (req,res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// start the server
app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});