var express = require('express');
var router = express.Router();
var AV = require('leanengine');

/* GET home page. */
router.get('/log', function(req, res, next) {
  console.log(req.query.id);
  res.render('chat/log');
});

module.exports = router;
