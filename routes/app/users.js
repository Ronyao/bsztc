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
    title: "登录-博士直通车",
    user: req.currentUser
  });
});

//登录，成功跳转页面，并保持登录状态，header需要改变，失败就返回错误信息
router.post('/login',function(req, res, next) {
  var result = "";
  var username = req.body.phone;
  var password = req.body.pass;
  AV.User.logIn(username, password).then(function(user) {
    res.saveCurrentUser(user);
    result = "success";
    res.json(result);
  }, function(error) {
    if(error.code=="210"){
      result = "用户名和密码不匹配";
    }else if(error.code=="211"){
      result = "找不到用户";
    }
    res.json(result);
  }).catch(next);

});

router.get('/reg',function(req, res, next) {
  res.render('users/reg', {
    title: "注册-博士直通车",
    user: req.currentUser
   });
});

router.post('/get_vercode',function(req, res, next){
  var result = "";
  var mobile = req.body.phone;
  //查询数据库是否已经注册过
  var query = new AV.Query('_User');
  query.equalTo('mobilePhoneNumber', mobile);
  query.find().then(function(result){
    if(result.length===0){
      AV.Cloud.requestSmsCode(mobile).then(function (success) {
        result = "success";
        res.json(result);
      }, function (error) {
        //暂时不知道会有什么错误
        result = "错误码："+ error.code;
        res.json(result);
      });
    }else{
      result = "已存在此手机用户";
      res.json(result);
    }
  },function(error){
    result = "错误码："+ error.code;
    res.json(result);
  });
});

router.post('/reg',function(req, res, next){
  var result = '123';
  var mobile = req.body.phone;
  var pass = req.body.pass;
  var repass = req.body.repass;
  var vercode = req.body.vercode;
  //验证密码的长度，密码是否一致

  AV.User.signUpOrlogInWithMobilePhone(mobile, vercode).then(function (success) {

    // 新建 AVUser 对象实例
    var user = new AV.User();
    user.setUsername(mobile);
    user.setPassword(pass);
    user.signUp().then(function (loginedUser) {
        console.log(loginedUser);
        result = "success";
        res.json(result);
    }, function (error) {
      result = "错误码："+ error.code;
      res.json(result);
    });
  }, function (error) {
    // 失败
    result = "错误码："+ error.code;
    if(error.code =='603'){
      result = "无效的短信验证码，验证码不匹配或者过期";
    }
    res.json(result);
  });
});

router.get('/forget',function(req, res, next) {
  res.render('users/forget');

});

router.get('/logout',function(req, res, next) {
  req.currentUser.logOut();
  res.clearCurrentUser();
  res.redirect('/');
});

module.exports = router;
