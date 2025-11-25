const express = require('express');
const router = express.Router();
const ctrlTravel = require('../controllers/travel');

// Home route (optional)
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Travel list page
router.get('/travel', ctrlTravel.travel);   // THIS is important

module.exports = router;
