const express = require('express');
const app = express();

// Set the root directory for static files
app.use(express.static(__dirname + '/public'));

// Route to the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route to the games page
app.get('/pacman/index', (req, res) => {
  res.sendFile(__dirname + 'pacman/index.html');
});

// Route to the Pacman game page
app.get('/invaders/index', (req, res) => {
  res.sendFile(__dirname + 'invaders/index.html');
});

// Route to the Space Invaders game page
app.get('/pong/index', (req, res) => {
  res.sendFile(__dirname + 'pong/index.html');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
