var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('Jesse', { title: 'David' });
});

module.exports = router;
