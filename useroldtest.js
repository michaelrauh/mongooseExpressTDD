var mongoose = require("mongoose");
const s = require('./user');
var subject;

afterEach(() => {
  mongoose.connection.close();
});

test.only('can insert a user into the database', done => {

  function onConnect(done) {
    var user = {
      userid: "foo",
      answer: "bar"
    }

    var savePromise = new s.User(user).save()
    savePromise.then(s.onSave(done))
  }
  s.connect(onConnect, done)
});
