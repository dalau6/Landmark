var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('Yingjing', { title: 'David' });
});

module.exports = router;
