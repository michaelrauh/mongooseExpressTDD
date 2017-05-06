var mongoose = require("mongoose");
const s = require('./user');
var subject;

afterEach(() => {
  mongoose.connection.close();
});

test('can insert a user into the database', done => {
  var userSchema = new mongoose.Schema({
    userid: String,
    answer: String
  });

  var User = mongoose.model('User', userSchema);

  function onConnect(done) {
    var user = {
      userid: "foo",
      answer: "bar"
    }

    function onSave(done) {
      var query = User.findOne({userid: "foo"})
      var promise = query.exec();
      promise.then(function(err, doc) {
        if (err) console.log('Error on save!')
        expect(doc.userid).toEqual("foo")
        done()
      })
    }

    var savePromise = new User(user).save()
    savePromise.then(onSave(done))
  }
  s.connect(onConnect, done)
});
