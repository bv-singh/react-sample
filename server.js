
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/users.json', function(req, res) {
  fs.readFile('users.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.get('/roles.json', function(req, res) {
  fs.readFile('roles.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

//TODO - This functionality still needs to check
app.get('/selectPopover.json', function(req, res){
fs.readFile('selectPopover.json', function(err, data){
res.setHeader('Cache-Control', 'no-cache');
res.json(JSON.parse(data));
})
});

app.post('/roles.json', function(req, res) {
  fs.readFile('roles.json', function(err, data) {
    var roles = JSON.parse(data);
    roles.push(req.body);
    console.log('Data submitted to save:'+roles);
    fs.writeFile('roles.json', JSON.stringify(roles, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(roles);
    });
  });
});

app.post('/users.json', function(req, res) {
  fs.readFile('users.json', function(err, data) {
    var users = JSON.parse(data);
    users.push(req.body);
    fs.writeFile('users.json', JSON.stringify(users, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(users);
    });
  });
});
/*
app.post('/users.json', function(req, res) {
 console.log('User Data sent to save....');
});*/


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
