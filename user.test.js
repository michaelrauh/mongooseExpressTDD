var mongoose = require("mongoose");
const s = require('./user');
var subject;

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

        function onSave(done){

          function onFound(done){
            console.log("here")
            done()
          }
          User.findOne({id: "abc123"}, function(err, doc){
            console.log(err)
          })
        }

        new User(user).save(onSave(done))
      }
        mongoose.connect(uristring, onConnect(done))
        mongoose.connection.close()
      });
