var reviewsRouter = require('./app_server/routes/reviews');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const cors = require('cors'); // For CORS handling

require("./app_server/models/db");

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');

var app = express();

// ✅ Set view engine and views folder for Jade
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// Middleware for CORS (allow frontend to make requests to backend)
app.use(cors());

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if you're using HTTPS
}));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

// Serve static files from the React frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

module.exports = app;
