var request = require('supertest');
var td = require('testdouble')
var subject, profile

beforeEach(() => {
 profile = td.replace('./profile')
 console.log(profile)
 subject = require('./app');
});

afterEach(done => {
  subject.close(done)
});


test('loading app forms a database connection', done => {
  done()
})
