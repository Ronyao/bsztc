var express = require('express');
var router = express.Router();
var AV = require('leanengine');

/* GET home page. */
router.get('/', function(req, res, next) {
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
  var query = new AV.Query('Post');
  query.limit(20);
  query.descending('createdAt');
  query.find().then(function (results) {
    res.render('topic/index',{
      title: "博士直通车-话题",
      user: req.currentUser.get('nickname'),
      avatar: avatar,
      identity: identity,
      posts: results
    });
  }, function (error) {

  });
});

router.get('/replayTimes',function(req, res, next) {
  var query = new AV.Query('_User');
  query.descending('replayTimes');
  query.limit(12);
  query.find().then(function(results){
    res.json(results);
  }, function (error){
    res.json(error);
  });
});

router.get('/mostVisits',function(req, res, next){
  var query = new AV.Query('Post');
  query.descending('visits');
  query.limit(10);
  query.find().then(function(visits){
    res.json(visits);
  }, function (error){
    res.json(error);
  });
});

router.get('/mostConsultations',function(req, res, next) {
  var query = new AV.Query('Post');
  query.descending('consultations');
  query.limit(10);
  query.find().then(function(consultations){
    res.json(consultations);
  }, function (error){
    res.json(error);
  });
});

router.post('/getReply',function(req, res, next) {
  var postId = req.body.postId;
  var query = new AV.Query('Reply');
  query.equalTo('postId', postId)
  query.descending('createdAt');
  query.find().then(function(reply){
    res.json(reply);
  }, function (error){
    res.json(error);
  });
})

router.get('/add', function(req, res, next){
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
  res.render('topic/add',{
    title: "发表问题",
    user: req.currentUser.get('nickname'),
    avatar: avatar,
    identity:identity
  });
});

router.post('/add', function(req, res, next){
  var result = '';
  var questionerId = req.currentUser.id;
  var questionerAvatar = req.currentUser.get('avatar');
  var questionerNickName = req.currentUser.get('nickname');
  var title = req.body.title;
  var content = req.body.content;
  var topicClass = req.body.topicClass;
  var reward = req.body.reward;

  if(title.length==''){
    result = '题目不能为空';
    res.json(result);
  }else if(content==''){
    result = '内容不能为空';
    res.json(result);
  }else if(topicClass==''){
    result = '请选择话题类型';
    res.json(result);
  }else if(reward==''){
    result = "请输入悬赏博士点";
    res.json(result);
  }else {
    var Post = AV.Object.extend('Post');
    var Post = new Post();
    Post.set('title', title);
    Post.set('content', content);
    Post.set('topicClass', topicClass);
    Post.set('reward', reward);
    Post.set('questionerId', questionerId);
    Post.set('questionerAvatar', questionerAvatar);
    Post.set('questionerNickName', questionerNickName);
    Post.set('consultations', 0);
    Post.set('visits', 0);
    Post.set('status', 0);
    Post.set('recommend', 0);

    Post.save().then(function(Post) {
      result = 'success';
      res.json(result);
    }, function(error) {
      result = error;
      res.json(result);
    });
  }

});

router.get('/edit', function(req, res, next){
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
  res.render('topic/add',{
    title: "博士直通车-话题",
    user: req.currentUser.get('nickname'),
    avatar: avatar,
    identity:identity
  });
});

router.get('/detail', function(req, res, next){
  var questionId = req.query.qId;
  //查看数加1
  var post = AV.Object.createWithoutData('Post', questionId);
  post.save().then(function (post) {
    post.increment('visits', 1);
    post.save(true);
    return post.save();
  }).then(function (post) {

  }, function (error) {

  });

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
  var query = new AV.Query('Post');
  query.equalTo('objectId', questionId);
  query.find().then(function (results) {
    res.render('topic/detail',{
      title: "问题详情",
      user: req.currentUser.get('nickname'),
      avatar: avatar,
      identity: identity,
      currentUser: req.currentUser,
      post: results
    });
 }, function (error) {
   res.render('topic/detail',{
     title: "问题详情",
     user: req.currentUser.get('nickname'),
     avatar: avatar,
     identity:identity
   });
 });

});

router.post('/reply',function(req, res, next){
  console.log(req.body);
  var result = '';
  var replyContent = req.body.reply;
  var replyFrom = req.body.replyFrom;
  var replyTo = req.body.replyTo;
  var replyFromName = req.body.replyFromName;
  var replyToName = req.body.replyToName;
  var postId = req.body.postId;

  if(replyContent==''){
    result = "回复内容不能为空";
    res.json(result);
  }else {
    var Reply = AV.Object.extend('Reply');
    var Reply = new Reply();
    Reply.set('replyContent', replyContent);
    Reply.set('replyFrom', replyFrom);
    Reply.set('replyTo', replyTo);
    Reply.set('postId', postId);
    Reply.set('replyToName', replyToName);
    Reply.set('replyFromName', replyFromName);

    Reply.save().then(function(Reply) {
      //回答数加1
      var post = AV.Object.createWithoutData('Post', postId);
      post.save().then(function (post) {
        post.increment('consultations', 1);
        post.save(true);
        return post.save();
      }).then(function (post) {
        result = 'success';
        res.json(result);
      }, function (error) {
        res.json(error);
      });

    }, function(error) {
      res.json(error);
    });
  }


});

module.exports = router;
