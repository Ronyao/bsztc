var express = require('express');
var router = express.Router();

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
  res.render('wisdom/index',{
    title: "智库-博士直通车",
    user: req.currentUser.get('nickname'),
    avatar: avatar,
    identity:identity
  });
});

module.exports = router;
