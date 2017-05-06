var mongoose = require("mongoose");

function insert() {
  var user = {userid: "foo", answer: "bar"}
  return new User(user).save()
}

module.exports = {insert}
