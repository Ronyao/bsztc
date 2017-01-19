var express = require('express');
var router = express.Router();

var AV = require('leanengine');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/users/index');
});

router.get('/index', function(req, res, next) {
  var avatar = req.currentUser.get('avatar');
  var identity = "";
  if(avatar == 'http://7xnito.com1.z0.glb.clouddn.com/default_avatar.png'){
    avatar = "../res/images/avatar/default.png";
  }
  if(req.currentUser.get('isEnterprise')=='true'){
    identity = "认证企业";
  }else if (req.currentUser.get('isDoctor')=='true') {
    identity = "认证博士";
  }
  res.render('users/index',{
    title: "用户中心-博士直通车",
    user: req.currentUser.get('nickname'),
    avatar: avatar,
    identity:identity,
    jointime:req.currentUser.get('createdAt'),
    city:req.currentUser.get('city'),
    sex:req.currentUser.get('sex'),
    uid:req.currentUser.get('id')
  });
});

router.get('/login',function(req, res, next) {

  if(req.currentUser){
    //跳到首页
    res.redirect('/topic');
  }else{
    //登录页面
    res.render('users/login',
    {
      title: "登录-博士直通车",
      user: "",
    });
  }
});

//登录，成功跳转页面，并保持登录状态，header需要改变，失败就返回错误信息
router.post('/login',function(req, res, next) {
  var result = "";
  var username = req.body.phone;
  var password = req.body.pass;
  //判断手机格式是否正确
  if(!(/^1[34578]\d{9}$/.test(username))){
      result = "手机号码格式不正确！";
      res.json(result);
  }else if (password.length==0) {
      result = "密码不能为空！";
      res.json(result);
  } else{
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
  }

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
  if(!(/^1[34578]\d{9}$/.test(mobile))){
      result = "手机号码格式不正确！";
      res.json(result);
  } else {
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
  }

});

router.post('/reg',function(req, res, next){
  var result = '';
  var mobile = req.body.phone;
  var pass = req.body.pass;
  var repass = req.body.repass;
  var vercode = req.body.vercode;
  //验证密码的长度，密码是否一致
  if(!(pass.length>=6)){
    result = "建议密码长度大于6";
    res.json(result);
  }else if (!( pass === repass)) {
    result = "两者密码不一致，请重新输入";
    res.json(result);
  }else{
    AV.User.signUpOrlogInWithMobilePhone(mobile, vercode).then(function (success) {

      // 随机生成一个nickname
      // var nickname = "博士直通车用户";
      // var jschar = ['0','1','2','3','4','5','6','7','8','9'];
      // for(var i=0; i<4; i++){
      //   var id = Math.floor(Math.random()*10);
      //   nickname += jschar[id];
      // }

      var user = new AV.User();
      user.setUsername(mobile);
      user.setPassword(pass);
      //user.set('nickname',nickname);
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
  }

});

router.get('/forget',function(req, res, next) {
  res.render('users/forget',{
    title: "忘记密码-博士直通车",
    user: req.currentUser
   });
});

router.post('/forget',function(req, res, next) {
  var result = '';
  var mobile = req.body.phone;
  var pass = req.body.pass;
  var repass = req.body.repass;
  var vercode = req.body.vercode;
  //验证密码的长度，密码是否一致
  if(!(pass.length>=6)){
    result = "密码不能为空或长度必须大于6";
    res.json(result);
  }else if (!( pass== repass)) {
    result = "两者密码不一致，请重新输入";
    res.json(result);
  }else{
    AV.User.resetPasswordBySmsCode(vercode, pass).then(function (success) {
      result = "success";
      res.json(result);
    }, function (error) {
      result = "错误码："+ error.code;
      res.json(result);
    });
  }

})

router.get('/logout',function(req, res, next) {
  req.currentUser.logOut();
  res.clearCurrentUser();
  res.redirect('/');
});

router.post('/get_vercode_forget',function(req, res, next){
  var result = "";
  var mobile = req.body.phone;
  if(!(/^1[34578]\d{9}$/.test(mobile))){
      result = "手机号码格式不正确！";
      res.json(result);
  } else {
    AV.User.requestPasswordResetBySmsCode(mobile).then(function (success) {
      result = "success";
      res.json(result);
    }, function (error) {
      //暂时不知道会有什么错误
      result = "错误码："+ error.code;
      if(error.code=='213'){
        result = '用户不存在。';
      }
      res.json(result);
    });
  }
});

router.get('/set',function(req, res, next) {
  // var query = new AV.Query('_User');
  // query.equalTo('isDoctor', true);
  // query.find().then(function (results) {
  //   console.log(results);
  //   // res.render('users/set',{
  //   //   title: "设置-博士直通车",
  //   //   user: results
  //   // });
  // }, function (error) {
  //   res.redirect('error');
  // });
  var avatar = req.currentUser.get('avatar');
  var identity = "";
  if(avatar == 'http://7xnito.com1.z0.glb.clouddn.com/default_avatar.png'){
    avatar = "../res/images/avatar/default.png";
  }
  if(req.currentUser.get('isEnterprise')=='true'){
    identity = "认证企业";
  }else if (req.currentUser.get('isDoctor')=='true') {
    identity = "认证博士";
  }
  res.render('users/set',{
    title: "设置-博士直通车",
    user: req.currentUser.get('nickname'),
    avatar: avatar,
    identity:identity,
    jointime:req.currentUser.get('createdAt'),
    city:req.currentUser.get('city'),
    sex:req.currentUser.get('sex'),
    currentUser:req.currentUser
  });
})

router.get('/home',function(req, res, next){
  var avatar = req.currentUser.get('avatar');
  var identity = "";
  if(avatar == 'http://7xnito.com1.z0.glb.clouddn.com/default_avatar.png'){
    avatar = "../res/images/avatar/default.png";
  }
  if(req.currentUser.get('isEnterprise')=='true'){
    identity = "认证企业";
  }else if (req.currentUser.get('isDoctor')=='true') {
    identity = "认证博士";
  }
   uid = req.query.uid;
   res.render('users/home',{
     title:"用户中心",
     user: req.currentUser.get('nickname'),
     avatar: avatar,
     identity:identity
   });
});

router.get('/message',function(req, res, next){
  res.render('users/message');
});



module.exports = router;
