var AV = require('leanengine');

AV.init({
  appId: '5xotBbJxhP3gatEpWAWHFwTJ-gzGzoHsz',
  appKey: '3BJrMmVt1j5G8QeKAxqTaI8W',
  masterKey: 'NyHNaEuVIjTa6u8U0MYrUOxn'
});

var app = require('./app');

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3000);
var server = app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);
});
