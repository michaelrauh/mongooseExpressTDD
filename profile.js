var mongoose = require("mongoose");

function connect(callback) {
    var uristring = process.env.MONGODB_URI || 'mongodb://localhost/User';
    mongoose.connect(uristring, callback)
}

module.exports = {connect}
