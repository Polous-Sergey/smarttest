const mongoose = require('mongoose');
const config = require('../config/main-config');
const dbURI = config.database;

mongoose.connect(dbURI);

// connection events
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// bring schemas & models
require('./users');
require('./genres');
require('./movies ');