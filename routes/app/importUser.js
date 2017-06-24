var express = require('express');
var router = express.Router();
var AV = require('leanengine');
//var sleep = require('sleep');

/* GET home page. */
// router.get('/:num',function(req,res,next){
//   var num = parseInt(req.params.num);
//   //var num = req.params.num;
//
//   var fs = require('fs');
//   fs.readFile('professor.json',function(err,data){
//     if(err)
//       throw err;
//
//     var jsonObj=JSON.parse(data);
//     //console.log(jsonObj[]);
//     var User = AV.Object.extend('_User');
//     //size=jsonObj.length
//         var i = num;
//
//         var user = new User();
//         var record = jsonObj[i];
//         user.set('nickname', record['name']);
//         user.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user.set('sex', 0);
//         }
//         user.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user.set('username',username);
//         user.set('d_chatPrice',1)
//         user.set('d_callPrice',1);
//         user.set('isImport',true);
//         user.set('isBot',true);
//         user.set('password','bsztc2017');
//         user.set('isDoctor',true);
//         user.set('province','广东省');
//         user.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user1 = new User();
//         var record = jsonObj[i+1];
//         user1.set('nickname', record['name']);
//         user1.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user1.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user1.set('sex', 0);
//         }
//         user1.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user1.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user1.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user1.set('username',username);
//         user1.set('d_chatPrice',1)
//         user1.set('d_callPrice',1);
//         user1.set('isImport',true);
//         user1.set('isBot',true);
//         user1.set('password','bsztc2017');
//         user1.set('isDoctor',true);
//         user1.set('province','广东省');
//         user1.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user2 = new User();
//         var record = jsonObj[i+2];
//         user2.set('nickname', record['name']);
//         user2.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user2.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user2.set('sex', 0);
//         }
//         user2.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user2.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user2.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user2.set('username',username);
//         user2.set('d_chatPrice',1)
//         user2.set('d_callPrice',1);
//         user2.set('isImport',true);
//         user2.set('isBot',true);
//         user2.set('password','bsztc2017');
//         user2.set('isDoctor',true);
//         user2.set('province','广东省');
//         user2.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user3 = new User();
//         var record = jsonObj[i+3];
//         user3.set('nickname', record['name']);
//         user3.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user3.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user3.set('sex', 0);
//         }
//         user3.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user3.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user3.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user3.set('username',username);
//         user3.set('d_chatPrice',1)
//         user3.set('d_callPrice',1);
//         user3.set('isImport',true);
//         user3.set('isBot',true);
//         user3.set('password','bsztc2017');
//         user3.set('isDoctor',true);
//         user3.set('province','广东省');
//         user3.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user4 = new User();
//         var record = jsonObj[i+4];
//         user4.set('nickname', record['name']);
//         user4.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user4.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user4.set('sex', 0);
//         }
//         user4.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user4.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user4.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user4.set('username',username);
//         user4.set('d_chatPrice',1)
//         user4.set('d_callPrice',1);
//         user4.set('isImport',true);
//         user4.set('isBot',true);
//         user4.set('password','bsztc2017');
//         user4.set('isDoctor',true);
//         user4.set('province','广东省');
//         user4.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user5 = new User();
//         var record = jsonObj[i+5];
//         user5.set('nickname', record['name']);
//         user5.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user5.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user5.set('sex', 0);
//         }
//         user5.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user5.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user5.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user5.set('username',username);
//         user5.set('d_chatPrice',1)
//         user5.set('d_callPrice',1);
//         user5.set('isImport',true);
//         user5.set('isBot',true);
//         user5.set('password','bsztc2017');
//         user5.set('isDoctor',true);
//         user5.set('province','广东省');
//         user5.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user6 = new User();
//         var record = jsonObj[i+6];
//         user6.set('nickname', record['name']);
//         user6.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user6.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user6.set('sex', 0);
//         }
//         user6.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user6.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user6.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user6.set('username',username);
//         user6.set('d_chatPrice',1)
//         user6.set('d_callPrice',1);
//         user6.set('isImport',true);
//         user6.set('isBot',true);
//         user6.set('password','bsztc2017');
//         user6.set('isDoctor',true);
//         user6.set('province','广东省');
//         user6.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user7 = new User();
//         var record = jsonObj[i+7];
//         user7.set('nickname', record['name']);
//         user7.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user7.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user7.set('sex', 0);
//         }
//         user7.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user7.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user7.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user7.set('username',username);
//         user7.set('d_chatPrice',1)
//         user7.set('d_callPrice',1);
//         user7.set('isImport',true);
//         user7.set('isBot',true);
//         user7.set('password','bsztc2017');
//         user7.set('isDoctor',true);
//         user7.set('province','广东省');
//         user7.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user8 = new User();
//         var record = jsonObj[i+8];
//         user8.set('nickname', record['name']);
//         user8.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user8.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user8.set('sex', 0);
//         }
//         user8.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user8.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user8.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user8.set('username',username);
//         user8.set('d_chatPrice',1)
//         user8.set('d_callPrice',1);
//         user8.set('isImport',true);
//         user8.set('isBot',true);
//         user8.set('password','bsztc2017');
//         user8.set('isDoctor',true);
//         user8.set('province','广东省');
//         user8.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user9 = new User();
//         var record = jsonObj[i+9];
//         user9.set('nickname', record['name']);
//         user9.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user9.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user9.set('sex', 0);
//         }
//         user9.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user9.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user9.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user9.set('username',username);
//         user9.set('d_chatPrice',1)
//         user9.set('d_callPrice',1);
//         user9.set('isImport',true);
//         user9.set('isBot',true);
//         user9.set('password','bsztc2017');
//         user9.set('isDoctor',true);
//         user9.set('province','广东省');
//         user9.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user10 = new User();
//         var record = jsonObj[i+10];
//         user10.set('nickname', record['name']);
//         user10.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user10.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user10.set('sex', 0);
//         }
//         user10.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user10.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user10.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user10.set('username',username);
//         user10.set('d_chatPrice',1)
//         user10.set('d_callPrice',1);
//         user10.set('isImport',true);
//         user10.set('isBot',true);
//         user10.set('password','bsztc2017');
//         user10.set('isDoctor',true);
//         user10.set('province','广东省');
//         user10.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user11 = new User();
//         var record = jsonObj[i+11];
//         user11.set('nickname', record['name']);
//         user11.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user11.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user11.set('sex', 0);
//         }
//         user11.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user11.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user11.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user11.set('username',username);
//         user11.set('d_chatPrice',1)
//         user11.set('d_callPrice',1);
//         user11.set('isImport',true);
//         user11.set('isBot',true);
//         user11.set('password','bsztc2017');
//         user11.set('isDoctor',true);
//         user11.set('province','广东省');
//         user11.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user12 = new User();
//         var record = jsonObj[i+12];
//         user12.set('nickname', record['name']);
//         user12.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user12.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user12.set('sex', 0);
//         }
//         user12.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user12.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user12.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user12.set('username',username);
//         user12.set('d_chatPrice',1)
//         user12.set('d_callPrice',1);
//         user12.set('isImport',true);
//         user12.set('isBot',true);
//         user12.set('password','bsztc2017');
//         user12.set('isDoctor',true);
//         user12.set('province','广东省');
//         user12.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user13 = new User();
//         var record = jsonObj[i+13];
//         user13.set('nickname', record['name']);
//         user13.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user13.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user13.set('sex', 0);
//         }
//         user13.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user13.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user13.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user13.set('username',username);
//         user13.set('d_chatPrice',1)
//         user13.set('d_callPrice',1);
//         user13.set('isImport',true);
//         user13.set('isBot',true);
//         user13.set('password','bsztc2017');
//         user13.set('isDoctor',true);
//         user13.set('province','广东省');
//         user13.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user14 = new User();
//         var record = jsonObj[i+14];
//         user14.set('nickname', record['name']);
//         user14.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user14.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user14.set('sex', 0);
//         }
//         user14.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user14.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user14.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user14.set('username',username);
//         user14.set('d_chatPrice',1)
//         user14.set('d_callPrice',1);
//         user14.set('isImport',true);
//         user14.set('isBot',true);
//         user14.set('password','bsztc2017');
//         user14.set('isDoctor',true);
//         user14.set('province','广东省');
//         user14.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user15 = new User();
//         var record = jsonObj[i+15];
//         user15.set('nickname', record['name']);
//         user15.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user15.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user15.set('sex', 0);
//         }
//         user15.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user15.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user15.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user15.set('username',username);
//         user15.set('d_chatPrice',1)
//         user15.set('d_callPrice',1);
//         user15.set('isImport',true);
//         user15.set('isBot',true);
//         user15.set('password','bsztc2017');
//         user15.set('isDoctor',true);
//         user15.set('province','广东省');
//         user15.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user16 = new User();
//         var record = jsonObj[i+16];
//         user16.set('nickname', record['name']);
//         user16.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user16.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user16.set('sex', 0);
//         }
//         user16.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user16.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user16.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user16.set('username',username);
//         user16.set('d_chatPrice',1)
//         user16.set('d_callPrice',1);
//         user16.set('isImport',true);
//         user16.set('isBot',true);
//         user16.set('password','bsztc2017');
//         user16.set('isDoctor',true);
//         user16.set('province','广东省');
//         user16.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user17 = new User();
//         var record = jsonObj[i+17];
//         user17.set('nickname', record['name']);
//         user17.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user17.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user17.set('sex', 0);
//         }
//         user17.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user17.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user17.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user17.set('username',username);
//         user17.set('d_chatPrice',1)
//         user17.set('d_callPrice',1);
//         user17.set('isImport',true);
//         user17.set('isBot',true);
//         user17.set('password','bsztc2017');
//         user17.set('isDoctor',true);
//         user17.set('province','广东省');
//         user17.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user18 = new User();
//         var record = jsonObj[i+18];
//         user18.set('nickname', record['name']);
//         user18.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user18.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user18.set('sex', 0);
//         }
//         user18.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user18.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user18.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user18.set('username',username);
//         user18.set('d_chatPrice',1)
//         user18.set('d_callPrice',1);
//         user18.set('isImport',true);
//         user18.set('isBot',true);
//         user18.set('password','bsztc2017');
//         user18.set('isDoctor',true);
//         user18.set('province','广东省');
//         user18.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var user19 = new User();
//         var record = jsonObj[i+19];
//         user19.set('nickname', record['name']);
//         user19.set('d_realName', record['name']);
//         if(record['sex']=='男'){
//           user19.set('sex', 1);
//         }else if(record['sex']=='女'){
//           user19.set('sex', 0);
//         }
//         user19.set('d_secondDisciplines',record['profession']);
//         if(record['introduction']!=null){
//           user19.set('d_introduction', record['introduction'].substring(0,150));
//         }
//
//         user19.set('city',"广州市");
//         var username = "111";
//         var jschar = ['0','1','2','3','4','5','6','7','8','9'];
//         for(var j=0; j<8; j++){
//           var id = Math.floor(Math.random()*10);
//           username += jschar[id];
//         }
//         user19.set('username',username);
//         user19.set('d_chatPrice',1)
//         user19.set('d_callPrice',1);
//         user19.set('isImport',true);
//         user19.set('isBot',true);
//         user19.set('password','bsztc2017');
//         user19.set('isDoctor',true);
//         user19.set('province','广东省');
//         user19.set('avatar','http://ac-6Yy7y0rY.clouddn.com/w50cbAZiVMbeu7wvQU4m1kKpRQTzoe0F9ujCS3eZ.jpeg');
//
//         var usergroup = [user,user1,user2,user3,user4,user5,user6,user7,user8,user9,user10,user11,user12,user13,user14,user15,user16,user17,user18,user19];
//         AV.Object.saveAll(usergroup);
//         //user.save();
//       });
//     console.log(num);
//     sleep.sleep(1);
//     num=num+20;
//     //num++;
//     res.redirect(302,'/importUser/'+num);
// });

module.exports = router;
