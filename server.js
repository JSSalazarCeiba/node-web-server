// Load modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Make a new express app
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Log middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('log/server.log', log + '\n', (error) => {
    if (error) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// Maintenance middleware
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

// HTML load middleware
app.use(express.static(__dirname + '/public'));

// Helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Create a GET handler
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome!',
    link: '/about',
    linkText: 'about'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'Need help?',
    link: '/',
    linkText: 'home'
  });
});

app.get('/bad', (req, res) => {
});

// Setup a listener
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
