const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();
let errorCount = 0;

// Simulate an error in the /user endpoint
app.get('/user', function(req, res) {
  throw new Error("User not found");  // Simulating an error
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  res.status(200).json({ errorCount });
});

// Global error handling middleware
app.use(function(err, req, res, next) {
  if (err) {
    errorCount += 1;
    res.status(404).json({ error: 'Not Found', message: err.message });
  } else {
    next();
  }
});

module.exports = app;
