'use strict';

var chai = require('chai');
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:2500');


describe('tweets', function() {

  it('should return 302 on / GET', function(done) {
    api.get('/')
      .set('Accept', 'application/json')
      .expect(302)
      .end(function(err,res){
        expect(err).to.equal(null);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal('Not Allowed');
        done();
      });
  });

  it('should return message "missings params" on /search/hashtag GET', function(done) {
     api.get('/search/hashtag')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err,res) {
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal('missings params');
        done();
      })
  });

  it('should return message "missings params" on /search/hashtag?q= GET', function(done) {
     api.get('/search/hashtag?q=')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err,res) {
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal('missings params');
        done();
      })
  });

  it('should return array of 5 objects on /search/hashtag?q=tag1', function(done) {
    api.get('/search/hashtag?q=tag1')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err,res) {
        var resArr = JSON.parse(res.text);

        expect(resArr).to.be.a('array');
        if(resArr[0].length){
          expect(resArr[0].length).to.equal(5);
          expect(resArr[0][0]).to.have.property('_id');
          expect(resArr[0][0]).to.have.property('lang');
          expect(resArr[0][0]).to.have.property('text');
          expect(resArr[0][0]).to.have.property('user_id');
          expect(resArr[0][0]).to.have.property('created_at');
          expect(resArr[0][0]).to.have.property('entities');
          expect(resArr[0][0]).to.have.property('user');
        }
        done();
      })
  })

  it('should save query search /search/hashtag?q=tag1 GET', function(done) {
    api.get('/search/hashtag?q=tag1')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err,res) {
        var resArr = JSON.parse(res.text);
        expect(resArr[1]).to.have.property('status');
        expect(resArr[1].status).to.equal(1);
        done();
      })
  })
});

describe('queries', function() {
  it('should return message "missings params" on /search/queries GET', function(done) {
    api.get('/search/queries')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err,res) {
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal('missings params');
        done();
      })
  })
  it('should return message "missings params" on /search/queries?q= GET', function(done) {
    api.get('/search/queries')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err,res) {
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal('missings params');
        done();
      })
  })
  it('should return array on /search/queries?q=tag1 GET', function(done) {
    api.get('/search/queries?q=tag1')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err,res) {
        var resArr = JSON.parse(res.text);

        expect(resArr).to.be.a('array');
        if (resArr.length) {
          expect(resArr[0]).to.have.property('_id');
          expect(resArr[0]).to.have.property('created_at');
          expect(resArr[0]).to.have.property('query_str');
          expect(resArr[0]).to.have.property('query_type');
        }
        done();
      })
  })
})


