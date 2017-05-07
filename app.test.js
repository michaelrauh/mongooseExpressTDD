var td = require('testdouble')
var subject;
beforeEach(() => {
  subject = require('./app');
});

test('loading app forms a database connection', () => {
  var connector = td.function()
  subject.setConnector(connector)
  subject.connectToDatabase()
  td.verify(connector())
})
