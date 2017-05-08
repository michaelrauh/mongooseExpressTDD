var request = require('supertest');
var sinon = require('sinon')
var profile;
var connectStub;
var subject;

beforeAll(() => {
  profile = require('./profile')
  connectStub = sinon.stub(profile, 'connect')
  subject = require('./app');
});

afterAll(done => {
  subject.close(done)
});

test('loading app forms a database connection', () => {
  expect(connectStub.called).toEqual(true)
})

test('POST to / should result in a 200', done => {
  request(subject)
  .post('/')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
})
