 /* GET 'home' page */
 const homelist = (req, res) => {
    res.render('home', { title: 'Home' });
   };
   /* GET 'Location info' page */
   const locationInfo = (req, res) => {
    res.render('Menu', { title: 'Location info' });
   };
   /* GET 'Add review' page */
   const addReview = (req, res) => {
    res.render('NewReview', { title: 'Add review' });
   };
   /* GET 'Contact Us' page */
   const contact = (req, res) => {
      res.render('contact', { title: 'Contact Us' });
     };
   module.exports = {
    homelist,
    locationInfo,
    addReview,
    contact
   };