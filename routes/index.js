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

router.get('/contact', function(req, res, next) {
  if(!req.currentUser){
    res.render('contact',{
      title:"联系我们 | 博士直通车",
      user: '',
    });
  }else{
    return res.redirect('/topic');
  }

});

router.get('/about', function(req, res, next) {
  if(!req.currentUser){
    res.render('about',{
      title:"关于我们 | 博士直通车",
      user: '',
    });
  }else{
    return res.redirect('/topic');
  }

});
module.exports = router;
