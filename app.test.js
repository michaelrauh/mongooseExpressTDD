var td = require('testdouble')
var subject, profile

beforeEach(() => {
 profile = td.replace('./profile')
 console.log(profile)
 subject = require('./app');
});

test('loading app forms a database connection', () => {
  td.verify(profile.connect())
})
