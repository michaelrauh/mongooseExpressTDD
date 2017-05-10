var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var profile = require('./profile')
var intersector = require('./intersector')

profile.connect()

app.post('/', jsonParser, function(req, res) {
  profile.insert(req.body).then(res.sendStatus(200))
});

app.get('/:id', function(req, res) {
  profile.find(req.params.id).then(function(data) {
    res.send(data)
  })
});

app.get('/:id/:other', function(req, res) {
  profile.find(req.params.id).then(function(res1) {
    profile.find(req.params.other).then(function(res2) {
      var ans = intersector.intersect(res1.value, res2.value)
      res.send(ans)
    })
  })
});

var server = app.listen(port, function() {
  console.log('app listening at port %s', port);
});

module.exports = server;
