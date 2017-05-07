var profile = require('./profile')
var connector = profile.connect;
function setConnector(input){
  connector = input;
}

function connectToDatabase(){
  var connection = connector()
}

module.exports = {setConnector, connectToDatabase, connector};
