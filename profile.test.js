var mongoose = require("mongoose");
const subject = require('./profile');

afterAll(() => {
  mongoose.disconnect()
});

test('should form a connection with the database', done => {
  subject.connect(function() {
    expect(mongoose.connection.readyState).toBe(1)
    done()
  })
});

test('should insert a record into the database', done => {
  subject.connect(function() {
    var data = {
      id: "foo",
      value: [{
        q: "bar",
        a: "baz"
      }]
    }
    subject.insert(data, function() {
      var query = subject.User.findOne({
        id: "foo"
      })
      var promise = query.exec();
      promise.then(function(doc) {
        expect(doc.id).toEqual("foo")
        expect(doc.value[0]).toEqual({
          q: "bar",
          a: "baz"
        })
        done()
      })
    })
  })
});

test('should drop the users table', done => {
  subject.connect(function() {
    subject.drop(done)
  })
})
