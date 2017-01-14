var express = require('express');
var router = express.Router();
var AV = require('leanengine');

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = '';
  if(req.currentUser){
    var name = req.currentUser.get('username');
  }
  res.render('index',{
    title: "博士直通车-首页",
    user: name
  });
});

module.exports = router;
