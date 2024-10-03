/* GET 'about' page */
const about = (req, res) => {
    res.render('About', { title: 'About' });
   };

   module.exports = {
    about
   };