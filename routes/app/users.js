var express = require('express');
var fs = require('fs');
var router = express.Router();

var AV = require('leanengine');

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.redirect('/users/index');
});

router.get('/index', function(req, res, next) {
  var avatar = req.currentUser.get('avatar');
  var identity = "";
  if(avatar == 'http://7xnito.com1.z0.glb.clouddn.com/default_avatar.png'){
    avatar = "../res/images/avatar/default.png";
  }
  if(req.currentUser.get('isEnterprise')==true){
    identity = "认证企业";
  }else if (req.currentUser.get('isDoctor')==true) {
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
    return res.redirect('/topic');
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
  var result = "网络错误，请重试";
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
  var pass = req.body.pass;
  var repass = req.body.repass;
  var avatar = "http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg";
  var sex = 1;
  var nickname = "博士直通车用户";
  var jschar = ['0','1','2','3','4','5','6','7','8','9'];
  for(var i=0; i<4; i++){
    var id = Math.floor(Math.random()*10);
    nickname += jschar[id];
  }
  if(!(/^1[34578]\d{9}$/.test(mobile))){
      result = "手机号码格式不正确！";
      res.json(result);
  }else if (pass.length<6) {
    result = "密码长度至少为6位";
    res.json(result);
  }else if (!( pass === repass)) {
    result = "两者密码不一致，请重新输入";
    res.json(result);
  }else {
    var user = new AV.User();
    user.set("username", mobile);
    user.set("nickname", nickname);
    user.set("password", pass);
    user.set("avatar",avatar);
    user.set("sex",sex);
    user.setMobilePhoneNumber(mobile);
    user.signUp().then(function(loginedUser){
      result = "success";
      res.json(result);
    },function(error){
      result = "错误码："+ error.code;
      if(error.code == "214"){
        result = "该手机已经注册过了";
      }
      res.json(result);
    });
  }

});

router.post('/reg',function(req, res, next){
  var result = '';
  var vercode = req.body.vercode;
  //验证码必须为6位纯数字
  if(!(/^\d{6}$/.test(vercode))){
    result = "验证码必须为长度为6的数字";
    res.json(result);
  } else{
   AV.User.verifyMobilePhone(vercode).then( function(){
   //验证成功
   result = "success";
   res.json(result);
  }, function(error){
   //验证失败
   result = "错误码："+ error.code;
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
  return res.redirect('/');
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
  var avatar = req.currentUser.get('avatar');
  var identity = "";
  if(avatar == 'http://7xnito.com1.z0.glb.clouddn.com/default_avatar.png'){
    avatar = "../res/images/avatar/default.png";
  }
  if(req.currentUser.get('isEnterprise')==true){
    identity = "认证企业";
  }else if (req.currentUser.get('isDoctor')==true) {
    identity = "认证博士";
  }
  res.render('users/set',{
    title: "设置-博士直通车",
    user: req.currentUser.get('nickname'),
    avatar: avatar,
    identity: identity,
    currentUser:req.currentUser
  });
})

router.get('/home',function(req, res, next){
  var avatar = req.currentUser.get('avatar');
  var identity = "";
  if(avatar == 'http://7xnito.com1.z0.glb.clouddn.com/default_avatar.png'){
    avatar = "../res/images/avatar/default.png";
  }
  if(req.currentUser.get('isEnterprise')==true){
    identity = "认证企业";
  }else if (req.currentUser.get('isDoctor')==true) {
    identity = "认证博士";
  }
   uid = req.query.uid;
   var query = new AV.Query('_User');
   query.equalTo('objectId', uid);
   query.find().then(function (results) {
     res.render('users/home',{
       title:"用户中心",
       user: req.currentUser.get('nickname'),
       avatar: avatar,
       identity: identity,
       currentUser: req.currentUser,
       thisUser: results
     });
  }, function (error) {
    res.render('users/home',{
      title:"用户中心",
      user: req.currentUser.get('nickname'),
      avatar: avatar,
      identity: identity
    });
  });

});

router.get('/message',function(req, res, next){
  res.render('users/message');
});

router.post('/myinfo',function(req, res, next) {
  var result = "";
  var id = req.currentUser.id;
  var nickname = req.body.nickname;
  var sex = parseInt(req.body.sex);;
  var city = req.body.city;
  var signature = req.body.signature;

  if(nickname.length>8){
    res.json("建议昵称不要大于8个字");
  }else if(city.length>10){
    res.json("你确定你的城市名字有这么长？");
  }else{
    var user = AV.Object.createWithoutData('_User', id);
    user.set('nickname', nickname);
    user.set('city', city);
    user.set('sex', sex);
    user.set('signature', signature);
    user.save().then(function() {
      res.json("success");
    },function(error){

      res.json("修改失败");
    });
  }
});

router.post('/upload_avatar',function(req, res, next){
  var user = AV.Object.createWithoutData('_User', req.currentUser.get('id'));
  user.set('avatar', req.body.avatar);
  user.save();
  res.json('url');
});


router.post('/d_verify',function(req, res, next) {
  //必填的选项有：个人简介，学科门类，省市，真实姓名，身份证，三张图，价格，预约时间
  var result = '';
  var realName = req.body.realName;
  var reaild = req.body.reaild;
  var disciplinsFiles = req.body.disciplinsFiles;
  var firstDisciplines = req.body.firstDisciplines;
  var secondDisciplines = req.body.secondDisciplines;
  var province = req.body.province;
  var city = req.body.city;
  var idCardInHand = req.body.idCardInHand;
  var idCardFront = req.body.idCardFront;
  var graduationCard = req.body.graduationCard;
  var introduction = req.body.introduction;
  var researchDirection = req.body.researchDirection;
  var historyProjects = req.body.historyProjects;
  var nowProjects = req.body.nowProjects;
  var historyAwards = req.body.historyAwards;
  var historyPapers = req.body.historyPapers;
  var callPrice = parseInt(req.body.callPrice);
  var chatPrice = parseInt(req.body.chatPrice);
  var emptyTime = req.body.emptyTime;

  var dataStrArr=emptyTime.split(",");//分割成字符串数组
  var dataIntArr=[];//保存转换后的整型字符串
  dataStrArr.forEach(function(data,index,arr){
      dataIntArr.push(+data);
  });

  if (realName.replace(/(^\s*)|(\s*$)/g, "").length ==0)
  {
    result = "真实姓名不能为空";
    res.json(result);
  }else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(reaild))) {
    result = "身份证填写有误";
    res.json(result);
  }else if (disciplinsFiles =="学科门类"||firstDisciplines=="一级学科"||secondDisciplines=="二级学科") {
    result = "学科门类选择有误";
    res.json(result);
  }else if (province=="省" || city=="市"){
    result = "省市选择有误";
    res.json(result);
  }else if(idCardInHand.split("/")[idCardInHand.split("/").length-1] =='litu.png'){
    result = "手持身份证照片必须上传";
    res.json(result);
  }else if(idCardFront.split("/")[idCardFront.split("/").length-1]=='litu.png'){
    result = "身份证正面照片必须上传";
    res.json(result);
  }else if(graduationCard.split("/")[graduationCard.split("/").length-1]=='litu.png'){
    result = "所在学校毕业证必须上传";
    res.json(result);
  }else if(introduction ==''){
    result = "个人简介不能为空";
    res.json(result);
  }else if(callPrice==''||chatPrice==''){
    result = "价格不能为空";
    res.json(result);
  }else if (emptyTime=='') {
    result = "预约时间必须选择一个以上";
    res.json(result);
  }
  else {
    var user = AV.Object.createWithoutData('_User', req.currentUser.id);
    user.set('d_realName',realName);
    user.set('d_realId',reaild);
    user.set('d_disciplinesFields',disciplinsFiles);
    user.set('d_firstDisciplines',firstDisciplines);
    user.set('d_secondDisciplines',secondDisciplines);
    user.set('province',province);
    user.set('city',city);
    user.set('d_idCardInHand',idCardInHand);
    user.set('d_idCardFront',idCardFront);
    user.set('d_graduationCard',graduationCard);
    user.set('d_introduction',introduction);
    user.set('d_researchDirection',researchDirection);
    user.set('d_historyProjects',historyProjects);
    user.set('d_nowProjects',nowProjects);
    user.set('d_historyAwards',historyAwards);
    user.set('d_historyPapers',historyPapers);
    user.set('d_callPrice',callPrice);
    user.set('d_chatPrice',chatPrice);
    user.set('d_emptyTime',dataIntArr);
    user.set('applyState', 1);

    user.save().then(function (user) {
      result = 'success';
      res.json(result);
    }, function (error) {
      result = error;
      res.json(result);
    });
  }

});

router.get('/get_Dverify', function(req, res, next){
  res.json(req.currentUser);
})

router.post('/e_verify', function(req, res, next){
  var result = '';
  var industriesClass = req.body.industriesClass;
  var name = req.body.name;
  var province = req.body.province;
  var city = req.body.city;
  var contactName = req.body.contactName;
  var contactNumber = req.body.contactNumber;
  var interesTopic = req.body.interesTopic;
  var lincenseNumber = req.body.lincenseNumber;
  var scale = req.body.scale;
  var qualification = req.body.qualification;
  var bussinessLicenes = req.body.bussinessLicenes;
  var bussinessLetter = req.body.bussinessLetter;

  if(industriesClass==''){
    result = '需选择行业门类';
  }else if(name==''){
    result = '企业名称不能为空';
  }else if (province=="省" || city=="市"){
    result = "省市选择有误";
  }else if(contactName==''){
    result = "联系人姓名不能为空";
  }else if(contactNumber==''){
    result = "联系人号码不能为空";
  }else if(interesTopic==''){
    result = "感兴趣话题不能为空";
  }else if(lincenseNumber==''){
    result = "执照注册号不能为空";
  }else if(bussinessLicenes.split("/")[bussinessLicenes.split("/").length-1]=='litu.png'){
    result = "需上传营业执照";
  }else if(bussinessLetter.split("/")[bussinessLetter.split("/").length-1]=='litu.png'){
    result = "需上传企业公函";
  }else{
    var user = AV.Object.createWithoutData('_User', req.currentUser.id);
    user.set('e_industriesClass',industriesClass);
    user.set('e_name',name);
    user.set('province',province);
    user.set('city',city);
    user.set('e_contactName',contactName);
    user.set('e_contactNumber',contactNumber);
    user.set('e_interesTopic',interesTopic);
    user.set('e_lincenseNumber',lincenseNumber);
    user.set('e_bussinessLicenes',bussinessLicenes);
    user.set('e_bussinessLetter',bussinessLetter);
    user.set('e_scale',scale);
    user.set('e_qualification',qualification);
    user.set('applyState', 1);

    user.save().then(function (user) {
      result = 'success';
    }, function (error) {
      result = error;
    });
  }

  res.json(result);
});

router.post('/upload_pic',function(req, res, next) {
  res.json('success');
});

module.exports = router;
