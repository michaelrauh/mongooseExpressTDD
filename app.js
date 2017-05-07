var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var profile = require('./profile')

console.log(profile)

app.post('/', function (req, res) {
  res.sendStatus(200)
});

var server = app.listen(port, function () {
  var port = server.address().port;
  console.log('app listening at port %s', port);
});

module.exports = server;
