const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));

mongoose.Promise = Promise

function connect(callback) {
  var uristring = process.env.MONGODB_URI || 'mongodb://localhost/User';
  mongoose.connect(uristring)
    .then(() => {
        mongoose.connection.on('error', err => {
            console.log('mongoose connection error: '+err);
        });

        console.log('connected - attempting reconnect');
        callback()
    })
    .catch(err => {
        console.log('rejected promise: '+err);
        mongoose.disconnect();
    });
;
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
  connect
}
