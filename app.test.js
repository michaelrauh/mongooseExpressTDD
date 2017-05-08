var request = require('supertest');
var sinon = require('sinon')
var profile;
var connectStub;
var insertStub;
var subject;

var emptyPromise = new Promise((resolve, reject) => {
  resolve()
})

beforeAll(() => {
  profile = require('./profile')
  connectStub = sinon.stub(profile, 'connect')
  var deferred = Promise.defer();
  stub = sinon.stub(deferred, 'resolve').returns(deferred.promise);
  insertStub = sinon.stub(profile, 'insert').callsFake(stub)
  subject = require('./app');
});

afterAll(done => {
  subject.close(done)
});

test('loading app forms a database connection', () => {
  expect(connectStub.called).toEqual(true)
})

test('POST to / should result in a 200', done => {
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
