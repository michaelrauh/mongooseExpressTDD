var sinon = require('sinon')
var subject;
var profile;
var connectStub;
beforeEach(() => {
  profile = require('./profile')
  connectStub = sinon.stub(profile, 'connect')
  subject = require('./app');
});

test('loading app forms a database connection', () => {
  expect(connectStub.called).toEqual(true)
})
