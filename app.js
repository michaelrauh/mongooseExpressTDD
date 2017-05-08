var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var profile = require('./profile')

profile.connect()

app.post('/', function (req, res) {
  var data = {
    id: "foo",
    value: [{
      q: "bar",
      a: "baz"
    }]
  }

profile.insert(data).then(res.sendStatus(200))


});

var server = app.listen(port, function () {
  console.log('app listening at port %s', port);
});

module.exports = server;
