var express = require('express');
var router = express.Router();
var date = new Date();

/* GET datetime page. */
router.get('/', function(req, res, next) {
  res.send(`Date and Time: ${date}`);
});

module.exports = router;