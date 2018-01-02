var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('Avneesh', { title: 'David' });
});

module.exports = router;
