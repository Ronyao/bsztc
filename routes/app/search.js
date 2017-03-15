var express = require('express');
var router = express.Router();

var AV = require('leanengine');

router.get('/', function(req, res, next) {
  var keyword = req.query.keyword;

  var titleQuery = new AV.Query('Post');
  titleQuery.contains('title',keyword);
  var nameQuery = new AV.Query('Post');
  nameQuery.contains('questionerNickName',keyword);
  var query = AV.Query.or(titleQuery, nameQuery);
  query.find().then(function(results){
    console.log(results.length);
  }, function(error){

  });
  res.render('index');
});

module.exports = router;
