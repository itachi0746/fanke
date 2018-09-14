localStorage.loginjson = (localStorage && localStorage.loginjson && localStorage.loginjson.indexOf("{") !== -1) ? localStorage.loginjson : "";

var ai = (function () {
	// "use strict"

	var h5Url = '';
	var adminUrl = '';
	var apiUrl = '';
	var apiUrl1 = '';
	var actUrl = '';
	var eleCouponsUrl = '';
	var httpsUrl = '';
	var searchUrl = '';

	if (location.href.indexOf('//lnyph5.vpclub.cn') > -1) {
		//正式配置
		h5Url = 'https://lnyph5.vpclub.cn/';
		adminUrl = 'https://lnypadmin.vpclub.cn';
		apiUrl = 'https://lnyp.vpclub.cn/api/1.0/';
		apiUrl1 = 'https://lnyp.vpclub.cn/';
		actUrl = 'https://active.vpclub.cn/api/1.0/';
		eleCouponsUrl = 'https://econponsapi.vpclub.cn/api/1.0/';
		httpsUrl = 'https://lnyp.vpclub.cn/api/1.0/';
		searchUrl = 'https://search-lingnan.vpclub.cn/api/1.0/';
	} else if (location.href.indexOf('//mir-lnyph5.vpclub.cn') > -1) {
		//新镜像配置
		h5Url = 'https://mir-lnyph5.vpclub.cn/';
		adminUrl = 'https://mir-lnypadmin.vpclub.cn/';
		apiUrl = 'https://mir-lnyp.vpclub.cn/api/1.0/';
		apiUrl1 = 'https://mir-lnyp.vpclub.cn/';
		actUrl = 'https://mir-active.vpclub.cn/api/1.0/';
		eleCouponsUrl = 'https://econponsapi.vpclub.cn/api/1.0/';
		httpsUrl = 'https://mir-lnyp.vpclub.cn/api/1.0/';
		searchUrl = 'https://mir-lnypadmin.vpclub.cn/api/1.0/';
	} else {
		//新的测试环境
		h5Url = 'http://test-lnyph5.vpclub.cn/';
		adminUrl = 'https://test-lnypadmin.vpclub.cn/';
		apiUrl = 'http://183.234.213.2:40053/api/';
		apiUrl1 = 'http://test-lnyp.vpclub.cn/api/1.0/';
		actUrl = 'https://test-active.vpclub.cn/api/1.0';
		eleCouponsUrl = 'https://testelectronic.vpclub.cn/api/1.0/';
		httpsUrl = 'https://test-lnyp.vpclub.cn/api/1.0/';
		searchUrl = 'https://test-search-lingnan.vpclub.cn/api/1.0/';
	}

	//核心对象
	var ai = {};

	//基础方法
	var method = function (name, fun) {
		Object.defineProperty(ai, name, {
			get: function () {
				return fun;
			}
		})
	}

	//原生扩展
	Element.prototype.obj = null;
	//配置物流url
	ai.logisticalUrl = h5Url;
	//配置图片上传服务器地址
	ai.uploadFileUrl = adminUrl;
	//图形验证码
	ai.apihost = apiUrl1;
	//官方店id
	ai.officialStore = 10375879;
	//图片域名
	ai.imgBase = 'https://vpclub-img.oss-cn-shenzhen.aliyuncs.com' //图片链接域名


	method('ajaxTool', {
		baseurl1: apiUrl,
		baseurl2: actUrl,
		baseurl4: eleCouponsUrl,
		baseurl5: httpsUrl,
		baseurl6: searchUrl,
		baseurl3: '', //自定义请求接口
		publicdata: function () {
			return { //公共参数
				token: localStorage.lnyptoken || sessionStorage.getItem('lnyptoken'), //解决ios在back后localStorage取不到值
				v: 470,
				origin: 4,
				appkey: 100000058,
				digest: '0F8E2175FAC34A0476ADC3B20D0D5B50',
				timestamp: ai.getTimestamp(),
				channelcode: ai.GetQueryString('channelcode') ? ai.GetQueryString('channelcode') : '0',
			};
		},
		requests: [], //请求记录
	});

	//ajax等待数据库数组
	method('ajaxdbarr', {
		arr: [],
		par: [],
		add: function (http, formstr) {
			this.arr.push(http);
			this.par.push(formstr);
		},
		send: function () {
			for (var i = 0; i < this.arr.length; i++) {
				this.arr[i].send(this.par[i]);
			}
		}
	});

	//模板缓存
	method('repeatcache', {
		data: {},
		add: function (k, tem) {
			this.data[k] = tem;
		},
		get: function (k) {
			return this.data[k];
		}
	});

	//数据库配置
	method('database', {
		name: 'aidedb', //数据库名称
		version: 1, //数据库版本号
		db: null, //数据库对象
		tabname: 'response', //需要创建的数据库表数组
		keyname: 'urlkey', //数据库表对应的key值名称
		find: function () {}, //数据库表查询方法
		add: function () {}, //数据库表添加方法
	});

	//创建和连接数据库方法
	method('createdb', function () {
		var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
		if (indexedDB != undefined) {
			var opendb = indexedDB.open(ai.database.name);
			opendb.onupgradeneeded = function (evt) {
				//建表   
				var db = evt.target.result;
				var tabname = ai.database.tabname;
				if (!db.objectStoreNames.contains(tabname)) {
					db.createObjectStore(tabname, {
						keyPath: ai.database.keyname
					});
				}
			}
			opendb.onsuccess = function (evt) {
				ai.database.db = evt.target.result;

				//定义添加
				ai.database.add = function (data) {
					var tx = ai.database.db.transaction('response', 'readwrite');
					var store = tx.objectStore('response');
					store.put(data);
				}

				//定义查询
				ai.database.find = function (value, fun) {
					var tx = ai.database.db.transaction('response', 'readwrite');
					var store = tx.objectStore('response');
					store.get(value).onsuccess = function (evt) {
						fun(evt.target.result);
					};
				}
				ai.ajaxdbarr.send();
			}
			opendb.onerror = function () {
				ai.database.db = '数据库连接或创建失败!';
				ai.ajaxdbarr.send();
			}
		} else {
			ai.database.db = false;
			ai.ajaxdbarr.send();
		}
	});

	//列表输出
	/*
	 * view: 列表容器
	 * arr: 绑定的数组
	 * fun: 循环的方法param1,param2(视图模板, 数组对象);
	 * 
	 */
	method('repeat', function (data) {
		var k = data.view.getAttribute('repeat');
		var view = ai.repeatcache.get(k);
		if (data.arr == null) {
			data.arr = [];
		}
		
		data.arr = data.arr ? data.arr : [];
		if(data.flag){//重新请求接口前清空数据
			data.view.innerHTML ='';
		}
		for (var i = 0; i < data.arr.length; i++) {
			var tem = view.cloneNode(true);
			tem.obj = data.arr[i];
			data.fun(tem, data.arr[i]);	// if(data.flag) {
		// 	data.view.template = ''
		// }
			data.view.appendChild(tem);
		}
	});

	//新的列表输出
	/*
	 * view: 列表容器
	 * arr: 绑定的数组
	 * fun: 循环的方法param1,param2(视图模板, 数组对象);
	 * 
	 */

	method('repeat2', function (data) {
		var appendItem;
		
		if (!data.view.template) {
			data.view.template = data.view.firstElementChild.cloneNode(true);
			data.view.innerHTML = '';
		}
		data.arr = data.arr ? data.arr : [];
		if(data.flag){//重新请求接口前清空数据
			data.view.innerHTML ='';
		}
		for (var i = 0; i < data.arr.length; i++) {
			appendItem = null

			appendItem = data.view.template.cloneNode(true);

			appendItem.obj = data.arr[i]

			data.fun(appendItem, data.arr[i], i)
	
			data.view.appendChild(appendItem);
			}


		
	});

	/*
	 * 初始化页面repeat模板
	 */
	method('initrepeat', function () {
		var views = document.querySelectorAll('[repeat]');
		for (var i = 0; i < views.length; i++) {
			var k = views[i].getAttribute('repeat');
			if (k == '' || k == null) {
				console.log('repeat属性未设置值');
				return false;
			} else {
				var view = views[i].firstElementChild;
				ai.repeatcache.add(k, view);
				views[i].removeChild(view);
			}
		}
	})

	/*
	 * 获取弹出框相关的资源，并设置对应的事件
	 */

	method('pubGetLogin', function (fn) {
		var loadingNew = document.getElementsByClassName('loadingNew')[0];
		if (loadingNew) {
			loadingNew.style.display = 'none';
		}
		localStorage.loginToUrl = location.href;

		ai.confirm2({
			title: '登录提示',
			desc: '是否前往登录页面？',
			btnYTxt: '是',
			funY: function () {
				if (document.getElementsByClassName('confirm2Box')[0]) {
					document.getElementsByClassName('confirm2Box')[0].style.display = 'none'
				}
				if (location.href.indexOf('orderCenter.html') > -1 || location.href.indexOf('confirmPay.html') > -1 || location.href.indexOf('forLottery.html') > -1 || location.href.indexOf('selfHelp/index.html') > -1) {
					localStorage.refreshOrderCenter = true;
				}
				location.href = ai.forward(location.protocol + '//' + location.host + '/lnyp/templates/login/login.html');
			},
			btnNTxt: '否',
			funN: function () {
				localStorage.removeItem('loginToUrl')
				if (document.getElementsByClassName('confirm2Box')[0]) {
					document.getElementsByClassName('confirm2Box')[0].style.display = 'none'
				}
			}
		})
	});

	//获取验证码
	//method('getVerCode', function(inputEle, ele, oldClass, newClass, otherEle, OOClass, ONClass, txt, type, ImgCEle, isChangeF, isYidong, fun) {

	method('getVerCode', function (data) {
		var phonenumber = data.inputEle.value;

		if (phonenumber == '') {
			ai.cue('请输入手机号码');
			return false;
		}

		if (!/\D/.test(phonenumber) && /^\d{11}$/.test(phonenumber)) {
			if (data.ele.dataset.lock == 'off') {
				return false;
			}

			data.ele.dataset.lock = 'off';
			if (data.otherEle) {
				data.otherEle.dataset.lock = 'off';
			}

			var timeout = 60;
			var isToken = data.type == 3 ? true : false;
			var pushData = {
				smstype: data.type,
				phonenumber: phonenumber
			}
			var url = 'SmsServer/SMS/SendSmsCode';
			if (data.ImgCEle.offsetWidth != 0) {
				pushData.ischeck = 1;
				pushData.vcode = data.ImgCEle.value;
			}
			if (data.isYidong) {
				pushData = {
					username: phonenumber,
					vcode: data.ImgCEle.value
				}
				url = 'StoreServer/Store/GetSmsCodeH5';
			}
			ai.post({
				url: url,
				token: isToken,
				v: false,
				origin: false,
				data: pushData,
				load: function (json) {
					if (json.ResultCode == 1000) {
						if (data.isYidong) {
							localStorage.removeItem('lnypCMCCSMS')
						} else {
							localStorage.removeItem('lnypOwnSMS')
						}

						var timeTxt = data.isChangeF ? '秒后重新获取' : 'S重发';
						data.ele.className = data.newClass;
						if (data.otherEle) {
							data.otherEle.className = data.ONClass;
						}
						//						if(data.isChangeF) {
						//							data.ele.style.fontSize = '0.22rem';
						//						}
						if (data.ele.lastElementChild) {
							data.ele.lastElementChild.innerText = timeout + timeTxt;
						} else {
							data.ele.innerText = timeout + timeTxt;
						}
						timeout--;
						clearInterval(ai.inter);
						ai.inter = setInterval(function () {
							data.ele.className = data.newClass;
							if (data.otherEle) {
								data.otherEle.className = data.ONClass;
							}
							if (data.isChangeF) {
								data.ele.style.fontSize = '0.22rem';
							}
							if (data.ele.lastElementChild) {
								data.ele.lastElementChild.innerText = timeout + timeTxt;
							} else {
								data.ele.innerText = timeout + timeTxt;
							}

							if (timeout-- == 0) {
								clearInt(ai.inter, data.ele, data.oldClass, data.txt, data.isChangeF);
								if (data.otherEle) {
									data.otherEle.className = data.OOClass;
									data.otherEle.dataset.lock = 'on';
								}

							}
						}, 1000);
					} else {
						data.ele.dataset.lock = 'on';
						if (data.otherEle) {
							data.otherEle.dataset.lock = 'on';
						}

					}
					ai.cue(json.Message);
					if (json.ResultCode == 11000 || json.ResultCode == 11001) {
						if (data.isYidong) {
							localStorage.lnypCMCCSMS = phonenumber
						} else {
							localStorage.lnypOwnSMS = phonenumber
						}
					}
					data.fun && data.fun(json)
				}
			})
		} else {
			ai.cue('手机号码格式不对');
		}

		function clearInt(inte, ele, className, txt, isChangeF) {
			clearInterval(inte);
			ele.dataset.lock = 'on';
			if (isChangeF) {
				ele.style.fontSize = '0.3rem';
			}
			if (ele.lastElementChild) {
				ele.lastElementChild.innerText = txt;
			} else {
				ele.innerText = txt;
			}
			ele.className = className;
		}
	})

	//手机验证码验证
	method('pubNext', function (phonenumber, veriycode, whereClick, fn) {
		ai.post({
			url: 'SmsServer/SMS/VerifySignCode',
			data: {
				signcode: veriycode,
				phonenumber: phonenumber
			},
			load: function (json) {
				if (whereClick == 'both' && ai.aside) {
					ai.aside.click();
				}
				if (json.ResultCode == 1000) {
					if (whereClick == 'yes' && ai.aside) {
						ai.aside.click();
					}
					fn(json);
				} else {
					if (whereClick == 'no' && ai.aside) {
						ai.aside.click();
					}
					ai.cue(json.Message);
				}
			}
		});
	})

	//登录方法
	method('pubLogin', function (username, password, fn, option) {
		var data = {
				username: username,
				ischeck: 0
			},
			url;

		if (option && option.citycode) {
			data.cityCode = option.citycode;
		}

		if (ai.GetQueryString('storeMasterId')) {
			data.storeMasterId = ai.GetQueryString('storeMasterId');
		}
		if (option && option.smscode) {
			data.smscode = option.smscode;
			if (option.isYidong) {
				url = 'StoreServer/Store/LoginSmsCodeH5';
			} else {
				url = 'StoreServer/Store/LoginWithMessage';
			}
		} else {
			data.password = password;
			url = 'StoreServer/Store/VerifyAccount';
		}

		if (option && option.imgcode) {
			data.ischeck = 1;
			data.vcode = option.imgcode;
		}
		ai.post({
			url: url,
			data: data,
			baseURL: 5,
			token: false,
			load: function (json) {
				if (ai.aside) {
					ai.aside.click();
				}
				if (json.ResultCode == 1000) {

					sessionStorage.removeItem('lnypBanner') //清除商城的广告缓存，切换登录状态后广告会区分显示地市广告

					var login_sms = document.getElementById('loginNew');
					if (login_sms) {
						login_sms.style.display = 'none';
					}

					var phone = username.split('').reverse().join('');
					phone = Base64.decode(phone);

					ai.appLogin({
						'userName': phone
					}) //调用客户端登录

					localStorage.lnyptoken = json.Data.token;
					localStorage.loginjson = JSON.stringify({
						storeLogo: json.Data.storeLogo,
						storeName: json.Data.storeName ? json.Data.storeName : phone + '的店铺',
						phone: phone,
						storeId: json.Data.id,
						UserId: json.Data.storeMasterId,
						nickName: json.Data.nickName ? json.Data.nickName : phone,
						isNew: json.Data.isNew
					});
					sessionStorage.setItem('lnyptoken', json.Data.token); //解决ios在back后localStorage取不到值
					sessionStorage.setItem('loginjson', localStorage.loginjson);
					localStorage.removeItem('LoginFCount');

					//数极客
					ai.shujike('login_succeed', {
						'd_uid': phone
					});
					fn(json);
				} else {

					if (json.ResultCode == 1008 || json.ResultCode == 1005) {
						localStorage.LoginFCount = !localStorage.LoginFCount ? 1 : parseInt(localStorage.LoginFCount) + 1;
						if (parseInt(localStorage.LoginFCount) >= 3) {
							if (document.getElementsByClassName('imgCode')[0]) {
								document.getElementsByClassName('imgCode')[0].style.display = 'block';
							}

							var login_pass = document.getElementById('login');
							if (login_pass && login_pass.getElementsByClassName('veriycodeBox')[0]) {
								login_pass.getElementsByClassName('veriycodeBox')[0].style.display = 'block';
							}
						}
					}
					ai.cue(json.Message);
				}
				option.errorFn && option.errorFn(json);
			}
		})

	});

	/*
	 * POST方法
	 * url:请求地址
	 * data:元数据
	 * db:是否请求数据库
	 * load:成功响应方法
	 */
	method('post', function (data) {

		//用数组记录阻止重复异步提交
		var urlkey = data.url + ai.dataToForm(data.data);
		var requestsStr = ai.ajaxTool.requests.join('@@');
		if (requestsStr.indexOf(urlkey) != -1 && urlkey.indexOf('ElectronicCoupons/GetECouponPayResult') == -1) {
			return false;
		} else {
			ai.ajaxTool.requests.push(urlkey);
		}

		//组装请求表单
		var publicdata = ai.ajaxTool.publicdata();
		if (data.token == false) {
			delete publicdata.token;
		}
		if (data.v == false) {
			delete publicdata.v;
		}
		if (data.origin == false) {
			delete publicdata.origin;
		}
		if (data.isNonce) {
			publicdata.nonce = Math.floor(Math.random() * 9000000 + 1000000);
			publicdata.digest = getDigFn(publicdata.timestamp, publicdata.v, publicdata.origin, publicdata.nonce);

		}
		if (location.href.indexOf('bindingWX') != -1) {
			publicdata.v = 431;
		}
		if (data.baseURL == 2) {
			ai.ajaxTool.baseurl = ai.ajaxTool.baseurl2;
		} else if (data.baseURL == 99) {
			ai.ajaxTool.baseurl = ai.ajaxTool.baseurl3;
		} else if (data.baseURL == 4) {
			ai.ajaxTool.baseurl = ai.ajaxTool.baseurl4;
		} else if (data.baseURL == 5) {
			ai.ajaxTool.baseurl = ai.ajaxTool.baseurl5;
		} else if (data.baseURL == 6) {
			ai.ajaxTool.baseurl = ai.ajaxTool.baseurl6;
		} else {
			ai.ajaxTool.baseurl = ai.ajaxTool.baseurl1;
		}
		for (var k in publicdata) {
			data.data[k] = publicdata[k];
		}

		var formstr = ai.dataToForm(data.data);

		var http = new XMLHttpRequest();
		if (data.isSyn == 1) {
			http.open('POST', ai.ajaxTool.baseurl + data.url, false);
		} else {
			http.open('POST', ai.ajaxTool.baseurl + data.url, true);
		}

		http.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

		http.onloadstart = function () {
			if (data.db == true) {
				ai.database.find(urlkey, function (json) {
					if (json != undefined) {
						console.log('命中数据库: ' + urlkey);
						data.load(json);
					}
				});
			}
		}
		http.onload = function () {
			data.load(JSON.parse(this.responseText))
		}
		http.onloadend = function () {
			if (this.responseText == '' || typeof (JSON.parse(this.responseText)) != "object") {
				var json = {};
			} else {
				var json = JSON.parse(this.responseText);
			}

			//重置url的阻止请求
			for (var i = 0; i < ai.ajaxTool.requests.length; i++) {
				if (ai.ajaxTool.requests[i] == urlkey) {
					ai.ajaxTool.requests.splice(i, 1);
				}
			}

			//保存响应数据到数据库
			json.urlkey = urlkey;
			ai.database.add(json);

			//判断登录失效
			if (json.ResultCode == 1009 && urlkey.indexOf('StoreServer/Store/CheckToken') == -1 && location.href.indexOf('springpromotion.html') == -1 && location.href.indexOf('invitation.html') == -1 && location.href.indexOf('registerSend_86.html') == -1 && location.href.indexOf('huanlesong') == -1 && location.href.indexOf('game.html') == -1) {
				localStorage.removeItem('loginjson');
				localStorage.removeItem('lnyptoken');
				ai.pubGetLogin();
			}
		}
		if (data.db == true && ai.database.db == null) {
			ai.ajaxdbarr.add(http, formstr);
		} else {
			http.send(formstr);
		}
	});

	//元数据转ajax表单数据
	method('dataToForm', function (data) {
		var arg = '';
		for (var key in data) {
			arg += key + '=' + data[key] + '&';
		}
		arg = arg.substr(0, (arg.length - 1));
		return arg;
	})

	//页面就绪方法
	method('ready', function (fun) {
		fun = typeof (fun) === 'function' ? fun : function () {
			return false;
		};
		if (document.readyState == 'complete') {
			fun();
		} else {
			document.addEventListener('readystatechange', function () {
				if (document.readyState == 'complete') {
					fun();
				}
			})
		};
	});

	//aide的load事件发生方法
	method('load', function () {

		try {
			window.addEventListener('pageshow', function (e) {
				if (location.href.indexOf('/game.html') > -1) {
					if (!ai.GetQueryString('storeMasterId') && (localStorage.loginjson || sessionStorage.loginjson)) {
						var loginjson = JSON.parse((localStorage.loginjson || sessionStorage.loginjson));
						location.replace(forward('./game.html?storeMasterId=' + loginjson.UserId));
						sessionStorage.hasReplace = true; //已经跳转页面，不需要再刷新
					}

					if (sessionStorage.diandengshuaxin && !sessionStorage.hasReplace) {
						window.location.reload()
					}
					sessionStorage.removeItem('diandengshuaxin');
					sessionStorage.removeItem('hasReplace');
				} else if (e.persisted && localStorage.refreshOrderCenter) {
					localStorage.removeItem('refreshOrderCenter');
					window.location.reload()
				}
			})
		} catch (e) {
			console.log('方法不支持')
		}
		if (ai.GetQueryString('net_token') || (ai.GetQueryString('token') && ai.GetQueryString('sourcetype') == 1)) { //sourcetype==1标识和包商城

			var loading = document.getElementsByClassName('loadingNew')[0];
			if (ai.GetQueryString('sourceid') == '021002') {
				sessionStorage.fromClient = '10086'; //10086内嵌页面
				if (loading) {
					loading.style.display = 'block'
				}
			}

			otherLogin({
				zhihuitoken: ai.GetQueryString('net_token') || ai.GetQueryString('token'),
				sourceId: ai.GetQueryString('sourceid') ? ai.GetQueryString('sourceid') : -1,
				sourcetype: ai.GetQueryString('sourcetype') ? ai.GetQueryString('sourcetype') : 0
			})

			function otherLogin(opt) {
				ai.post({
					url: '/StoreServer/Store/AutoLoginForZhihui',
					data: opt,
					isSyn: 1,
					load: function (json) {

						if (loading) {
							loading.style.display = 'none'
						}

						var phoneEle = document.getElementById('phone'),
							newUsertel = document.getElementsByClassName('newUserMain__tel')[0];
						if (json.ResultCode == 1000) {
							localStorage.lnyptoken = json.Data.token;
							localStorage.loginjson = JSON.stringify({
								storeLogo: json.Data.storeLogo,
								storeName: json.Data.storeName,
								phone: json.Data.phoneNumber,
								storeId: json.Data.id,
								UserId: json.Data.storeMasterId,
								nickName: json.Data.nickName,
								isNew: json.Data.isNew
							});

							//注册送页面特殊处理
							if (phoneEle && json.Data.phoneNumber && location.href.indexOf('registerSend.html') > -1) {
								localStorage.RegisterSendTel = json.Data.phoneNumber;
							} else if (location.href.indexOf('registerSend_86.html') > -1 && ai.GetQueryString('sourceid') == '021002' && json.Data.phoneNumber) {
								sessionStorage.isLogin10086 = 1;
								localStorage.RegisterSendTel2 = json.Data.phoneNumber;
							}

							var index1, index2;

							if (ai.GetQueryString('sourcetype') == 1) {
								index1 = location.href.indexOf('&sourcetype=') == -1 ? location.href.indexOf('?sourcetype=') : location.href.indexOf('&sourcetype=');
								index2 = location.href.indexOf('&token=') == -1 ? location.href.indexOf('?token=') : location.href.indexOf('&token=');
							} else {
								index1 = location.href.indexOf('&net_token=') == -1 ? location.href.indexOf('?net_token=') : location.href.indexOf('&net_token=');
								index2 = location.href.indexOf('&sourceid=') == -1 ? location.href.indexOf('?sourceid=') : location.href.indexOf('&sourceid=');
							}

							location.href = location.href.slice(0, index1 > index2 ? index2 : index1);

							window.LoginStatus = json.Data.LoginStatus; //标识是否为新用户

						} else if (json.ResultCode == 100005) { //广东移动app中如果未注册返回100005，此时不给注册登录，只返回手机号码
							ai.post({
								url: '/StoreServer/StoreMasterInfo/GainOneClieckConfig',
								data: '',
								load: function (res) {
									if (res.ResultCode == 1000) {

										ai.confirm3({
											// title: '提示',//res.Data.title
											// desc: '是否同意岭南生活使用本机号码 138****2536进行注册？ ',//res.Data.body.replace(/%s/,json.Data.phoneNumber)
											// btnYTxt: '先逛逛',
											// PopImg: '',//res.Data.PopImg,
											// remark: false, //res.Data.Remake
											title: res.Data.Title, //res.Data.title
											desc: res.Data.Body.replace(/%s/, json.Data.phoneNumber.substr(0, 3) + '****' + json.Data.phoneNumber.substr(7)), //res.Data.body.replace(/%s/,json.Data.phoneNumber+phone.substr(0, 3) + '****' + phone.substr(7))
											btnYTxt: '先逛逛',
											PopImg: res.Data.PopImg, //res.Data.PopImg,
											remark: res.Data.Remark, //res.Data.Remake
											funY: function () {
												if (phoneEle && json.Data && json.Data.phoneNumber) {
													phoneEle.value = json.Data.phoneNumber;
												}
												if (newUsertel && json.Data && json.Data.phoneNumber) {
													newUsertel.value = json.Data.phoneNumber;
												}
												if (location.href.indexOf('registerSend_86.html') > -1 && ai.GetQueryString('sourceid') == '021002' && json.Data.temptoken) {
													sessionStorage.isLogin10086 = 0; //新用户未注册
													localStorage.RegisterSendTel2 = json.Data.phoneNumber;
													localStorage.RegisterSendKey = json.Data.temptoken; //通过10086token获取岭南临时token
												}
												var index1, index2;

												if (ai.GetQueryString('sourcetype') == 1) {
													index1 = location.href.indexOf('&sourcetype=') == -1 ? location.href.indexOf('?sourcetype=') : location.href.indexOf('&sourcetype=');
													index2 = location.href.indexOf('&token=') == -1 ? location.href.indexOf('?token=') : location.href.indexOf('&token=');
												} else {
													index1 = location.href.indexOf('&net_token=') == -1 ? location.href.indexOf('?net_token=') : location.href.indexOf('&net_token=');
													index2 = location.href.indexOf('&sourceid=') == -1 ? location.href.indexOf('?sourceid=') : location.href.indexOf('&sourceid=');
												}

												location.replace(location.href.slice(0, index1 > index2 ? index2 : index1));//防止86返回按钮返回2次页面
												document.getElementsByClassName('confirm2Box')[0].style.display = 'none'
											},
											btnNTxt: '确认注册',
											funN: function () {
												var checkbox = document.getElementById('protocol__sel');
												if (!checkbox.checked) {
													ai.cue('您需要同意《岭南生活用户协议》才能进行注册，请进行勾选');
													return false;
												}
												otherLogin({
													zhihuitoken: json.Data.temptoken,
													sourceId: -1,
													sourcetype: 2
												})

											}
										})
									} else {
										ai.cue(json.Message)
									}
								}
							})

							// ai.confirm2({
							// 	title: '提示',
							// 	desc: '是否允许岭南生活 使用一键登录？<br/>（一键登录可以免去输入用户名密码，使用手机号码直接登录系统）',
							// 	btnYTxt: '允许',
							// 	funY: function () { 
							// 		otherLogin({
							// 			zhihuitoken: json.Data.temptoken,
							// 			sourceId: -1,
							// 			sourcetype: 2
							// 		})
							// 	},
							// 	btnNTxt: '不允许',
							// 	funN: function () {
							// 		if (phoneEle && json.Data && json.Data.phoneNumber) {
							// 			phoneEle.value = json.Data.phoneNumber;
							// 		}
							// 		if (newUsertel && json.Data && json.Data.phoneNumber) {
							// 			newUsertel.value = json.Data.phoneNumber;
							// 		}
							// 		if (location.href.indexOf('registerSend_86.html') > -1 && ai.GetQueryString('sourceid') == '021002' && json.Data.temptoken) {
							// 			sessionStorage.isLogin10086 = 0; //新用户未注册
							// 			localStorage.RegisterSendTel2 = json.Data.phoneNumber;
							// 			localStorage.RegisterSendKey = json.Data.temptoken; //通过10086token获取岭南临时token
							// 		}
							// 		var index1, index2;

							// 		if (ai.GetQueryString('sourcetype') == 1) {
							// 			index1 = location.href.indexOf('&sourcetype=') == -1 ? location.href.indexOf('?sourcetype=') : location.href.indexOf('&sourcetype=');
							// 			index2 = location.href.indexOf('&token=') == -1 ? location.href.indexOf('?token=') : location.href.indexOf('&token=');
							// 		} else {
							// 			index1 = location.href.indexOf('&net_token=') == -1 ? location.href.indexOf('?net_token=') : location.href.indexOf('&net_token=');
							// 			index2 = location.href.indexOf('&sourceid=') == -1 ? location.href.indexOf('?sourceid=') : location.href.indexOf('&sourceid=');
							// 		}

							// 		location.href = location.href.slice(0, index1 > index2 ? index2 : index1);
							// 	}
							// })

						} else {
							if (location.href.indexOf('registerSend_86.html') > -1 && ai.GetQueryString('sourceid') == '021002') {
								var tips = document.getElementsByClassName('cantLogin')[0];
								if (tips) {
									tips.style.display = 'block'
								}
							} else {
								ai.cue(json.Message);
							}
						}
					}
				})
			}
		}

		//存平台电话
		//ai.showManagerTel();

		var aideready = document.createEvent('HTMLEvents');
		aideready.initEvent('aideload', false, true);
		document.dispatchEvent(aideready);
		//唯一执行
		if (document.readyState == 'complete') {
			ai.initrepeat();
		} else {
			document.addEventListener('readystatechange', function () {
				if (document.readyState == 'complete') {
					ai.initrepeat();
				}
			})
		};
	});

	//获取时间戳方法
	method('getTimestamp', function () {
		var time = new Date(),
			stamp = new String();
		var data = {
			month: (time.getMonth() + 1), //月
			day: time.getDate(), //日
			hours: time.getHours(), //小时
			minutes: time.getMinutes(), //分钟
			seconds: time.getSeconds(), //秒钟,
			msec: time.getMilliseconds() //毫秒
		}
		for (var key in data) {
			if (data[key] < 10) {
				data[key] = '0' + data[key];
			}
		}
		return stamp.concat(time.getFullYear(), data.month, data.day, data.hours, data.minutes, data.seconds, data.msec);
	});

	//弹出提示框
	method('alert', function (msg) {
		var alt = document.getElementById("alert-tex");
		if (alt == null) {
			var aside;
			aside = document.createElement('aside');
			aside.id = 'alert-tex';
			aside.addEventListener('click', function (evt) {
				evt.currentTarget.style.display = 'none';
			})
			var div = document.createElement('div');
			div.className = 'alert';
			aside.appendChild(div);
			document.body.appendChild(aside);
			alt = aside;
		}
		alt.firstElementChild.innerHTML = msg;
		alt.style.display = 'block';
   		setTimeout(function(){

            alt.style.display = 'none';
},1500)
		return alt;
	});

	//弹出提示语
	method('cue', function (msg) {
		var div = document.createElement('div');
		div.id = 'cue';
		div.addEventListener('webkitAnimationEnd', function (evt) {
			//evt.currentTarget.remove();
			setTimeout(function(){
                
				evt.currentTarget.remove();
            
			},2000) 
		})
		document.body.appendChild(div);
		div.innerHTML = msg;
		div.style.marginLeft = -(div.offsetWidth / 2) + 'px';
		div.style.left = '50%';
		div.className = 'cueAni';
		return div;
	});

	//弹出确认框
	method('confirm', function (msg, tex, fun) {
		var aside = document.getElementById("confirm-tex");
		if (!aside) {
			aside = document.createElement('aside');
			aside.id = 'confirm-tex';
			var div = document.createElement('div');
			var span = document.createElement('span');
			var but = document.createElement('button');
			div.className = 'confirm';
			div.appendChild(span);
			div.appendChild(but);
			aside.appendChild(div);
			document.body.appendChild(aside);
		}
		aside.getElementsByTagName('button')[0].innerText = tex;
		aside.getElementsByTagName('button')[0].onclick = function (evt) {
			evt.currentTarget.parentElement.parentElement.style.display = 'none';
			fun();
		};
		aside.getElementsByTagName('span')[0].innerHTML = msg;
		aside.style.display = 'block';

	})

	//	将json2和并到json1
	method('jsonExtend', function (obj1, obj2) {
		for (var item in obj2) {
			obj1[item] = obj2[item];
		}
		return obj1;
	})

	//弹出确认框，带确定取消按钮
	/*
	 *	data = {
	 *		title: '登录提示',
	 *		desc: '是否前往登录页面？',
	 *		btnYTxt: '是',
	 *		funY: function() {
	 *			alert(1)
	 *		},
	 *		btnNTxt: '否',      //非必填
	 *		funN: function() {  //非必填
	 *			alert(0)
	 *		}
	 *	}
	 */

	method('confirm2', function (data) {
		var defaultData = {
			btnNTxt: '取消',
			funN: function () {
				if (document.getElementsByClassName('confirm2Box')[0]) {
					document.getElementsByClassName('confirm2Box')[0].style.display = 'none'
				}
			}
		}

		ai.jsonExtend(defaultData, data)

		var asideEle = document.getElementsByClassName('confirm2Box')[0],
			isAppend = true;

		if (!asideEle) {
			var htmlStr = '<div class="confirm2Box__main"><p class="confirm2Box__title"></p><p class="confirm2Box__txt"></p><div class="confirm2Box__btns"><div class="confirm2Box__btn1"></div><div class="confirm2Box__btn2">取消</div></div></div>';
			asideEle = document.createElement('aside');
			asideEle.className = 'confirm2Box';
			asideEle.innerHTML = htmlStr;
			isAppend = false
		}

		if (defaultData.title) {
			asideEle.querySelector('.confirm2Box__title').innerHTML = defaultData.title;
		} else {
			asideEle.querySelector('.confirm2Box__title').style.display = 'none';
		}

		if (defaultData.desc) {
			asideEle.querySelector('.confirm2Box__txt').innerHTML = defaultData.desc;
		} else {
			asideEle.querySelector('.confirm2Box__txt').style.display = 'none';
		}

		asideEle.querySelector('.confirm2Box__btn1').innerHTML = defaultData.btnYTxt;
		asideEle.querySelector('.confirm2Box__btn1').onclick = defaultData.funY;
		asideEle.querySelector('.confirm2Box__btn2').innerHTML = defaultData.btnNTxt;
		asideEle.querySelector('.confirm2Box__btn2').onclick = defaultData.funN;

		asideEle.style.display = 'block'

			!isAppend && document.body.appendChild(asideEle);


	})
	//单点登录弹层
	method('confirm3', function (data) {
		var defaultData = {
			btnNTxt: '取消',
			funN: function () {
				if (document.getElementsByClassName('confirm2Box')[0]) {
					document.getElementsByClassName('confirm2Box')[0].style.display = 'none'
				}
			}
		}

		ai.jsonExtend(defaultData, data)

		var asideEle = document.getElementsByClassName('confirm2Box')[0],
			isAppend = true;

		if (!asideEle) {
			var htmlStr = '<div class="confirm3Box__main"><p class="confirm3Box__title"></p><div class="img__tip"></div><div class="txt__tip"><p class="confirm3Box__txt"></p><p class="newUser__tip">(新用户注册，有机会获得2G流量）</p></div>' +
				'<div class="confirm3Box__rule"><input class="protocol__sel" type="checkbox" checked="checked" id="protocol__sel" > 注册即同意<a class="rule">《岭南生活用户协议》</a></div> <div class="confirm3Box__btns"><div class="confirm3Box__btn1">先逛逛</div><div class="confirm3Box__btn2">确认注册</div></div>';
			asideEle = document.createElement('aside');
			asideEle.className = 'confirm2Box';
			asideEle.innerHTML = htmlStr;
			isAppend = false
		}

		if (defaultData.title) {
			asideEle.querySelector('.confirm3Box__title').innerHTML = defaultData.title;
		} else {
			asideEle.querySelector('.confirm3Box__title').style.display = 'none';
		}

		if (defaultData.desc) {
			asideEle.querySelector('.confirm3Box__txt').innerHTML = defaultData.desc;
		} else {
			asideEle.querySelector('.confirm3Box__txt').style.display = 'none';
		}

		if (defaultData.PopImg) {
			asideEle.querySelector('.img__tip').backgroundImage = 'url(' + defaultData.PopImg + ')';
		}

		if (defaultData.remark) {
			asideEle.querySelector('.newUser__tip').innerHTML = defaultData.remark;
		} else {
			asideEle.querySelector('.newUser__tip').style.display = 'none';
			asideEle.querySelector('.txt__tip').style.height = '1.2rem';
		}
		asideEle.querySelector('.rule').addEventListener('click',function(){
			location.replace(ai.forward('https://lnyph5.vpclub.cn/html/rua.html?byClient=2'))
		})

		asideEle.querySelector('.confirm3Box__btn1').innerHTML = defaultData.btnYTxt;
		asideEle.querySelector('.confirm3Box__btn1').onclick = defaultData.funY;
		asideEle.querySelector('.confirm3Box__btn2').innerHTML = defaultData.btnNTxt;
		asideEle.querySelector('.confirm3Box__btn2').onclick = defaultData.funN;

		asideEle.style.display = 'block'
		window.onload = function () {
			!isAppend && document.body.appendChild(asideEle);

		}

	})

	//获取url？后指定参数的值
	method('GetQueryString', function (name, url) {
		var search = window.location.search
		if (url) {
			search = url.substring(url.indexOf('?'))
		}

		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	})

	//修改链接中的参数
	method('changeURLArg', function (url, arg, arg_val) {

		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + arg_val;
		if (url.match(pattern)) {
			var tmp = '/(' + arg + '=)([^&]*)/gi';
			tmp = url.replace(eval(tmp), replaceText);
			return tmp;
		} else {
			if (url.match('[\?]')) {
				return url + '&' + replaceText;
			} else {
				return url + '?' + replaceText;
			}
		}
		return url + '\n' + arg + '\n' + arg_val;

	})

	//时间格式转换
	method('changeTime', function (time) {
		var timeStr = time.substring(0, 16);
		return timeStr.split('T').join(' ');
	})

	//判断是否已选择sku
	method('isSelSku', function () {
		var colorBox = document.getElementById('select-box__colorBox');
		var colorTitle = document.getElementById('select-box__colorTitle');
		var colorList = document.getElementsByClassName('select-box__colorItem');
		var colorSelect = document.getElementById('colorSelect');
		var unitBox = document.getElementById('select-box__unitBox');
		var unitTitle = document.getElementById('select-box__unitTitle');
		var unitList = document.getElementsByClassName('select-box__unitItem');
		var unitSelect = document.getElementById('unitSelect');
		if (colorList.length > 0 && !colorSelect) {
			ai.cue('请选择' + colorTitle.innerHTML);
			return false;
		}
		if (unitList.length > 0 && !unitSelect) {
			ai.cue('请选择' + unitTitle.innerHTML);
			return false;
		}
		return true;
	})

	//获取页面滑动的距离
	method('getScrollTop', function (ele) {

		if (ele) {
			return ele.scrollTop;
		}

		var scrollTop = 0,
			bodyScrollTop = 0,
			documentScrollTop = 0;　　
		if (document.body) {　　　　
			bodyScrollTop = document.body.scrollTop;　　
		}　　
		if (document.documentElement) {　　　　
			documentScrollTop = document.documentElement.scrollTop;　　
		}　　
		scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
		return scrollTop;
	})

	//获取页面可视区域的高度
	method('getWindowHeight', function (ele) {
		if (ele) {
			return ele.clientHeight;
		}
		var windowHeight = 0;　　
		if (document.compatMode == "CSS1Compat") {　　　　
			windowHeight = document.documentElement.clientHeight;　　
		} else {　　　　
			windowHeight = document.body.clientHeight;　　
		}　　
		return windowHeight;
	})

	//获取页面内容总的高度
	method('getScrollHeight', function (ele) {
		if (ele) {
			return ele.scrollHeight;
		}
		var scrollHeight = 0,
			bodyScrollHeight = 0,
			documentScrollHeight = 0;　　
		if (document.body) {　　　　
			bodyScrollHeight = document.body.scrollHeight;　　
		}　　
		if (document.documentElement) {　　　　
			documentScrollHeight = document.documentElement.scrollHeight;　　
		}　　
		scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
		return scrollHeight;
	})

	//判断是否为微信
	method('isWeixin', function () {
		var ua = window.navigator.userAgent.toLowerCase();
		return ua.match(/MicroMessenger/i) == 'micromessenger' ? 1 : 0;
	})

	//	修改title
	method('changeTitle', function (title) {
		document.title = title;
		var ua = window.navigator.userAgent.toLowerCase();
		if ((ua.indexOf('qq') != -1 || ua.match(/MicroMessenger/i) == 'micromessenger') && location.href.indexOf('byClient') == -1) {
			var iframe = document.createElement('iframe');
			iframe.className = 'overWindow';
			iframe.src = "../../img/icon/icon_like@3x-min.png"; //发起一次请求
			document.body.appendChild(iframe);
			setTimeout(function () {
				iframe.remove();
			}, 200);
		}
	})

	//初始化iframe高度
	method('iframeInitH', function (iframe) {
		if (iframe) {
			iframe.style.height = ((3 / 4) * iframe.offsetWidth) + "px";
		}
	})

	//启用单个直播视频
	method('videoLiveEvt', function (ele) {
		var video = ele.getElementsByTagName('video')[0],
			zhibo = ele.getElementsByClassName('zhibo')[0],
			play = ele.getElementsByClassName('play')[0],
			pause = ele.getElementsByClassName('pause')[0];

		play.onclick = function () {
			video.play();
		}
		pause.onclick = function () {
			video.pause();
		}

		video.oncanplay = function () {
			video.controls = true;
		}

		video.onclick = function () {
			if (play.style.display == 'none' && pause.style.display == 'none') {
				pause.style.display = 'block';
				play.style.display = 'none';
				clearTimeout(ele.timer);
				ele.timer = setTimeout(function () {
					pause.style.display = 'none';
				}, 2000)
			}
		}

		video.onplay = function () {
			pause.style.display = 'block';
			play.style.display = 'none';
			ele.timer = setTimeout(function () {
				pause.style.display = 'none';
			}, 2000)
		}

		video.onpause = function () {
			play.style.display = 'block';
			pause.style.display = 'none';
			clearTimeout(ele.timer);
		}
	})

	//执行前检查是否登录
	method('isLogin', function (fn) {
		if (localStorage.lnyptoken && localStorage.loginjson) {
			fn();
		} else {
			localStorage.removeItem('loginjson');
			localStorage.removeItem('lnyptoken');
			if (!document.getElementById('loginBox')) {
				ai.pubGetLogin();
			} else {
				document.getElementById('loginNew').style.display = 'block';
			}
		}
	})

	//跳转保留渠道信息
	method('forward', function (url) {

		if (location.href.indexOf('findDetails.html') != -1) {
			if (url.indexOf('/templates/') != -1) {
				url = 'https://' + location.host + '/lnyp/templates/' + url.slice(url.indexOf('/templates/') + 11);
			} else {
				url = 'https://' + location.host + '/lnyp/templates/' + url.slice(url.indexOf('../') + 3);
			}
		}

		if (url.indexOf('findDetails.html') != -1) {
			url = 'http://' + location.host + '/lnyp/templates/find/findDetails.html' + url.slice(url.indexOf('.html') + 5);
		}

		var search, output;
		search = ai.GetQueryString('channelcode') ? 'channelcode=' + ai.GetQueryString('channelcode') : '';
		if (ai.GetQueryString('citycode')) {
			search = search == '' ? 'citycode=' + ai.GetQueryString('citycode') : search + '&citycode=' + ai.GetQueryString('citycode');
		}

		if (ai.GetQueryString('activityflag')) {
			search = search == '' ? 'activityflag=' + ai.GetQueryString('activityflag') : search + '&activityflag=' + ai.GetQueryString('activityflag');
		}
		if (ai.GetQueryString('areaJgid')) {
			search = search == '' ? 'areaJgid=' + ai.GetQueryString('areaJgid') : search + '&areaJgid=' + ai.GetQueryString('areaJgid');
		}
		if (ai.GetQueryString('storeMasterId')) {
			search = search == '' ? 'storeMasterId=' + ai.GetQueryString('storeMasterId') : search + '&storeMasterId=' + ai.GetQueryString('storeMasterId');
		}
		if (ai.GetQueryString('origin')) {
			search = search == '' ? 'origin=' + ai.GetQueryString('origin') : search + '&origin=' + ai.GetQueryString('origin');
		}

		if (ai.GetQueryString('fromMall') || location.href.toLowerCase().indexOf('mallhome.html') > -1) {
			var fromMallStr = ai.GetQueryString('fromMall') ? ai.GetQueryString('fromMall') : '1'
			search = search == '' ? 'fromMall=' + fromMallStr : search + '&fromMall=' + fromMallStr;
		}

		if (url.indexOf('productDetails.html') == -1) {
			if (ai.GetQueryString('byClient')) { //安卓:1,IOS:2
				search = search == '' ? 'byClient=' + ai.GetQueryString('byClient') : search + '&byClient=' + ai.GetQueryString('byClient');
			}
			if (ai.GetQueryString('areaActId')) {
				search = search == '' ? 'areaActId=' + ai.GetQueryString('areaActId') : search + '&areaActId=' + ai.GetQueryString('areaActId');
			}

		}

		if (search == '') {
			return url;
		} else {
			output = url.indexOf('?') != -1 ? url + '&' + search : url + '?' + search;
			return output;
		}
	})

	//模拟click,优化click的300ms延迟
	method('addClick', function (ele, fn) {
		ele.addEventListener('touchstart', function (evt) {
			ele.click = true;
			ele.addEventListener('touchmove', touchmoveFn);
			ele.addEventListener('touchend', touchendFn);
			// evt.preventDefault();
		});

		function touchmoveFn(evt) {
			ele.click = false;
			// evt.preventDefault();
		}

		function touchendFn(evt) {
			if (ele.click) {
				fn();
			}
			ele.click = '';
			ele.removeEventListener('touchmove', touchmoveFn);
			ele.removeEventListener('touchend', touchendFn);
			// evt.preventDefault();
		}
	})

	//跳转保留标识
	method('saveBs', function (url, bs) {
		var urlOutput, bl;

		var bsStr = ai.GetQueryString(bs) ? ('=' + ai.GetQueryString(bs)) : '';

		if (location.href.indexOf(bs) == -1) {
			urlOutput = url;
		} else if (url.indexOf('?') == -1) {
			urlOutput = url + '?' + bs + bsStr;
			bl = true;
		} else {
			urlOutput = url + '&' + bs + bsStr;
			bl = true;
		}
		if (bl && (url.indexOf('trafficOpen.html') != -1 || url.indexOf('gainTraffic.html') != -1)) {
			urlOutput = urlOutput + '&needShare';
		}
		return urlOutput;
	})

	//解决链接中文部分存在%时解码失败
	method('myDecodeURI', function (str) {
		var reg = /%/g;
		str = str.replace(reg, '@!@');
		reg = /(@!@)([^@])([^！])/g;
		str = str.replace(reg, '%$2$3');
		str = decodeURIComponent(str);
		str = str.replace(/@!@/g, '%');
		return str;
	})

	//	设置进度条,应用于客户端.解决客户端嵌入H5页面后,存在H5和客户端的两个加载转圈图标
	method('addLoading', function (obj, hasHeader) {

		var header = document.getElementsByClassName('headerPub')[0] || document.getElementsByClassName('header')[0];

		var barBox = document.getElementsByClassName('loadingBox')[0];

		if (!barBox) {
			barBox = document.createElement('div');
			barBox.className = 'loadingBox';
			barBox.innerHTML = '<div class="loadingBox__bar"></div>';

			if (hasHeader && header) {
				barBox.style.position = 'absolute';
				barBox.style.top = 'auto';
				barBox.style.bottom = '-4px';
				header.appendChild(barBox);
			} else {
				document.body.appendChild(barBox);
			}
		}

		var bar = barBox.querySelector('.loadingBox__bar');

		var schedule = 0,
			surplus = 100,
			step = '',
			num = 4;

		clearInterval(obj.loadingTimer);
		clearInterval(obj.loadingSetTimer);
		bar.style.transition = '0s';
		bar.style.display = 'none';
		bar.style.width = '0';
		bar.style.opacity = '1';
		bar.style.display = 'block';
		bar.style.transition = '.3s';

		obj.loadingTimer = setInterval(function () {

			if (surplus < 20 && num == 4) {
				num = 10;
			} else if (surplus < 10 && num == 10) {
				num = 100;
			}

			step = Math.random() / num * surplus;
			schedule += step;
			bar.style.width = schedule + '%';
			surplus = 100 - schedule;

		}, 500)

	})

	//	结束进度条
	method('finishLoading', function (obj) {
		var barBox = document.getElementsByClassName('loadingBox')[0],
			bar = document.getElementsByClassName('loadingBox__bar')[0];

		if (!bar || !barBox) {
			return false;
		}
		clearInterval(obj.loadingTimer);
		bar.style.width = '100%';
		obj.loadingSetTimer = setTimeout(function () {
			bar.style.transition = '0s';
			bar.style.opacity = '0';
			bar.style.display = 'none';
			bar.style.width = '0';
		}, 300)
	})

	//删除search指定选项
	method('funcUrlDel', function (url, name) {
		var WHindex = url.indexOf('?')
		if (WHindex == -1) {
			return url
		}
		var baseUrl = url.substr(0, WHindex),
			searchStr = url.substr(WHindex + 1);

		if (searchStr.indexOf(name) > -1) {
			var obj = {},
				arr = searchStr.split("&");

			for (var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].split("=");
				obj[arr[i][0]] = arr[i][1];
			};

			delete obj[name];

			var objStrLen = JSON.stringify(obj).length;

			if (objStrLen <= 4) {
				return baseUrl
			} else {
				url = baseUrl + '?' + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
				return url
			}
		} else {
			return url
		}
	})
	//接收第三方跳转的参数
	if (ai.GetQueryString('token') && ai.GetQueryString('id') && ai.GetQueryString('phoneNumber') && ai.GetQueryString('sourcetype') != 1) {
		localStorage.lnyptoken = ai.GetQueryString('token');
		var storeLogo, storeName, nickName;

		try {
			storeLogo = ai.myDecodeURI(ai.GetQueryString('storeLogo'));
		} catch (e) {
			storeLogo = ai.GetQueryString('storeLogo');
		}
		try {
			storeName = ai.myDecodeURI(ai.GetQueryString('storeName'));
		} catch (e) {
			storeName = ai.GetQueryString('storeName');
		}
		try {
			nickName = ai.myDecodeURI(ai.GetQueryString('nickName'));
		} catch (e) {
			nickName = ai.GetQueryString('nickName');
		}

		localStorage.loginjson = JSON.stringify({
			storeLogo: storeLogo,
			storeName: storeName,
			phone: ai.GetQueryString('phoneNumber'),
			storeId: ai.GetQueryString('id'),
			UserId: ai.GetQueryString('storeMasterId'),
			nickName: nickName,

		});
		if (location.href.indexOf('test/onload.html') == -1) {
			var index = location.href.indexOf('&token=') == -1 ? location.href.indexOf('?token=') : location.href.indexOf('&token=');
			location.href = location.href.slice(0, index);
		}
	} else if (ai.GetQueryString('token') && (ai.GetQueryString('token') != localStorage.lnyptoken || !localStorage.loginjson) && ai.GetQueryString('sourcetype') != 1) {
		if(location.href.indexOf('activities/forLotterySkip.html')==-1){//转盘空白页面 跳转无需请求
			ai.post({
				url: '/StoreServer/Store/GainBaseLoginInfo',
				data: {
					token: ai.GetQueryString('lnshToken') || ai.GetQueryString('token')
				},
				token: false,
				isSyn: 1,
				load: function (json) {
					if (json.ResultCode == 1000) {
						localStorage.lnyptoken = ai.GetQueryString('lnshToken') || ai.GetQueryString('token');
						localStorage.loginjson = JSON.stringify({
							storeLogo: json.Data.storeLogo,
							storeName: json.Data.storeName,
							phone: json.Data.phoneNumber,
							storeId: json.Data.id,
							UserId: json.Data.storeMasterId,
							nickName: json.Data.nickName,
							isNew: json.Data.isNew
						});
						var url;
	
						url = ai.funcUrlDel(window.location.href, 'lnshToken');
	
	
						url = ai.funcUrlDel(url, 'token');
						// var str = arr[0],
						// 	url;
						// if(str[0] == '&') {
						// 	if(str.slice(-1) == '&') {
						// 		url = location.href.replace(str, '&')
						// 	} else {
						// 		url = location.href.replace(str, '')
						// 	}
						// } else {
						// 	if(str.slice(-1) == '&') {
						// 		url = location.href.replace(str, '')
						// 	} else {
						// 		url = location.href.replace(str, '').slice(0, -1)
						// 	}
						// }
						location.replace(url);
	
					}
				}
			})
		}
	
	}



	//只允许微信打开
	method('NonWeChat', function (fn) {
		if (!ai.isWeixin()) {
			ai.changeTitle('抱歉，出错了');
			document.body.innerHTML = '<div class="notWX"><img class="notWX__icon" src="../../img/icon/notWX.png"/><p class="notWX__txt">请在微信客户端打开链接</p></div>';
		} else {
			fn && fn();
		}
	})

	//显示平台客服
	method('showManagerTel', function (fn) {
		if (!ai.getCookie('managerTel') || !localStorage.orderTipContent) {
			// V3.0.0版本 GainSystemConfig替换GainAppManagerTel接口
			ai.post({
				url: 'StoreServer/StoreMasterInfo/GainSystemConfig',
				data: {},
				isSyn: 1,
				load: function (json) {
					if (json.ResultCode == 1000) {

						var mins = +new Date() + 1000 * 60 * 60 * 24;
						mins = new Date(mins)

						mins = (new Date(mins.getFullYear(), mins.getMonth(), mins.getDate()) - new Date()) / 1000 / 60;
						console.log(Math.floor(mins))

						ai.setCookie('managerTel', json.Data.appManagerTel, Math.floor(mins));
						localStorage.orderTipContent = json.Data.TipContent ? json.Data.TipContent : 'noInfo'
						if (fn) {
							fn();
						}
					}
				}
			})
		}
	})

	//	设置cookie
	method('setCookie', function (name, value, mins) {
		var d = new Date();
		d.setTime(d.getTime() + (mins * 60 * 1000));
		document.cookie = name + "=" + value + "; expires=" + d.toGMTString();
	})

	//	获取cookie
	method('getCookie', function (name) {
		var strCookie = document.cookie;
		var arrCookie = strCookie.split("; ");
		for (var i = 0; i < arrCookie.length; i++) {
			var arr = arrCookie[i].split("=");
			if (arr[0] == name) return arr[1];
		}
		return "";
	})

	//	删除cookie
	method('delCookie', function (name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = ai.getCookie(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	})

	//	刷新页面时链接中加上随机数,解决部分浏览器刷新显示缓存的内容
	method('reloadForCache', function () {
		var url = '',
			index = '',
			searchArr = [];

		if (location.href.indexOf('clearCache=') == -1) {
			if (location.href.indexOf('?') != -1) {
				url = location.href + '&clearCache=' + Math.random().toFixed(8);
			} else {
				url = location.href + '?clearCache=' + Math.random().toFixed(8);
			}
		} else {
			searchArr = location.search.split('&');

			index = searchArr.indexOf('clearCache=' + ai.GetQueryString('clearCache'));

			if (index != -1) {
				searchArr.splice(index, 1);
				url = location.origin + location.pathname + searchArr.join('&');
			} else {
				searchArr.splice(0, 1);
				url = location.origin + location.pathname + '?' + searchArr.join('&');
			}
		}
		location.replace(url);
	})

	//获取指定位数,指定进制的字符串
	method('getUUID', function (len, radix) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [],
			i;
		radix = radix || chars.length;

		if (len) {
			// Compact form
			for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
		} else {
			// rfc4122, version 4 form
			var r;

			// rfc4122 requires these characters
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';

			// Fill in random data.  At i==19 set the high bits of clock sequence as
			// per rfc4122, sec. 4.1.5
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}

		return uuid.join('');
	})

	/*
	 * 埋点统计方法
	 * 参考templates\cities\areaActDetail\areaActDetail.html页面
	 */
	method('statistic', function (type, option, fn) {
		var channelcode = ai.GetQueryString('channelcode') ? ai.GetQueryString('channelcode') : '';
		var citycode = ai.GetQueryString('citycode') ? ai.GetQueryString('citycode') : '';
		var activityflag = ai.GetQueryString("activityflag") ? ai.GetQueryString("activityflag") : '';
		var postUrl = {
			"product": '/StatisticServer/Statistic/AddProductStatistic',
			"activity": '/StatisticServer/Statistic/AddActivityStatistic',
			'store': '/StatisticServer/Statistic/AddStoreStatistic',
			"order": '/StatisticServer/Statistic/AddOrderStatistic'
		}
		var postData = {
			phonenum: '', //电话号码
			requestIp: '', //为空,后台自己取
			channelcode: channelcode,
			citycode: citycode,
			activityflag: activityflag,
			pageurl: ''
		}

		postData = ai.jsonExtend(postData, option)

		var isSyn = postData.isSyn ? 1 : 0

		delete postData.isSyn;

		if (location.href.indexOf('?') == -1) {
			postData.pageurl = location.href;
		} else {
			postData.pageurl = location.href.slice(0, location.href.indexOf('?'));
		}
		ai.post({
			url: postUrl[type],
			data: postData,
			isSyn: isSyn,
			load: function (json) {
				console.log(json.Message);
				fn && fn(json)
			}
		})
	})

	//数极客自定义事件统计
	method('shujike', function (type, option) {
		try {
			var keys = [],
				list = [];
			for (var item in option) {
				keys.push(item);
				list.push(option[item]);
			}
			_dgt.push(['trackEvent', type, keys, list]);
		} catch (e) {
			console.log('数极客统计方法报错')
		}
	})

	//注册事件监听
	function connectWebViewJavascriptBridge(callback) {
		try {

			if (window.WebViewJavascriptBridge) {
				return callback(WebViewJavascriptBridge);
			} else if (window.WVJBCallbacks) {
				return window.WVJBCallbacks.push(callback);
			} else {
				document.addEventListener(
					'WebViewJavascriptBridgeReady',
					function () {
						callback(WebViewJavascriptBridge)
					},
					false
				);
			}
			window.WVJBCallbacks = [callback];
			var WVJBIframe = document.createElement('iframe');
			WVJBIframe.style.display = 'none';
			WVJBIframe.src = 'https://__bridge_loaded__';
			document.documentElement.appendChild(WVJBIframe);
			setTimeout(function () {
				document.documentElement.removeChild(WVJBIframe)
			}, 0)
		} catch (e) {
			console.log('执行出错')
		}
	}

	try {
		if (ai.GetQueryString('byClient')) {
			//注册回调函数，第一次连接时调用 初始化函数  
			connectWebViewJavascriptBridge(function (bridge) {
				//客户端调取js的方法
				bridge.registerHandler('test', function (data, responseCallback) {});

				bridge.init(function (message, responseCallback) {
					console.log('JS got a message', message);
					var data = {
						'Javascript Responds': 'Wee!'
					};
					console.log('JS responding with', data);
					responseCallback(data);
				});

			})
		}
	} catch (e) {
		console.log('执行出错')
	}

	method('appLogin', function (userName) {
		try {
			//调用本地java方法  
			window.WebViewJavascriptBridge.callHandler(
				'onLogin', //登录
				{
					'param': userName //传给客户端的json数据
				},
				function (responseData) {} //回调方法
			);
		} catch (e) {
			console.log('调用客户端登录失败')
		}
	})

	//	参数格式: 
	//	{
	//		'url': '分享链接',
	//		'icon': '分享图标',
	//		'title': '分享标题',
	//		'content': '分享内容'
	//	}
	method('appShare', function (shareJson) {
		try {
			window.WebViewJavascriptBridge.callHandler(
				'onShare', //分享
				{
					'param': shareJson //传给客户端的json数据
				},
				function (responseData) {} //回调方法
			);
		} catch (e) {
			console.log('调用客户端分享失败')
		}
	})

	//	微信自定义分享  包含验签，调用前需要定义全局的方法:
	//	function WXConfigGetter(data) {
	//		alert(5)
	//		data.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];
	//		data.debug = false;
	//		wx.config(data);
	//	}
	method('WXShare', function (option) {
		if (option && window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
			var script1 = document.createElement('script');
			script1.src = "https://res.wx.qq.com/open/js/jweixin-1.0.0.js";
			document.body.appendChild(script1);
			script1.onload = function () {
				var script2 = document.createElement('script');
				script2.src = "https://lnyp-weixin.vpclub.cn/api/weixinbase/get?id=1006";
				document.body.appendChild(script2);
				script2.onload = function () {
					wx.ready(function () {
						wx.onMenuShareTimeline(option);
						wx.onMenuShareAppMessage(option);
						wx.onMenuShareQQ(option);
						wx.onMenuShareWeibo(option);
						wx.onMenuShareQZone(option);
					});

				}
			}
		}

	})

	return ai;

})();
ai.createdb();
ai.load();