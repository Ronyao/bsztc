var express = require('express');
var router = express.Router();

var AV = require('leanengine');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index');
});

router.get('/login',function(req, res, next) {
  res.render('users/login', { title: "博士直通车" });
});

//登录，成功跳转页面，并保持登录状态，header需要改变，失败就返回错误信息
router.post('/login',function(req, res, next) {
  var username = req.body.phone;
  var password = req.body.pass;
  //res.json(username);
  AV.User.logIn(username, password).then(function(user) {
    //res.send(JSON.stringify(user));
    res.saveCurrentUser(user);
    //res.json({user:123});
    res.redirect('/users');
  }, function(error) {
    //res.redirect('/users/login?errMsg=' + JSON.stringify(err));
    //res.send(JSON.stringify(error));
    return error;
  }).catch(next);

});

router.get('/reg',function(req, res, next) {
  res.render('users/reg', { title: "博士直通车" });
})

module.exports = router;
