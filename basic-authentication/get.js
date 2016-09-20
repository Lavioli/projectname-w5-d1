var mongoose = require('mongoose');
var User = require('./user-model');
mongoose.connect('mongodb://localhost/auth').then(function() {
User.find(function(err, users) {
console.log(users);
});
});