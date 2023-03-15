const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// public folder
app.use(express.static(__dirname + '/public'));


// sendFile will go here
app.get('/pacman/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/pacman/index.html'));
});
app.get('/pong/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/pacman/index.html'));
});
app.get('/invaders/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/invaders/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);