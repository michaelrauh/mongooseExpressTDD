var mongoose = require("mongoose");
const init = require('./user');

test('initializes user model with correct schema', () => {


  var userSchema = new mongoose.Schema({
    id: String,
    data: [{
      q: String,
      a: String
    }]
  });

  expect(init().schema.obj).toEqual(userSchema.obj);
  mongoose.connection.close()
});
