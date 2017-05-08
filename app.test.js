var request = require('supertest');
var sinon = require('sinon')
var profile;
var connectStub;
var insertStub;
var subject;

beforeAll(() => {
  profile = require('./profile')
  connectStub = sinon.stub(profile, 'connect')
  insertStub = sinon.stub(profile, 'insert').resolves()
  findStub = sinon.stub(profile, 'find').withArgs('foo').resolves("hello");
  subject = require('./app');
});

afterAll(done => {
  subject.close(done)
});

test('loading app forms a database connection', () => {
  expect(connectStub.called).toEqual(true)
})

test('POST / returns in a 200', done => {
  var data = {
    id: "foo",
    value: [{
      q: "bar",
      a: "baz"
    }]
  }

  request(subject)
    .post('/')
    .send(data)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(insertStub.calledWith(data)).toEqual(true)
      done();
    });
})

test('GET /id returns the record at that id', done => {
  request(subject)
    .get('/foo')
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).toEqual("hello")
      done();
    });
})
