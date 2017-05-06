var mongoose = require("mongoose");

function connect(callback) {
    var uristring = process.env.MONGODB_URI || 'mongodb://localhost/User';
    mongoose.connect(uristring, callback)
}

function insert(data, callback) {
  var record = new User(data)
  var promise = record.save()
  promise.then(callback)
}

var userSchema = new mongoose.Schema({
  userid: String,
  answer: String
});

var User = mongoose.model('User', userSchema);

module.exports = {connect, insert, User}
