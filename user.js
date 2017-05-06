// var mongoose = require("mongoose");
//
// var userSchema = new mongoose.Schema({
//   userid: String,
//   answer: String
// });
//
// var User = mongoose.model('User', userSchema);
//
// function connect(onConnect, done) {
//   var uristring =
//     process.env.MONGODB_URI ||
//     'mongodb://localhost/User';
//   mongoose.connect(uristring, {
//     server: {
//       poolSize: 1
//     }
//   }, onConnect(done))
// }
//
// function onSave(done) {
//   var query = User.findOne({userid: "foo"})
//   var promise = query.exec();
//   promise.then(function(doc) {
//     expect(doc.userid).toEqual("foo")
//     done()
//   })
// }
//
// function insert() {
//   var user = {userid: "foo", answer: "bar"}
//   return new User(user).save()
// }
//
// module.exports = {insert, connect, onSave, User}
