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

      User.findOne({
        userid: "foo"
      }, function(err, doc) {
        if (err) console.log('Error on save!')
        expect(doc.userid).toEqual("foo")
        done()
      })
    }

    new User(user).save(onSave(done))
  }
  s.connect(onConnect, done)
});
