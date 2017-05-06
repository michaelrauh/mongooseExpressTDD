var mongoose = require("mongoose");

function connect(onConnect, done) {
  var uristring =
    process.env.MONGODB_URI ||
    'mongodb://localhost/User';
  mongoose.connect(uristring, {
    server: {
      poolSize: 1
    }
  }, onConnect(done))
}

function insert() {
  var user = {userid: "foo", answer: "bar"}
  return new User(user).save()
}

module.exports = {insert, connect}
