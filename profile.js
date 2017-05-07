const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));

mongoose.Promise = Promise

function connectHelper(callback) {
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

function connect() {
  return new Promise((resolve, reject) => {
    connectHelper(resolve)
  })
}

function insertHelper(data, callback) {
  var record = new User(data)
  var promise = record.save()
  promise.then(callback)
}

function insert(data) {
  return new Promise((resolve, reject) => {
    insertHelper(data, resolve)
  })
}

var userSchema = new mongoose.Schema({
  id: String,
  value: {
    type: Array,
    "default": []
  }
});

function findHelper(identifier, callback) {
  var query = User.findOne({
    id: identifier
  })

  var promise = query.exec();
  promise.then((doc) => {
    callback(doc)
  })
}

function find(identifier) {
  return new Promise((resolve, reject) => {
    findHelper(identifier, resolve)
  })
}

function dropHelper(callback) {
  User.remove({}, (err) => {
    if (err) {
      console.log(err)
    } else {
      callback()
    }
  });
}

function drop() {
  return new Promise((resolve, reject) => {
    dropHelper(resolve)
  })
}

var User = mongoose.model('User', userSchema);

module.exports = {
  connect,
  insert,
  find,
  drop
}
