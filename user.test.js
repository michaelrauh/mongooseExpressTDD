var mongoose = require("mongoose");
const init = require('./user');
var subject;


beforeEach(() => {
  subject = init()
});

afterEach(() => {
  mongoose.connection.close()
});

test('initializes user model with correct schema', () => {

  var userSchema = new mongoose.Schema({
    id: String,
    data: [{
      q: String,
      a: String
    }]
  });

  expect(subject.schema.obj).toEqual(userSchema.obj);

});
