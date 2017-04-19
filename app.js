var express = require('express');
var fs = require('fs');
//var busboy = require('connect-busboy');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var http = require('http');
var url = require('url');
var alipayf2f = require("./lib/alipay_f2f.js");
var config = require("./config.js");
var AV = require('leanengine');

var index = require('./routes/index');
var users = require('./routes/app/users');
var topic = require('./routes/app/topic');
var wisdom = require('./routes/app/wisdom');
var search = require('./routes/app/search');
var pay = require('./routes/app/pay');
var chat = require('./routes/app/chat');

var app = express();

// view engine setup
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/static', express.static('public'));

// 加载云代码方法
//require('./cloud');
app.use(AV.express());

// 加载 cookieSession 以支持 AV.User 的会话状态
app.use(AV.Cloud.CookieSession({ secret: '05XgTktKPMkU', maxAge: 3600000, fetchUser: true }));

// 强制使用 https
app.enable('trust proxy');
app.use(AV.Cloud.HttpsRedirect());

app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(busboy());

app.use(function (req, res, next) {
  if (req.currentUser) {  // 判断用户是否登录
    next();
  } else {
    // 解析用户请求的路径
    var arr = req.url.split('/');
    // 去除 GET 请求路径上携带的参数
    for (var i = 0, length = arr.length; i < length; i++) {
      arr[i] = arr[i].split('?')[0];
    }
    // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
    if (arr.length > 1 && arr[1] == '' || arr[1] == 'index' || arr[1] == 'contact' || arr[1] == 'about') {
      next();
    } else if (arr.length > 2 && arr[1] == 'users' && (arr[2] == 'reg' || arr[2] == 'regForEmail' || arr[2] == 'login' || arr[2] == 'logout' || arr[2] == 'get_vercode' || arr[2] == 'forget' || arr[2] == 'get_vercode_forget')) {
      next();
    } else {  // 登录拦截
      res.redirect('/users/login');  // 将用户重定向到登录页面
    }
  }
});

app.use((req, res, next) => {
	req.config    = config;
	req.alipayf2f = new alipayf2f(config);

	req.database  = {
		get(id) {
			return new Promise((resolve, reject) => {
				if(!fs.existsSync(`./fs-database/${id}.json`)) {
					return resolve(null);
				}
				fs.readFile(`./fs-database/${id}.json`, function (err, data) {
					if (err) return (reject);
					resolve(JSON.parse(data.toString()));
				});
			});
		},

		delete(id) {
			return new Promise((resolve, reject) => {
				if(!fs.existsSync(`./fs-database/${id}.json`)) {
					return resolve();
				}
				fs.unlink((`./fs-database/${id}.json`, function (err) {
					resolve(data);
				}));
			});
		},

		insert(id, obj) {
			return new Promise((resolve, reject) => {
				if(fs.existsSync(`./fs-database/${id}.json`)) {
					return resolve(false);
				}
				fs.writeFile(`./fs-database/${id}.json`, JSON.stringify(obj), function(err){
					if(err) return reject(err);
					resolve(true);
				});
			});
		},

		update(id, obj) {
			return new Promise((resolve, reject) => {
				fs.writeFile(`./fs-database/${id}.json`, JSON.stringify(obj), function(err){
					if(err) return reject(err);
					resolve(true);
				});
			});
		},
	};
	res.error     = (result) => res.json({ "status": false, message: result });
	res.success   = (result) => res.json({ "status": true, message: result });
	res.catch     = (error) => {
		console.error(error);
		res.json({ "status": false, "message": "服务器错误, 请稍后重试。" }).end();
	};
	next();
});

// 可以将一类的路由单独保存在一个文件中
app.use('/', index);
app.use('/users', users);
app.use('/topic', topic);
app.use('/wisdom', wisdom);
app.use('/search', search);
app.use('/pay', pay);
app.use('/chat', chat);

// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if(!req.currentUser){
    res.render('error', {
      title: "错误页面",
      message: err.message || err,
      error: err,
      user: '',
    });
  }else{
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
    res.render('error', {
      title: "错误页面",
      message: err.message || err,
      error: err,
      user: req.currentUser.get('nickname'),
      avatar: avatar,
      identity:identity,
    });
  }

});
// 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message || err,
//       error: err
//     });
//   });
// }
//
// // 如果是非开发环境，则页面只输出简单的错误信息
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message || err,
//     error: {},
//     user: req.currentUser
//   });
// });

module.exports = app;
