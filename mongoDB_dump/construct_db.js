'use strict';

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    assert = require('assert');

var DB = new Db('applicaster', new Server('localhost', 27017));

// Fetch a collection to insert document into
DB.open(function(err, DB) {
  var collection = DB.collection("tweets");
  // Insert document
  collection.insert(require('./tweets_data'), function(err, result) {
    console.log(err, result);
    assert.equal(null, err);
  });
});

// Fetch a collection to insert document into
DB.open(function(err, DB) {
  var collection = DB.collection("users");
  // Insert document
  collection.insert(require('./users_data'), function(err, result) {
    console.log(err, result);
    assert.equal(null, err);
  });
});
