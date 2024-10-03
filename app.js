var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // Import express-session

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');  // Updated from jade to pug

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
    secret: 'your_secret_key', // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if you're using HTTPS
}));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Cart route to add items to the cart
app.post('/cart/add', (req, res) => {
    const { id, name, price } = req.body; // Extract item details from the request body
    // Initialize cart if it doesn't exist
    if (!req.session.cart) {
        req.session.cart = [];
    }

    // Add item to the cart
    req.session.cart.push({ id, name, price: parseInt(price, 10) }); // Parse price as an integer
    res.redirect('/cart'); // Redirect to the cart view
});

// Cart route to view cart items
app.get('/cart', (req, res) => {
    const cartItems = req.session.cart || []; // Get cart items from session
    res.render('cart', { title: 'Your Cart', cartItems }); // Render cart.pug with cart items
});

// Error handler middleware
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: 'Error Page',
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {} // Hide error details in production
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
