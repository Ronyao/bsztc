var express = require('express');
var router = express.Router();

var AV = require('leanengine');

router.get('/', function(req, res, next) {
  var keyword = req.query.keyword;
  var currentPage = 1;
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

  // var titleQuery = new AV.Query('Post');
  // titleQuery.contains('title',keyword);
  // var nameQuery = new AV.Query('Post');
  // nameQuery.contains('questionerNickName',keyword);
  // var query = AV.Query.or(titleQuery, nameQuery);
  var query = new AV.Query('Post');
  query.contains('title',keyword);
  query.count().then(function(count){
    query.limit(15);
    query.skip(15*(currentPage-1));
    query.descending('createdAt');
    var pages = Math.ceil(count/15);
    query.find().then(function (results) {
      res.render('search/topic-result',{
        title: "搜索结果",
        user: req.currentUser.get('nickname'),
        avatar: avatar,
        identity: identity,
        posts: results,
        maxpage: pages,
        currentPage: currentPage
      });
    }, function (error) {

    });

  }, function(error){

  });
});

module.exports = router;
