var express = require('express');
var router = express.Router();
var AV = require('leanengine');

/* GET home page. */
router.get('/', function(req, res, next) {
  var avatar = req.currentUser.get('avatar');
  var identity = "";
  var users = [];
  if(avatar == 'http://7xnito.com1.z0.glb.clouddn.com/default_avatar.png'){
    avatar = "../res/images/avatar/default.png";
  }
  if(req.currentUser.get('isEnterprise')==true){
    identity = "认证企业";
  }else if (req.currentUser.get('isDoctor')==true) {
    identity = "认证博士";
  }

  var query = new AV.Query('_User');
  query.limit(12);
  query.equalTo('isDoctor',true);
  query.descending('createdAt');
//  query.notEqualTo('isBot',true);
  query.find().then(function (results) {
    res.render('wisdom/index',{
      title: "智库-博士直通车",
      user: req.currentUser.get('nickname'),
      avatar: avatar,
      identity: identity,
      users: results
    });
  }, function (error) {

  });

});

router.post('/discipline/:discipline/page/:num', function(req, res, next) {
  var discipline = req.params.discipline;
  var currentPage = parseInt(req.params.num);
  var query = new AV.Query('_User');
  query.equalTo('isDoctor',true);
  query.notEqualTo('isBot',true);
  query.count().then(function(count){
    var pages = Math.ceil(count/15);
    query.limit(12);
    query.skip(12*(currentPage-1));
    if(discipline!='0'){
      query.equalTo('d_disciplinesFields', discipline);
    }
    query.descending('createdAt');
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
