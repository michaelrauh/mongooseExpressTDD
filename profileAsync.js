const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));

mongoose.Promise = Promise

function connect(callback) {
  var uristring = process.env.MONGODB_URI || 'mongodb://localhost/User';
  mongoose.connect(uristring)
    .then(() => {
      mongoose.connection.on('error', err => {
        console.log('mongoose connection error: ' + err);
      });

      console.log('connected - attempting reconnect');
      callback()
    })
    .catch(err => {
      console.log('rejected promise: ' + err);
      mongoose.disconnect();
    });;
}

function connectAsync() {
  return new Promise((resolve, reject) => {
    connect(resolve)
  })
}

function insert(data, callback) {
  var record = new User(data)
  var promise = record.save()
  promise.then(callback)
}

function insertAsync(data) {
  return new Promise((resolve, reject) => {
    insert(data, resolve)
  })
}

var userSchema = new mongoose.Schema({
  id: String,
  value: {
    type: Array,
    "default": []
  }
});

function find(identifier, callback) {
  var query = User.findOne({
    id: identifier
  })

  var promise = query.exec();
  promise.then(function(doc) {
    callback(doc)
  })
}

function findAsync(identifier) {
  return new Promise((resolve, reject) => {
    find(identifier, resolve)
  })
}

var User = mongoose.model('User', userSchema);

module.exports = {
  connectAsync,
  insertAsync,
  User,
  find,
  findAsync,
  connect,
  insert
}
