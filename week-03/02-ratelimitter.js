const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

app.use((req, res, next) => {
  const userId = req.headers['user-id'];

  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  // Initialize request count for the user if not present
  if (!numberOfRequestsForUser[userId]) {
    numberOfRequestsForUser[userId] = 0;
  }

  // Increment the request count for the user
  numberOfRequestsForUser[userId] += 1;

  // Check if the user has exceeded the 5 requests per second limit
  if (numberOfRequestsForUser[userId] > 5) {
    return res.status(404).send('Too many requests');
  }

  // Allow the request to continue if within the limit
  next();
});

// Sample routes
app.get('/user', (req, res) => {
  res.status(200).json({ name: 'john' });
});

app.post('/user', (req, res) => {
  res.status(200).json({ msg: 'created dummy user' });
});

// Start the server
app.listen(2000, () => {
  console.log('Server running on port 2000');
});

module.exports = app;
