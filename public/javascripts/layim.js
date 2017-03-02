layui.use('layim', function(layim){
  //基础配置
  layim.config({

    //获取主面板列表信息
    init: {
      url: '' //接口地址（返回的数据格式见下文）
      ,type: 'get' //默认get，一般可不填
      ,data: {} //额外参数
    }

    //配置我的信息（如果设定了该参数，则优先读取该参数，如果没有，这读取init返回的mine信息）
    ,mine: {
      "username": "LayIM体验者" //我的昵称
      ,"id": "100000123" //我的ID
      ,"status": "online" //在线状态 online：在线、hide：隐身
      ,"sign": "在深邃的编码世界，做一枚轻盈的纸飞机" //我的签名
      ,"avatar": "/res/images/a2.jpg" //我的头像
    }
    //获取群员接口
    ,members: {
      url: '' //接口地址（返回的数据格式见下文）
      ,type: 'get' //默认get，一般可不填
      ,data: {} //额外参数
    }

    //上传图片接口（返回的数据格式见下文）
    ,uploadImage: {
      url: '' //接口地址（返回的数据格式见下文）
      ,type: 'post' //默认post
    }

    //上传文件接口（返回的数据格式见下文）
    ,uploadFile: {
      url: '' //接口地址（返回的数据格式见下文）
      ,type: 'post' //默认post
    }

    ,brief: true //是否简约模式（默认false，如果只用到在线客服，且不想显示主面板，可以设置 true）
    ,title: '我的LayIM' //主面板最小化后显示的名称
    ,min: false //用于设定主面板是否在页面打开时，始终最小化展现。默认false，即记录上次展开状态。
    ,minRight: null //【默认不开启】用户控制聊天面板最小化时、及新消息提示层的相对right的px坐标，如：minRight: '200px'
    ,maxLength: 3000 //最长发送的字符长度，默认3000
    ,isfriend: true //是否开启好友（默认true，即开启）
    ,isgroup: true //是否开启群组（默认true，即开启）
    ,right: '0px' //默认0px，用于设定主面板右偏移量。该参数可避免遮盖你页面右下角已经的bar。
    ,chatLog: '/chat/log/' //聊天记录地址（如果未填则不显示）
    ,find: '/find/' //查找好友/群的地址（如果未填则不显示）
    ,copyright: true //是否授权，如果通过官网捐赠获得LayIM，此处可填true
  }).chat({
    name: '博士直通车用户1'
    ,type: 'kefu'
    ,avatar: 'http://tp1.sinaimg.cn/5619439268/180/40030060651/1'
    ,id: -2
  });
  layim.setChatMin();//收缩聊天界面
});
