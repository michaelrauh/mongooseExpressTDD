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
