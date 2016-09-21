//only the user can change his/her own username
app.put("/users/:userId", jsonParser, passport.authenticate('basic', {
        session: false
    }), function(req, res) {
    
        
    var id = req.params.userId;
    var newName = req.body.username;
    var newPassword = req.body.password;
    var authenticatedId = req.user._id.toString();
    
    
    if (id !== authenticatedId) {
        return res.status(422).json({
           
            'message': 'Unauthorized user'
        });
    }
    
    // if (!newName) {
    //     return res.status(422).json({
    //         'message': 'Missing field: username'
    //     });
    // }
    
    // if (typeof newName !== 'string') {
    //     return res.status(422).json({
    //         'message': 'Incorrect field type: username'
    //     });
    // }
    
    // newName = newName.toString();
    
    // if (!newPassword) {
    //     return res.status(422).json({
    //         'message': 'Missing field: password'
    //     });
    // }
    
    // if (typeof newPassword !== 'string') {
    //     return res.status(422).json({
    //         'message': 'Incorrect field type: password'
    //     });
    // }
    
    // newPassword = newPassword.toString();
    
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(newPassword, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

    User.findOne({_id: authenticatedId}, function(err, user) {
        
    })


// which one is undefined?
// grab the one that's not undefined and update it on the database.

var conditionUser = (newName && typeof newName.toString() === 'string');
var conditionPassword = (newPassword && typeof newPassword.toString() === 'string');
var conditionUserPassword = (conditionUser && conditionPassword && {_id: authenticatedId});

var updateUser = {username: newName, password: req.user.password};
var updatePassword = {username: req.user.username, password: hash};
var updateUserPassword = {username: newName, password: hash};

function update() {
    if(conditionUserPassword) {
        console.log("both are true");
        return updateUserPassword;
    } else if(conditionUser) {
        console.log("user is true");
        return updateUser;
    } else {
        console.log("password is true")
        return updatePassword;
    }
}


  User.findByIdAndUpdate(
        // (conditionUserPassword|| conditionUser || conditionPassword),
        id,
        update(), 
        {upsert: true}, 
        function(err, user) {
            console.log('username and password changed');
            res.status(200).json({})
    });

// var newObj = {};


//     if(conditionUserPassword) {
//       newObj.username = newName;
//       newObj.password = hash;
//     } else if(conditionUser && !conditionPassword) {
//       newObj.username = newName;
//     } else if(conditionPassword && !conditionUser) {
//       newObj.password = hash;
//     }

//     User.findByIdAndUpdate(id,
//         newObj,
//         {upsert: true}, 
//         function(err, user) {
//             console.log('username and password changed');
//             res.status(200).json({})
//     });

    // User.findOneAndUpdate(conditionUser, {_id: authenticatedId}, updateUser , {upsert: true}, function(err, user) {
    //     console.log('usrname changed');
    //     res.status(200).json({})
    // });
    
    // User.findOneAndUpdate(conditionPassword, {_id: authenticatedId}, updatePassword , {upsert: true}, function(err, user) {
    //     console.log('password changed');
    //     res.status(200).json({})
    // });

    
    // var condition = newUsername ? { username: newUsername } : {username: {"$exists": false}};
    
    //     User.findOneAndUpdate(condition, {
    //     _id: authenticatedId
    // }, {
    //     upsert: true
    // }, function(err, user) { //upsert creates a new object if it doesn't already exists
    //     console.log(res);
    //     res.status(200).json({});
    // });
    
    
    // User.findOneAndUpdate({
    //     _id: authenticatedId
    // }, req.body, {
    //     upsert: true
    // }, function(err, user) { //upsert creates a new object if it doesn't already exists
    //     console.log(res);
    //     res.status(200).json({});
    // });
});
});
});










//only the user can change his/her own username
app.put("/users/:userId", jsonParser, passport.authenticate('basic', {
        session: false
    }), function(req, res) {
    
        
    var id = req.params.userId;
    var newName = req.body.username;
    var newPassword = req.body.password;
    var authenticatedId = req.user._id.toString();
    
    
    if (id !== authenticatedId) {
        return res.status(422).json({
           
            'message': 'Unauthorized user'
        });
    }
    

    
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(newPassword, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }


    var conditionUser = (newName && typeof newName.toString() === 'string');
    var conditionPassword = (newPassword && typeof newPassword.toString() === 'string');
    var conditionUserPassword = (conditionUser && conditionPassword && {_id: authenticatedId});
    
    var updateUser = {username: newName, password: req.user.password};
    var updatePassword = {username: req.user.username, password: hash};
    var updateUserPassword = {username: newName, password: hash};

function update() {
    if(conditionUserPassword) {
        console.log("both are true");
        return updateUserPassword;
    } else if(conditionUser) {
        console.log("user is true");
        return updateUser;
    } else {
        console.log("password is true")
        return updatePassword;
    }
}

  User.findByIdAndUpdate(
        // (conditionUserPassword|| conditionUser || conditionPassword),
        id,
        update(), 
        {upsert: true}, 
        function(err, user) {
            console.log('username and password changed');
            res.status(200).json({})
    });

// var newObj = {};


//     if(conditionUserPassword) {
//       newObj.username = newName;
//       newObj.password = hash;
//     } else if(conditionUser && !conditionPassword) {
//       newObj.username = newName;
//     } else if(conditionPassword && !conditionUser) {
//       newObj.password = hash;
//     }

//     User.findByIdAndUpdate(id,
//         newObj,
//         {upsert: true}, 
//         function(err, user) {
//             console.log('username and password changed');
//             res.status(200).json({})
//     });


    

});
});
});