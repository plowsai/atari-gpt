const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files with custom headers
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Example route: Home page
app.get('/pacman', (req, res) => {
  res.sendFile(path.join(__dirname, 'pacman', 'index.html'));
});

// Example route: About page
app.get('/invaders', (req, res) => {
  res.sendFile(path.join(__dirname, 'invaders', 'index.html'));
});

// Example route: Contact page
app.get('/pong', (req, res) => {
  res.sendFile(path.join(__dirname, 'pong', 'index.html'));
});

// Add more routes as needed

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
