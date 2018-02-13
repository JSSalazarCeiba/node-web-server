// Load modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Port constant
const port = process.env.PORT || 3000;

// Make a new express app
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware log
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

// Middleware maintenance
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

// Middleware HTML render capabilities
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
app.listen(port, () => {
  console.log('Server is up on port 3000');
});
