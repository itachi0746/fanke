
function _$(id) {
	return document.getElementById(id);
}

var slideImgIds="menuNavFocus";
/**
 * 切换A标签时，滑动效果
 * @param {Object} eventId 发生滑动效果的DIV ID
 * @param {Object} slideImgId 要产生滑动的效果ID
 * @param {Object} leftOff  左偏移位置
 * @param {Object} topOff  上偏移位置
 * @param {Object} flag 是移上去，还是移出去
 * @param {Object} width 效果宽度
 * @param {Object} height 效果高度
 */
function slideATagBImg(eventId,slideImgId,leftOff,topOff,flag,width,height,imgUrl){
        var left;
        if(document.getElementById(eventId).style.left){
          left = parseInt(document.getElementById(eventId).style.left,10);
        }else{
          left = parseInt(document.getElementById(eventId).offsetLeft,10);  
        }
	var top;
        if(document.getElementById(eventId).style.top){
          top = parseInt(document.getElementById(eventId).style.top,10);
        }else{
          top = parseInt(document.getElementById(eventId).offsetTop,10);
        }
	
         if(typeof imgUrl!= 'undefined' && imgUrl.length > 0){
		document.getElementById(slideImgId + "Img").src = imgUrl;
	}
	 
	if(typeof leftOff!= 'undefined' && !isNaN(parseInt(leftOff,10)) ){
		left =  left + parseInt(leftOff,10);
	}
	
	if(typeof topOff!= 'undefined' && !isNaN(parseInt(topOff,10)) ){
		top =  top + parseInt(topOff,10);
	}
	
	
	if(typeof width!= 'undefined' && !isNaN(parseInt(width,10)) ){
                
		document.getElementById(slideImgId + "Img").style.width = parseInt(width,10)+"px";
	}
	
	if(typeof height!= 'undefined' && !isNaN(parseInt(width,10)) ){
		document.getElementById(slideImgId + "Img").style.height = parseInt(height,10)+"px";
	}
	
	if(flag){
		document.getElementById(slideImgId).style.display="block";
	}else{
		document.getElementById(slideImgId).style.display="none";
	}
	
	document.getElementById(slideImgId).style.left = left+"px";
	document.getElementById(slideImgId).style.top = top+"px";
	hideATagBImg(slideImgIds,slideImgId);	
	
}
/**
 * 滑动时，隐藏界面其他滑动残留的效果
 * @param {Object} slideImgIds 所有滑动效果的对象ID
 * @param {Object} slideImgId  当前活动效果的对象ID
 */
function hideATagBImg(slideImgIds,slideImgId){
	var ids = slideImgIds.split(",");
	for(var i = 0;i < ids.length;i++){
		if(ids[i] != slideImgId){
			if(document.getElementById(ids[i])){
				document.getElementById(ids[i]).style.display="none";
			}
			
		}
	}
}


function showImg(indexId,left,top,width,height,cursor_left,cursor_top,cursor_width,cursor_height,flag){
    if(flag){
     _$("columnDiv_"+indexId).style.zIndex="10";
     _$("columnDiv_"+indexId).style.width = width+"px";
     _$("columnDiv_"+indexId).style.height = height+"px";
     
     _$("divFocus").style.display = "";
     _$("divFocus").style.left = cursor_left+"px";
     _$("divFocus").style.top = cursor_top+"px";
     _$("divFocusImg").style.width = cursor_width+"px";
     _$("divFocusImg").style.height = cursor_height+"px";
     
     //_$("a_"+indexId).style.boxShadow="0px 0px 20px 5px #21c8df";
	 //_$("a_"+indexId).style.border="2px solid #FFFFFF";
	 //_$("a_"+indexId).style.borderRadius="0px";
    }else{
      _$("divFocus").style.display = "none";	
     _$("columnDiv_"+indexId).style.zIndex="1";
     _$("a_"+indexId).style.boxShadow="";
     _$("a_"+indexId).style.border="";
     _$("a_"+indexId).style.borderRadius="";   	
    }
     _$("columnDiv_"+indexId).style.left=left+"px";
     _$("columnDiv_"+indexId).style.top=top+"px";
     _$("a_"+indexId).style.width=width+"px";
     _$("a_"+indexId).style.height=height+"px";
}

function showMemuImg(indexId,obj,left,top,width,height,cursor_left,cursor_top,cursor_width,cursor_height,flag){
    if(flag){
     _$("columnDiv_"+indexId).style.zIndex="10";
     _$("columnDiv_"+indexId).style.width = width+"px";
     _$("columnDiv_"+indexId).style.height = height+"px";
     
     _$(obj).style.display = "";
     _$(obj).style.left = cursor_left+"px";
     _$(obj).style.top = cursor_top+"px";
     _$(obj+"Img").style.width = cursor_width+"px";
     _$(obj+"Img").style.height = cursor_height+"px";
     
     //_$("a_"+indexId).style.boxShadow="0px 0px 20px 5px #21c8df";
	 //_$("a_"+indexId).style.border="2px solid #FFFFFF";
	 //_$("a_"+indexId).style.borderRadius="0px";
    }else{
      _$(obj).style.display = "none";	
     _$("columnDiv_"+indexId).style.zIndex="1";
     _$("a_"+indexId).style.boxShadow="";
     _$("a_"+indexId).style.border="";
     _$("a_"+indexId).style.borderRadius="";   	
    }
     _$("columnDiv_"+indexId).style.left=left+"px";
     _$("columnDiv_"+indexId).style.top=top+"px";
     _$("a_"+indexId).style.width=width+"px";
     _$("a_"+indexId).style.height=height+"px";
}

/**
function showImg(indexId,left,top,width,height,flag){
    if(flag){
    	_$("columnDiv_"+indexId).style.zIndex="10";
    if(indexId<2){
	document.getElementById("divFocusImg").style.width = width+68+"px";
	document.getElementById("divFocusImg").style.height = height+70+"px";
	document.getElementById("divFocus").style.left = left-23+"px";
	document.getElementById("divFocus").style.top = top-25+"px";
	document.getElementById("divFocus").style.display="block";
	}else if(indexId==100){
	 //_$("a_"+indexId).style.boxShadow="0px 0px 50px 10px black";
	// _$("a_"+indexId).style.border="3px solid #FFD700";
	 //_$("a_"+indexId).style.borderRadius="10px";
	document.getElementById("divMessImg").style.width = 600+"px";
	//document.getElementById("divMessImg").style.height = 480+"px";
	document.getElementById("divMess").style.left = left+"px";
	document.getElementById("divMess").style.top = top+"px";
	document.getElementById("divMess").style.display="block";
	}else{
	document.getElementById("divFocusImg1").style.width = width+54+"px";
	document.getElementById("divFocusImg1").style.height = height+62+"px";
	document.getElementById("divFocus1").style.left = left-18+"px";
	document.getElementById("divFocus1").style.top = top-23+"px";
	document.getElementById("divFocus1").style.display="block";
	}

     }else{
     _$("columnDiv_"+indexId).style.zIndex="1";
     _$("a_"+indexId).style.boxShadow="";
     _$("a_"+indexId).style.border="";
     _$("a_"+indexId).style.borderRadius="";
	 	document.getElementById("divFocus").style.display="none";
		document.getElementById("divMess").style.display="none";
		document.getElementById("divFocus1").style.display="none"
    	
    }
     _$("columnDiv_"+indexId).style.left=left+"px";
     _$("columnDiv_"+indexId).style.top=top+"px";
     _$("a_"+indexId).style.width=width+"px";
     _$("a_"+indexId).style.height=height+"px";

}
**/

function changeToImg(obj, img) {
	document.getElementById(obj).src = "images/"+img;
}



//cookie
function setCookie(c_name, value, expiredays, path) {
	var ck = c_name + "=" + escape(value);
	if (expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		ck = ck + ";expires=" + exdate.toGMTString();
	}
	if (path) {
		ck = ck + ";path=" + path;
	}
	document.cookie = ck;
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1)
				c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
function delCookie(name){
   var date = new Date();
   date.setTime(date.getTime() - 10000);
   document.cookie = name + "=a; expires=" + date.toGMTString();
}

//js 判断对象是否不为空  true非空 false空
function isNotBlank(obj){
	if( obj != null && typeof obj != "undefined" && obj != "" && (obj.length>0)){
		return true;
	}else{
		return false;
	}
}

//返回事件处理方法
function backPage(){
	//当backPath为空时则返回首页
	if(backPath=='' || backPath == null || backPath == 'undefined'){
		backPath =  getBackHome();
	} 	
	window.location.href = backPath;
}

//获取当前页面地址
function getCurrentPath(){
	return window.location.href;
}


//设置首页地址
function setBackHome(){
    var backHome = getCurrentPath();
	setCookie("backHome",backHome);
	//同时设置顶级页面地址
	setTopHome();
}	

//获取首页地址
function getBackHome(){
	return getCookie("backHome");
}

//设置顶级首页地址
function setTopHome(){
  var backTopHome = getCurrentPath();
	setCookie("backTopHome",backTopHome);
}

//获取顶级首页地址
function getTopHome(){
	return getCookie("backTopHome");
}


//设置上一页地址
function setPrevPage(){
	var prevPage = getCurrentPath();
	setCookie("prevPage",prevPage);
}

//获取上一页地址
function getPrevPage(){
    return getCookie("prevPage");
}

//设置当前菜单
function setCurrentMenu(obj,index){
	setCookie("currentPage",obj);
	document.getElementById("img_"+obj).src = "images/nav"+index+"b.png";
}

//选择菜单时切换
function changeMenu(obj,path) {
	
	//var currentPage = getCookie("currentPage");
	//if(obj!=currentPage){
		
		//goToPath(path);
	//}
}
/**
 * 获取天气
 * 说明：页面加上<iframe id="weather" src="weather/getWeather.jsp" ></iframe>
 */
function getWeather(){
	return document.getElementById("weatherIframe").contentWindow.weather;
}

function goToPath(path){
	window.location.href = path;
}

//设置首页光标位置 
function setMenuCursorId(menuCursorId){
	setCookie("menuCursorId",menuCursorId);//设置内容光标位置
}

//设置专题光标位置 
function setThemeCursorId(themeCursorId){
	setCookie("themeCursorId",themeCursorId);//设置内容光标位置
}

//设置内容光标位置 
function setContentCursorId(contentCursorId){
	setCookie("contentCursorId",contentCursorId);//设置内容光标位置
}
  
/*
 * 全屏播放指定视频，并返回请求页
 * 
 */
function fullVideo(videoCode){
    var returnUrl = getCurrentPath();
    var _epgDomain =  Authentication.CTCGetConfig("EPGDomain");
    var _last = _epgDomain.indexOf("/",10);
    var _host = _epgDomain.substr( 0, _last);
    var _videoUrl = _host+"/EPG/MediaService/FullScreen.jsp?ContentID="+ videoCode +"&CycleFlag=0&ReturnURL="+encodeURIComponent(returnUrl);
    window.location.href = _videoUrl;
}
