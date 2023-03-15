const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('css'));
app.use(express.static('js'));

// Custom middleware to set Content-Type for .js files
const setJsContentType = (req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
};

// Serve static files from 'public' folder with custom headers
app.use('/public', setJsContentType, express.static(path.join(__dirname, 'public')));

// Serve static files from 'another' folder with custom headers
app.use('/pacman', setJsContentType, express.static(path.join(__dirname, 'pacman')));
app.use('/invaders', setJsContentType, express.static(path.join(__dirname, 'invaders')));
app.use('/pong', setJsContentType, express.static(path.join(__dirname, 'pong')));


//public static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/pacman', (req, res) => {
  res.sendFile(path.join(__dirname, 'pacman', 'index.html'));
});


app.get('/invaders', (req, res) => {
  res.sendFile(path.join(__dirname, 'invaders', 'index.html'));
});


app.get('/pong', (req, res) => {
  res.sendFile(path.join(__dirname, 'pong', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
