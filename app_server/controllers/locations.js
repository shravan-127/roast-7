// app_server/controllers/locations.js

const homelist = (req, res) => {
   res.render('home', { title: 'Home' });
};

const locationInfo = (req, res) => {
   res.render('coffee', { title: 'Coffee Menu' }); 
};

const addReview = (req, res) => {
   res.render('NewReview', { title: 'Add review' });
};

const contact = (req, res) => {
   res.render('contact', { title: 'Contact Us' });
};

const pastries = (req, res) => {
   res.render('pastries', { title: 'Pastries' });
};

const tea = (req, res) => {
   res.render('tea', { title: 'Tea Menu' }); // Change to render the correct tea view
};

const sandwiches = (req, res) => {
   const cartItems = req.session.cart || []; // Fetch cart items from session
   res.render('sandwiches', { title: 'Sandwich Menu', cartItems }); // Pass cart items to the view
};

const cart = (req, res) => {
   const cartItems = req.session.cart || []; // Ensure you are getting cart items
   res.render('cart', { title: 'Your Cart', cartItems }); // Pass title and cart items
};

const addToCart = (req, res) => {
   const item = req.body; // Assuming item data is sent in request body
   req.session.cart = req.session.cart || [];
   req.session.cart.push(item); // Add the item to the cart
   res.redirect('/cart');
};

const removeFromCart = (req, res) => {
   const itemId = req.params.id;
   req.session.cart = req.session.cart.filter(item => item.id !== itemId); // Remove item from cart
   res.redirect('/cart');
};

// Export the methods
module.exports = {
   homelist,
   locationInfo,
   pastries,
   tea,  
   addReview,
   contact,
   sandwiches,
   cart,
   addToCart,
   removeFromCart
};
