var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //instead of using mongoose lib, use node lib
var User = require('./user-model');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var app = express();
var jsonParser = bodyParser.json();

var strategy = new BasicStrategy(function(username, password, callback) {
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            callback(err);
            return;
        }
        
        if(!user) {
            return callback(null, false, {
                message: 'Incorrect username.'
            });
        }
        
        user.validatePassword(password, function(err, isValid) {
            if(err) {
                return callback(err);
            }
            
            if(!isValid) {
                return callback(null, false, {
                    message: "Incorrect password."
                });
            }
            return callback(null, user);
        });
    });
});

passport.use(strategy);

app.use(passport.initialize());


// You tell the Express app to integrate with passport using the app.use method. 
// To protect the /hidden endpoint, you use the passport.authenticate middleware, 
// saying that you will use the basic strategy. You also indicate that you don't want 
// to store a session cookie to keep identifying the user - 
// they will need to reauthenticate with each new API request.

app.get(
    '/hidden', 
    passport.authenticate('basic', {session: false}), 
    function (req, res) {
        res.json({
            message: 'You\'ve come into the secret dungeon'
        });
    }
);

app.post('/users', jsonParser, function(req, res) {
            if (!req.body) {
                return res.status(400).json({
                    message: "No request body"
                })
            }

            if (!('username' in req.body)) {
                return res.status(422).json({
                    message: 'Missing field: username'
                });
            }

            var username = req.body.username;

            if (typeof username !== 'string') {
                return res.status(422).json({
                    message: 'Incorrect field type: username'
                });
            }

            username = username.trim(); //remove all the whitespaces from both sides of the string

            if (username === '') {
                return res.status(422).json({
                    message: 'Incorrect field length: username'
                });
            }

            if (!('password' in req.body)) {
                return res.status(422).json({
                    message: 'Missing field: password'
                });
            }

            var password = req.body.password;

            if (typeof password !== 'string') {
                return res.status(422).json({
                    message: 'Incorrect field type: password'
                });
            }

            password = password.trim();

            if (password === '') {
                return res.status(422).json({
                    message: 'Incorrect field length: password'
                });
            }

            bcrypt.genSalt(10, function(err, salt) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Internal server error'
                        });
                    }

                    bcrypt.hash(password, salt, function(err, hash) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Internal server error'
                            });
                        }

                        var user = new User({
                            username: username,
                            password: hash
                        });

                        user.save(function(err) {
                            if (err) {
                                return res.status(500).json({
                                    message: 'Internal server error'
                                });
                            }

                            return res.status(201).json({});
                        });
                    });
                });
            });

        mongoose.connect('mongodb://localhost/auth').then(function() {
            app.listen(process.env.PORT || 8080, function() {
                console.log('server running');
            });
        });
