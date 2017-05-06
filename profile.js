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

function drop(callback) {
  User.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      callback()
    }
  });
}

function find(identifier, callback){
  var query = User.findOne({
    id: identifier
  })

  var promise = query.exec();
  promise.then(function(doc) {
    callback(doc)
  })
}

var userSchema = new mongoose.Schema({
  id: String,
  value: {
    type: Array,
    "default": []
  }
});

var User = mongoose.model('User', userSchema);

module.exports = {
  connect,
  insert,
  User,
  drop,
  find
}
