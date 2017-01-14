var express = require('express');
var router = express.Router();

var AV = require('leanengine');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index');
});

router.get('/login',function(req, res, next) {
  res.render('users/login',
  {
    title: "博士直通车-登录",
    user: req.currentUser
  });
});

//登录，成功跳转页面，并保持登录状态，header需要改变，失败就返回错误信息
router.post('/login',function(req, res, next) {
  var name = '';
  var username = req.body.phone;
  var password = req.body.pass;
  AV.User.logIn(username, password).then(function(user) {
    res.saveCurrentUser(user);
    res.redirect('/topic');
  }, function(error) {
    res.send(error);
  }).catch(next);

});

router.get('/reg',function(req, res, next) {
  res.render('users/reg', { title: "博士直通车" });
});

router.get('/forget',function(req, res, next) {
  res.render('users/forget');

});

router.get('/logout',function(req, res, next) {
  req.currentUser.logOut();
  res.clearCurrentUser();
  return res.render('/',{
    title: "博士直通车-首页",
    user: req.currentUser
  });
});

module.exports = router;
