var mongoose = require("mongoose");
// const s = require('./user');
var subject;

afterEach(() => {
  mongoose.connection.close();
});

test('can insert a user into the database', done => {
  var uristring =
    process.env.MONGODB_URI ||
    'mongodb://localhost/User';

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

      function onFound(done) {
        console.log("here")
        done()
      }

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
  mongoose.connect(uristring, {
    server: {
      poolSize: 1
    }
  }, onConnect(done))
});
