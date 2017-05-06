const init = require('./user');

test('initializes user model', () => {

var mongoose = require ("mongoose");
  var userSchema = new mongoose.Schema({
    name: {
      first: String,
      last: { type: String, trim: true }
    },
    age: { type: Number, min: 0}
  });

  expect(init().schema.obj).toEqual(userSchema.obj);
});
