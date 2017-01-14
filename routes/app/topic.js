var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('topic/index',{
    title: "博士直通车-话题",
    user: req.currentUser.get('username')
  });
});

module.exports = router;
