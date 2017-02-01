var express = require('express');
var router = express.Router();

var AV = require('leanengine');

/* GET home page. */
router.post('/usersOfSelect', function(req, res, next) {
  var result = '';
  var discipline = req.body.discipline;
  var query = new AV.Query('_User');
  query.equalTo('d_disciplinesFields', discipline);
  query.limit(2);
  query.find().then(function (results) {
    result = results;
    console.log(results);
    res.send({result: result});
  }, function (error) {
    result = error.code;
    res.json(result);
  });
 //res.json(discipline);
});

module.exports = router;
