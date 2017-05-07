var mongoose = require("mongoose");
const subject = require('./profileAsync');

afterAll(() => {
  mongoose.disconnect()
});

test.only('should form a connection with the database', done => {
  subject.connect(function() {
    expect(mongoose.connection.readyState).toBe(1)
    done()
  })
});
