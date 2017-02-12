var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/chat_pay', function(req, res, next) {
  res.render('pay/chat_pay',{

  });
});

router.get('/call_pay', function(req, res, next) {
  res.render('pay/call_pay',{

  });
});

module.exports = router;
