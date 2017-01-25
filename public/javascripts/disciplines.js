/**
 * 时间:2016年11月27日
 * 作者:707200833
 * 说明:依赖与jQuery和layui, 是基于layui开发的一个省市区联动的小插件, 使用上要基于layui的表单进行使用
 */

(function($){
	var dfs = {};

	dfs.keys = {};
	dfs.ckeys = {};

	dfs.init = function(disciplinsFiles, firstDisciplines, secondDisciplines, initprovince, initcity, initarea){//jQuery选择器, 省-市-区
		if(!disciplinsFiles || !$(disciplinsFiles).length) return;
		$(disciplinsFiles).html('');
		$(disciplinsFiles).append('<option selected>学科门类</option>');
		for(var i in citys){
			$(disciplinsFiles).append('<option>'+citys[i].name+'</option>');
			dfs.keys[citys[i].name] = citys[i];
		}
		layui.form('select').render();
		if(initprovince) $(disciplinsFiles).next().find('[lay-value="'+initprovince+'"]').click();
		if(!firstDisciplines || !$(firstDisciplines).length) return;
		dfs.formRender(firstDisciplines);
		layui.form().on('select(disciplinsFiles)', function(data){
		  	var cs = dfs.keys[data.value];
		  	$(firstDisciplines).html('');
		  	$(firstDisciplines).append('<option>一级学科</option>');
		  	if(cs){
				cs = cs.firstDisciplines;
				for(var i in cs){
					$(firstDisciplines).append('<option>'+cs[i].name+'</option>');
					dfs.ckeys[cs[i].name] = cs[i];
				}
				$(firstDisciplines).find('option:eq(1)').attr('selected', true);
		  	}
			layui.form('select').render();
			$(firstDisciplines).next().find('.layui-this').removeClass('layui-this').click();
			dfs.formHidden('disciplinsFiles', data.value);
			$('.dfs-label-disciplinsFiles').html(data.value);//此处可以自己修改 显示的位置, 不想显示可以直接去掉
		});
		if(initprovince) $(disciplinsFiles).next().find('[lay-value="'+initprovince+'"]').click();
		if(initcity) $(firstDisciplines).next().find('[lay-value="'+initcity+'"]').click();
		if(!secondDisciplines || !$(secondDisciplines).length) return;
		dfs.formRender(secondDisciplines);
		layui.form().on('select(firstDisciplines)', function(data){
		  	var cs = dfs.ckeys[data.value];
		  	$(secondDisciplines).html('');
		  	$(secondDisciplines).append('<option>二级学科</option>');
		  	if(cs){
		  		cs = cs.secondDisciplines;
				for(var i in cs){
					$(secondDisciplines).append('<option>'+cs[i]+'</option>');
				}
				$(secondDisciplines).find('option:eq(1)').attr('selected', true);
		  	}
			layui.form('select').render();
			$(secondDisciplines).next().find('.layui-this').removeClass('layui-this').click();
			dfs.formHidden('firstDisciplines', data.value);
			$('.dfs-label-firstDisciplines').html(data.value);	//此处可以自己修改 显示的位置, 不想显示可以直接去掉
		});
		layui.form().on('select(secondDisciplines)', function(data){
			dfs.formHidden('secondDisciplines', data.value);
			$('.dfs-label-secondDisciplines').html(data.value);	//此处可以自己修改 显示的位置, 不想显示可以直接去掉
		});
		if(initprovince) $(disciplinsFiles).next().find('[lay-value="'+initprovince+'"]').click();
		if(initcity) $(firstDisciplines).next().find('[lay-value="'+initcity+'"]').click();
		if(initarea) $(secondDisciplines).next().find('[lay-value="'+initarea+'"]').click();
	}

	dfs.formRender = function(obj){
		$(obj).html('');
		$(obj).append('<option>下级学科</option>');
		layui.form('select').render();
	}

	dfs.formHidden = function(obj, val){
		if(!$('#dfs-hide-'+obj).length)
			$('body').append('<input id="dfs-hide-'+obj+'" type="hidden" value="'+val+'" />');
		else
			$('#dfs-hide-'+obj).val(val);
	}

	var citys =
[
	{"name":"哲学","firstDisciplines":[{"name":"哲学","secondDisciplines":["马克思主义哲学","中国哲学","外国哲学","逻辑学","伦理学","美学","宗教学","科学技术哲学"]}]},
  {"name":"经济学","firstDisciplines":[{"name":"理论经济学","secondDisciplines":["政治经济学","经济思想史","经济史","西方经济学","世界经济","人口、资源与环境经济学"]},{"name":"应用经济学","secondDisciplines":["国民经济学","区域经济学","财政学","金融学","产业经济学","国际贸易学","劳动经济学","统计学","数量经济学","国防经济"]}]},
  {"name":"法学","firstDisciplines":[{"name":"法学","secondDisciplines":["法学理论","法律史","宪法学与行政法学","刑法学","民商法学","诉讼法学","经济法学","环境与资源保护法学","国际法学","军事法学"]},{"name":"政治学","secondDisciplines":["政治学理论","中外政治制度","科学社会主义与国际共产主义运动","中共党史","国际政治","国际关系","外交学"]},{"name":"社会学","secondDisciplines":["社会学","人口学","人类学","民俗学"]},{"name":"民族学","secondDisciplines":["民族学","马克思主义民族理论与政策","中国少数民族经济","中国少数民族史","中国少数民族艺术"]},{"name":"马克思主义理论","secondDisciplines":["马克思主义基本原理","马克思主义发展史","马克思主义中国化研究","国外马克思主义研究","思想政治教育","中国近现代史基本问题研究"]}]},
  {"name":"教育学","firstDisciplines":[{'name':"教育学","secondDisciplines":["教育学原理","课程与教学论","教育史","比较教育学","学前教育学","高等教育学","成人教育学","职业技术教育学","特殊教育学","教育技术学"]},{'name':"心理学","secondDisciplines":["基础心理学","发展与教育心理学","应用心理学"]},{'name':"体育学","secondDisciplines":["体育人文社会学","运动人体科学","体育教育训练学","民族传统体育学"]}]},
  {"name":"文学","firstDisciplines":[{"name":"中国语言文学","secondDisciplines":["文艺学","语言学及应用语言学","汉语言文字学","中国古典文献学","中国古代文学","中国现当代文学","中国少数民族语言文学","比较文学与世界文学"]},{"name":"外国语言文学","secondDisciplines":["英语语言文学","俄语语言文学","法语语言文学","德语语言文学","日语语言文学","印度语言文学","西班牙语语言文学","阿拉伯语语言文学","欧洲语言文学","亚非语言文学","外国语言学及应用语言学"]},{"name":"新闻传播学","secondDisciplines":["新闻学","传播学","广播电视学"]}]},
  {"name":"历史学","firstDisciplines":[{"name":"考古学","secondDisciplines":["考古学及博物馆学"]},{"name":"中国史","secondDisciplines":["史学理论及史学史","历史地理学","历史文献学","专门史","中国古代史","中国近现代史"]}]},
  {"name":"理学","firstDisciplines":[{"name":"数学","secondDisciplines":["基础数学","计算数学","概率论与数理统计","应用数学","运筹学与控制论"]},{"name":"物理学","secondDisciplines":["理论物理","粒子物理与原子核物理","原子与分子物理","等离子体物理","凝聚态物理","声学","光学","无线电物理"]},{"name":"化学","secondDisciplines":["无机化学","分析化学","有机化学","物理化学","高分子化学与物理"]},{"name":"天文学","secondDisciplines":["天体物理","天体测量与天体力学"]},{"name":"地理学","secondDisciplines":["自然地理学","人文地理学","地图学与地理信息系统"]},{"name":"大气科学","secondDisciplines":["气象学","大气物理学与大气环境"]},{"name":"海洋科学","secondDisciplines":["物理海洋学","海洋化学","海洋生物学","海洋地质"]},{"name":"地球物理学","secondDisciplines":["固体地球物理学","空间物理学"]},{"name":"地质学","secondDisciplines":["矿物学、岩石学、矿床学","地球化学","古生物学与地层学","构造地质学","第四纪地质学"]},{"name":"生物学","secondDisciplines":["植物学","动物学","生理学","水生生物学","微生物学","神经生物学","遗传学","发育生物学","细胞生物学","生物化学与分子生物学","生物物理学"]},{"name":"系统科学","secondDisciplines":["系统理论","系统分析与集成"]}]},
  {"name":"工学","firstDisciplines":[{"name":"力学","secondDisciplines":["一般力学与力学基础","固体力学","流体力学","工程力学"]},{"name":"机械工程","secondDisciplines":["机械制造及其自动化","机械电子工程","机械设计及理论","车辆工程"]},{"name":"仪器科学与技术","secondDisciplines":["精密仪器及机械","测试计量技术及仪器"]},{"name":"材料科学与工程","secondDisciplines":["材料物理与化学","材料学","材料加工工程"]},{"name":"冶金工程","secondDisciplines":["冶金物理化学","钢铁冶金","有色金属冶金"]},{"name":"动力工程及工程热物理","secondDisciplines":["工程热物理","热能工程","动力机械及工程","流体机械及工程","制冷及低温工程","化工过程机械"]},{"name":"电气工程","secondDisciplines":["电机与电器","电力系统及其自动化","高电压与绝缘技术","电力电子与电力传动","电工理论与新技术"]},{"name":"电子科学与技术","secondDisciplines":["物理电子学","电路与系统","微电子学与固体电子学","电磁场与微波技术"]},{"name":"信息与通信工程","secondDisciplines":["通信与信息系统","信号与信息处理"]},{"name":"控制科学与工程","secondDisciplines":["控制理论与控制工程","检测技术与自动化装置","系统工程","模式识别与智能系统","导航、制导与控制"]},{"name":"计算机科学与技术","secondDisciplines":["计算机系统结构","计算机软件与理论","计算机应用技术"]},{"name":"建筑学","secondDisciplines":["建筑历史与理论","建筑设计及其理论","建筑技术科学"]},{"name":"土木工程","secondDisciplines":["岩土工程","结构工程","市政工程","供热、供燃气、通风及空调工程","防灾减灾工程及防护工程","桥梁与隧道工程"]},{"name":"水利工程","secondDisciplines":["水文学及水资源","水力学及河流动力学","水工结构工程","水利水电工程","港口、海岸及近海工程"]},{"name":"测绘科学与技术","secondDisciplines":["大地测量学与测量工程","摄影测量与遥感","地图制图学与地理信息工程"]},{"name":"化学工程与技术","secondDisciplines":["化学工程","化学工艺","生物化工","应用化学","工业催化"]},{"name":"地质资源与地质工程","secondDisciplines":["矿产普查与勘探","地球探测与信息技术","地质工程"]},{"name":"矿业工程","secondDisciplines":["采矿工程","矿物加工工程","安全技术及工程"]},{"name":"石油与天然气工程","secondDisciplines":["油气井工程","油气田开发工程","油气储运工程"]},{"name":"纺织科学与工程","secondDisciplines":["纺织工程","纺织材料与纺织品设计","纺织化学与染整工程","服装"]},{"name":"轻工技术与工程","secondDisciplines":["制浆造纸工程","制糖工程","发酵工程","皮革化学与工程"]},{"name":"交通运输工程","secondDisciplines":["道路与铁道工程","交通信息工程及控制","交通运输规划与管理","载运工具运用工程"]},{"name":"船舶与海洋工程","secondDisciplines":["船舶与海洋结构物设计制造","轮机工程","水声工程"]},{"name":"航空宇航科学与技术","secondDisciplines":["飞行器设计","航空宇航推进理论与工程","航空宇航制造工程","人机与环境工程"]},{"name":"兵器科学与技术","secondDisciplines":["武器系统与运用工程","兵器发射理论与技术","火炮、自动武器与弹药工程","军事化学与烟火技术"]},{"name":"核科学与技术","secondDisciplines":["核能科学与工程","核燃料循环与材料","核技术及应用","辐射防护及环境保护"]},{"name":"农业工程","secondDisciplines":["农业机械化工程","农业水土工程","农业生物环境与能源工程","农业电气化与自动化"]},{"name":"林业工程","secondDisciplines":["森林工程","木材科学与技术","林产化学加工工程"]},{"name":"环境科学与工程","secondDisciplines":["环境科学","环境工程"]},{"name":"食品科学与工程","secondDisciplines":["食品科学","粮食、油脂及植物蛋白工程","农产品加工及贮藏工程","水产品加工及贮藏工程"]}]},
  {"name":"农学","firstDisciplines":[{"name":"作物学","secondDisciplines":["作物栽培学与耕作学","作物遗传育种"]},{"name":"园艺学","secondDisciplines":["果树学","蔬菜学","茶学"]},{"name":"农业资源与环境","secondDisciplines":["土壤学","植物营养学"]},{"name":"植物保护","secondDisciplines":["植物病理学","农业昆虫与害虫防治","农药学"]},{"name":"畜牧学","secondDisciplines":["动物遗传育种与繁殖","动物营养与饲料科学","特种经济动物饲养"]},{"name":"兽医学","secondDisciplines":["基础兽医学","预防兽医学","临床兽医学"]},{"name":"林学","secondDisciplines":["林木遗传育种","森林培育","森林保护学","森林经理学","野生动植物保护与利用","园林植物与观赏园艺","水土保持与荒漠化防治"]},{"name":"水产","secondDisciplines":["水产养殖","捕捞学","渔业资源"]}]},
  {"name":"医学","firstDisciplines":[{"name":"基础医学","secondDisciplines":["人体解剖与组织胚胎学","免疫学","病原生物学","病理学与病理生理学","法医学","放射医学"]},{"name":"临床医学","secondDisciplines":["内科学","儿科学","老年医学","神经病学","精神病与精神卫生学","皮肤病与性病学","影像医学与核医学","临床检验诊断学","外科学","妇产科学","眼科学","耳鼻咽喉科学","肿瘤学","康复医学与理疗学","运动医学","麻醉学","急诊医学"]},{"name":"口腔医学","secondDisciplines":["口腔基础医学","口腔临床医学"]},{"name":"公共卫生与预防医学","secondDisciplines":["流行病与卫生统计学","劳动卫生与环境卫生学","营养与食品卫生学","儿少卫生与妇幼保健学","卫生毒理学","军事预防医学"]},{"name":"中医学","secondDisciplines":["中医基础理论","中医临床基础","中医医史文献","方剂学","中医诊断学","中医内科学","中医外科学","中医骨伤科学","中医妇科学","中医儿科学","中医五官科学","针灸推拿学","民族医学"]},{"name":"中西医结合","secondDisciplines":["中西医结合基础","中西医结合临床"]},{"name":"药学","secondDisciplines":["药物化学","药剂学","生药学","药物分析学","微生物与生化药学","药理学"]},{"name":"特种医学","secondDisciplines":["航空、航天与航海医学"]}]},
  {"name":"军事学","firstDisciplines":[{"name":"军事思想及军事历史","secondDisciplines":["军事思想","军事历史"]},{"name":"战略学","secondDisciplines":["军事战略学","战争动员学"]},{"name":"战役学","secondDisciplines":["联合战役学","军种战役学"]},{"name":"战术学","secondDisciplines":["合同战术学","兵种战术学"]},{"name":"军队指挥学","secondDisciplines":["作战指挥学","军事运筹学","军事通信学","军事情报学","密码学"]},{"name":"军制学","secondDisciplines":["军事组织编制学","军队管理学"]},{"name":"军事后勤学","secondDisciplines":["军事后勤学","后方专业勤务"]}]},
  {"name":"管理学","firstDisciplines":[{"name":"工商管理","secondDisciplines":["会计学","企业管理","旅游管理","技术经济及管理"]},{"name":"农林经济管理","secondDisciplines":["农业经济管理","林业经济管理"]},{"name":"公共管理","secondDisciplines":["行政管理","社会医学与卫生事业管理","教育经济与管理","社会保障","土地资源管理"]},{"name":"图书情报与档案管理","secondDisciplines":["图书馆学","情报学","档案学"]}]},
  {"name":"艺术学","firstDisciplines":[{"name":"艺术学理论","secondDisciplines":["艺术学"]},{"name":"音乐与舞蹈学","secondDisciplines":["音乐学","舞蹈学"]},{"name":"戏剧与影视学","secondDisciplines":["戏剧戏曲学","电影学","广播电视艺术学"]},{"name":"美术学","secondDisciplines":["美术学"]},{"name":"设计学","secondDisciplines":["设计艺术学"]}]}
];

	window.dfs = dfs;
	return dfs;
})($);
