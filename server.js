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
app.use(express.static(__dirname + '/public'));

// Handles all routes so you do not get a not found error
app.get('*', function (req,res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.post('/api/polls', function (req, res){
    console.log("test that server is getting the request " + JSON.stringify(req.body));
 
});

app.listen(port);
console.log("server started on port " + port);