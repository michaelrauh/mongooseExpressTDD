var request = require('supertest');
var subject;

beforeEach(() => {
  subject = require('./app');
});

afterEach(done => {
  subject.close(done)
});

test.only('POST to / should result in a 200', done => {
  request(subject)
  .post('/')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
})
