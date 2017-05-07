var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.get('/', function (req, res) {
  res.status(200).send('ok');
});

var server = app.listen(port, function () {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = server;
