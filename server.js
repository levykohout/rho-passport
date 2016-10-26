const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/connection');
const path = require('path');
const login = require('./routes/login');
const register = require('./routes/register');
const auth = require('./auth/setup');
const passport = require('passport');

connection.connect();
auth.setup();


const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());

app.use('/login', login);
app.use('/register', register);

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var server = app.listen(3000, function() {
  console.log('Listening on port', server.address().port); //gets the actual port it's listening on.
});
