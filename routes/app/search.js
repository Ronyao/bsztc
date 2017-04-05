var express = require('express');
var router = express.Router();

var AV = require('leanengine');

router.get('/:classname', function(req, res, next) {
  var classname = req.params.classname;
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

  if(classname=='topic'){
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
  }else{
    var query = new AV.Query('_User');
    query.contains('nickname',keyword);
    query.count().then(function(count){
      query.limit(12);
      query.skip(12*(currentPage-1));
      query.descending('createdAt');
      var pages = Math.ceil(count/15);
      query.find().then(function (results) {
        res.render('search/wisdom-result',{
          title: "搜索结果",
          user: req.currentUser.get('nickname'),
          avatar: avatar,
          identity: identity,
        });
      }, function (error) {

      });

    }, function(error){

    });
  }

});

// router.post('/usersOfSelect/:page/:num', function(req, res, next) {
//   var discipline = req.body.discipline;
//   var query = new AV.Query('_User');
//   query.descending('createdAt');
// //  query.notEqualTo('isBot',true);
//   query.equalTo('isDoctor',true);
//   if(discipline!='0'){
//     query.equalTo('d_disciplinesFields', discipline);
//   }
//   query.limit(15);
//   query.find().then(function(result){
//     res.json(result);
//   }, function(error){
//     res.json('error');
//   });
// });

router.post('/wisdom/:keyword/page/:num', function(req, res, next){
  var keyword = req.params.keyword;
  var currentPage = req.params.num;
  var query = new AV.Query('_User');
  query.contains('nickname',keyword);
  query.count().then(function(count){
    query.limit(12);
    query.skip(12*(currentPage-1));
    query.descending('createdAt');
    var pages = Math.ceil(count/12);
    query.find().then(function (results) {
      res.json({
        data: results,
        pages: pages
      });
    }, function (error) {

    });

  }, function(error){

  });
});

module.exports = router;
