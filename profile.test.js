var mongoose = require("mongoose");
const subject = require('./profile');

afterAll(() => {
  mongoose.disconnect()
});

test('should form a connection with promise', done => {
  var promise = subject.connect()
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
  var insert = subject.insert(data)
  insert.then(() => {
    var query = subject.User.findOne({
      id: "foo"
    })
    var promise = query.exec();
    promise.then((doc) => {
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
  subject.insert(data).then(
    () => {
      subject.find("one").then((res) => {
        expect(res.value[0].q).toEqual("two")
        expect(res.value[0].a).toEqual("three")
        done()
      })
    }
  )
})

test('should drop the users table', done => {
  subject.drop().then(done)
})
