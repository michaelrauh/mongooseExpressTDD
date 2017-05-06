var mongoose = require("mongoose");
const subject = require('./profile');

test('can form a connection with the database', done => {
  subject.connect(function(){
    expect(mongoose.connection.readyState).toBe(1)
    mongoose.connection.close()
    done()
  })
});
