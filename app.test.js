var request = require('supertest');
var sinon = require('sinon')
var profile;
var connectStub;
var insertStub;
var subject;

beforeAll(() => {

  var first = {
    id: "pineapple",
    value: [{
        q: "bar",
        a: "baz"
      },
      {
        q: "bing",
        a: "bang"
      }
    ]
  }

  var second = {
    id: "bar",
    value: [{
      q: "bar",
      a: "baz"
    }, {
      q: "boo",
      a: "bong"
    }]
  }
  profile = require('./profile')
  connectStub = sinon.stub(profile, 'connect')
  insertStub = sinon.stub(profile, 'insert').resolves()
  findStub = sinon.stub(profile, 'find')
  findStub.withArgs('foo').resolves("hello");
  findStub.withArgs('pineapple').resolves(first);
  findStub.withArgs('bar').resolves(second);
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

test('GET /id1/id2 compares the two ids and returns the intersection', done => {
  var expected = [{
    q: "bar",
    a: "baz"
  }]

  request(subject)
    .get('/pineapple/bar')
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).toEqual("[{\"q\":\"bar\",\"a\":\"baz\"}]")
      done();
    });
})
