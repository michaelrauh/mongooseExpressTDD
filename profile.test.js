var mongoose = require("mongoose");
const subject = require('./profile');

afterAll(() => {
   mongoose.disconnect()
});

test('can form a connection with the database', done => {
  subject.connect(function(){
    expect(mongoose.connection.readyState).toBe(1)
    done()
  })
});

test('can insert a record into the database', done => {
  subject.connect(function(){
    var data = {userid: "foo", answer: "bar"}
    subject.insert(data, function(){
      var query = subject.User.findOne({userid: "foo"})
      var promise = query.exec();
      promise.then(function(doc) {
        expect(doc.userid).toEqual("foo")
        done()
      })
    })
  })
});
