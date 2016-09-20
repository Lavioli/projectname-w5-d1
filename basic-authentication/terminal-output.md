$ npm init

$ npm install --save express body-parser mongoose passport passport-http bcryptjs

lavioli:~/workspace/basic-authentication (master) $ sudo apt-get install -y mongodb-org
    Reading package lists... Done
    Building dependency tree       
    Reading state information... Done
    mongodb-org is already the newest version.
    0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.

lavioli:~/workspace/basic-authentication (master) $ cd ~/workspace
lavioli:~/workspace (master) $ mkdir mongo_data
lavioli:~/workspace (master) $ echo 'mongod --bind_ip=$IP --dbpath=/home/ubuntu/workspace/mongo_data --nojournal --rest "$@"' > run_mongod
lavioli:~/workspace (master) $ chmod a+x run_mongod
lavioli:~/workspace (master) $ ./run_mongod

change in index.js: this console logs server running when node index is called
mongoose.connect('mongodb://localhost/auth').then(function() {
   app.listen(process.env.PORT || 8080, function() {
       console.log('server running');
   }); 
});

install nodemon: everytime you change something, it automatically restarts server
lavioli:~/workspace/basic-authentication (master) $ npm install nodemon -g

lavioli:~/workspace/basic-authentication (master) $ nodemon index.js                                                      
    [nodemon] 1.10.2
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching: *.*
    [nodemon] starting `node index.js`
    server running

in another bash terminal: 
lavioli:~/works curl -X POST -H "Content-Type: application/json" -d '{"username": "lavier", "password": "uhohuhohuhohohnana"}' http://localhost:8080/users -v           
    * Hostname was NOT found in DNS cache
    *   Trying ::1...
    * Connected to localhost (::1) port 8080 (#0)
    > POST /users HTTP/1.1
    > User-Agent: curl/7.35.0
    > Host: localhost:8080
    > Accept: */*
    > Content-Type: application/json
    > Content-Length: 56
    > 
    * upload completely sent off: 56 out of 56 bytes
    < HTTP/1.1 201 Created
    < X-Powered-By: Express
    < Content-Type: application/json; charset=utf-8
    < Content-Length: 2
    < ETag: W/"2-mZFLkyvTelC5g8XnyQrpOw"
    < Date: Mon, 19 Sep 2016 16:36:11 GMT
    < Connection: keep-alive
    < 
    * Connection #0 to host localhost left intact
    
inside index.js we also changed the 500 message to log out err in json
user.save(function(err) {
        if(err) {
            return res.status(500).json(err); 
        }
        return res.status(201).json({});
    });
    
lavioli:~/workspace (master) $ curl -X POST -H "Content-Type: application/json" -d '{"username": "bknowles", "password": "uhohuhohuhohohnana"}' http://localhost:8080/users -v
    * Hostname was NOT found in DNS cache
    *   Trying ::1...
    * Connected to localhost (::1) port 8080 (#0)
    > POST /users HTTP/1.1
    > User-Agent: curl/7.35.0
    > Host: localhost:8080
    > Accept: */*
    > Content-Type: application/json
    > Content-Length: 58
    > 
    * upload completely sent off: 58 out of 58 bytes
    < HTTP/1.1 500 Internal Server Error
    < X-Powered-By: Express
    < Content-Type: application/json; charset=utf-8
    < Content-Length: 260
    < ETag: W/"104-hj7ybehgY+Vxd3qo+Ap+Ug"
    < Date: Mon, 19 Sep 2016 16:35:12 GMT
    < Connection: keep-alive
    < 
    * Connection #0 to host localhost left intact
    {"code":11000,"index":0,"errmsg":"insertDocument :: caused by :: 11000 E11000 duplicate key error index: auth.users.$username_1  dup key: { : \"bknowles\" }","op":{"username":"bknowles","password":"uhohuhohuhohohnana","_id":"57e013c04f2c101e5e1dbc4a","__v":0}}
    
    
TO CHECK IF USER HAS BEEN STORED IN DATABASE:
lavioli:~/workspace/basic-authentication (master) $ touch repl.js
lavioli:~/workspace/basic-authentication (master) $ node repl.js
    Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
    [ { _id: 57e012882e6e3d1b741e81e2,
        username: 'bknowles',
        password: 'uhohuhohuhohohnana',
        __v: 0 },
      { _id: 57e013fb4f2c101e5e1dbc4b,
        username: 'lavier',
        password: 'uhohuhohuhohohnana',
        __v: 0 } ]
        
SHOW DATABASES
#1:
mongo
    show dbs
    use sup
    show collections
    db.users.find()
    db.pokemons.insert({name: 'pikachu'})
    db.pokemons.find()
    show collections
#2:
node
    var mongoose = require('mongoose')
    var User = require('./model/user')
    User.find({}).then console.log(users)


SHOW DATABSE PASSWORDS
lavioli:~/workspace (master) $ mongo
MongoDB shell version: 2.6.12
connecting to: test
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
        http://docs.mongodb.org/
Questions? Try the support group
        http://groups.google.com/group/mongodb-user
Server has startup warnings: 
2016-09-19T16:32:50.653+0000 ** WARNING: --rest is specified without --httpinterface,
2016-09-19T16:32:50.653+0000 **          enabling http interface
    > show dbs
    admin  (empty)
    auth   0.078GB
    local  0.078GB
    sup    (empty)
    test   (empty)
    > use auth  (because in repl.js, the db was auth mongodb://localhost/auth)
    switched to db auth
    > show collections
    system.indexes
    users
    > db.users.find()
    { "_id" : ObjectId("57e012882e6e3d1b741e81e2"), "username" : "bknowles", "password" : "uhohuhohuhohohnana", "__v" : 0 }
    { "_id" : ObjectId("57e013fb4f2c101e5e1dbc4b"), "username" : "lavier", "password" : "uhohuhohuhohohnana", "__v" : 0 }
    >

``HASHING PASSWORD CREATION
lavioli:~/workspace (master) $ curl -X POST -H "Content-Type: application/json" -d '{"username": "lavio", "password": "weeheeeee"}' http://localhost:8080/users -v
    * Hostname was NOT found in DNS cache
    *   Trying ::1...
    * Connected to localhost (::1) port 8080 (#0)
    > POST /users HTTP/1.1
    > User-Agent: curl/7.35.0
    > Host: localhost:8080
    > Accept: */*
    > Content-Type: application/json
    > Content-Length: 46
    > 
    * upload completely sent off: 46 out of 46 bytes
    < HTTP/1.1 201 Created
    < X-Powered-By: Express
    < Content-Type: application/json; charset=utf-8
    < Content-Length: 2
    < ETag: W/"2-mZFLkyvTelC5g8XnyQrpOw"
    < Date: Mon, 19 Sep 2016 18:17:50 GMT
    < Connection: keep-alive
    < 
    * Connection #0 to host localhost left intact
    
lavioli:~/workspace (master) $ node ./basic-authentication/repl.js
    Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
    [ { _id: 57e012882e6e3d1b741e81e2,
        username: 'bknowles',
        password: 'uhohuhohuhohohnana',
        __v: 0 },
      { _id: 57e013fb4f2c101e5e1dbc4b,
        username: 'lavier',
        password: 'uhohuhohuhohohnana',
        __v: 0 },
      { _id: 57e029bafb593473f2dc82e4,
        username: 'pikachu',
        password: 'heyyouyeahyou' },
      { _id: 57e02bce673d3c307a2d99b9,
        username: 'lavio',
        password: '$2a$10$JBIbxAqP47Kuiz9YsMLh6u2bMxmOOl/p1L9A8syflGcaq4LvcmmeW',
        __v: 0 } ]

lavioli:~/workspace (master) $ curl -GET -u kevin:password http://localhost:8080/hidden                           curl: (52) Empty reply from server
lavioli:~/workspace (master) $ node ./basic-authentication/get.jsMongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
    [ { _id: 57e012882e6e3d1b741e81e2,
        username: 'bknowles',
        password: 'uhohuhohuhohohnana',
        __v: 0 },
      { _id: 57e013fb4f2c101e5e1dbc4b,
        username: 'lavier',
        password: 'uhohuhohuhohohnana',
        __v: 0 },
      { _id: 57e029bafb593473f2dc82e4,
        username: 'pikachu',
        password: 'heyyouyeahyou' },
      { _id: 57e02bce673d3c307a2d99b9,
        username: 'lavio',
        password: '$2a$10$JBIbxAqP47Kuiz9YsMLh6u2bMxmOOl/p1L9A8syflGcaq4LvcmmeW',
        __v: 0 },
      { _id: 57e033d787c55c32597134e2,
        username: 'kevin',
        password: '$2a$10$RGu9.bMXZB8an0wKaUdheeL/DRfNMmZDQ1Hb11C7beKHw.SNyJuRe',
        __v: 0 } ]

lavioli:~/workspace (master) $ curl -X GET -u wrongusername:wrongpassword http://localhost:8080/hidden
curl: (7) Failed to connect to localhost port 8080: Connection refused

lavioli:~/workspace (master) $ curl -X GET -u kevin:password http://localhost:8080/hidden
    {"message":"You've come into the secret dungeon"}
    



