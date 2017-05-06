var mongoose = require("mongoose");
const subject = require('./profile');

test('can form a connection with the database', done => {
  subject.connect(function(){
    expect(mongoose.connection.readyState).toBe(1)
    mongoose.connection.close()
    done()
  })
});

test('can insert a record into the database', done => {
  subject.connect(function(){
    var user = {userid: "foo", answer: "bar"}
    var promise = new subject.User(user).save()
    console.log("here")
    promise.then(done)
  })
});
