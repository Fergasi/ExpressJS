var express = require('express');
var router = express.Router();
var movies = ['The Truffle Hunters', 'Icarus', 'Carteland'];

/* GET respond with a resource message. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET username listing. */
router.get('/myname', function(req, res, next) {
  res.send('Fergus Magor');
});

/* GET favorite movies listing. */
router.get('/favoritemovies', function(req, res, next) {
  res.json(movies);
});

module.exports = router;
