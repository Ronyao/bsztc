var express = require('express');
var router = express.Router();
var AV = require('leanengine');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.currentUser){
    res.render('index',{
      title:"首页-博士直通车",
      user: '',
    });
  }else{
    return res.redirect('/topic');
  }

});

module.exports = router;
