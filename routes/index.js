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

router.get('/feedback', function(req, res, next) {
  if(!req.currentUser){
    res.render('feedback',{
      title:"反馈 | 博士直通车",
      user: '',
    });
  }else{
    return res.redirect('/topic');
  }

});

router.post('/feedback', function(req, res, next) {
  var name = req.body.name, email = req.body.email, content = req.body.content;
  if(content == ''){
    res.json('反馈内容不能为空');
  }else if (email!=''&&!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
    res.json('邮箱格式错误！');
  }else{
    var Feedback = AV.Object.extend('Feedback');
    var feedback = new Feedback();
    feedback.set('name', name);
    feedback.set('email', email);
    feedback.set('content', content);
    feedback.save().then(function(){
      res.json('success');
    }, function(error){
      res.json('提交反馈出错！');
    });
  }

});
module.exports = router;
