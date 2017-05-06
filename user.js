function init() {
  var mongoose = require ("mongoose");

  var uristring =
    process.env.MONGODB_URI ||
    'mongodb://localhost/User';

    mongoose.connect(uristring, function (err, res) {
      if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
        console.log ('Succeeded connected to: ' + uristring);
      }
    });

    var userSchema = new mongoose.Schema({
      name: {
        first: String,
        last: { type: String, trim: true }
      },
      age: { type: Number, min: 0}
    });

    var User = mongoose.model('Users', userSchema);

    mongoose.connection.close()

  return User;
}
module.exports = init;
