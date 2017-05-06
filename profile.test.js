var mongoose = require("mongoose");
const subject = require('./profile');

afterAll(() => {
  mongoose.connection.close()
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
    subject.insert(data, done)
  })
});
