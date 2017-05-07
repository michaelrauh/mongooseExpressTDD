var mongoose = require("mongoose");
const subject = require('./profileAsync');

afterAll(() => {
  mongoose.disconnect()
});

test('should form a connection with promise', done => {
  var promise = subject.connectAsync()
  promise.then(() => {
    expect(mongoose.connection.readyState).toBe(1)
    done()
  })
})

test('should insert a record into the database', done => {
  var data = {
    id: "foo",
    value: [{
      q: "bar",
      a: "baz"
    }]
  }
  var insert = subject.insertAsync(data)
  insert.then(function() {
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
});

test('should be able to retrieve a user by id', done => {
  var data = {
    id: "one",
    value: [{
      q: "two",
      a: "three"
    }]
  }
  subject.insertAsync(data).then(
    () => {
      subject.findAsync("one").then(function(res) {
        expect(res.value[0].q).toEqual("two")
        expect(res.value[0].a).toEqual("three")
        done()
      })
    }
  )
})

test('should drop the users table', done => {
  subject.dropAsync().then(done)
})
