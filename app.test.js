var request = require('supertest');
var subject;

beforeEach(() => {
  subject = require('./app');
});

afterEach(done => {
  subject.close(done)
});

test('POST to / should result in a 200', done => {
  request(subject)
    .get('/')
    .expect(200)
    done()
})
