function setDate(){
			//年月日
			var currentTime = new Date();
			var year = currentTime.getFullYear();
			var mon = currentTime.getMonth()+1;
			var date = currentTime.getDate();
			var hours = currentTime.getHours();
			var min = currentTime.getMinutes();
			if(mon < 10){
				mon="0"+mon
			}
			if(date < 10){
				date="0"+date
			}
			if(hours < 10){
				hours="0"+hours
			}
			if(min < 10){
				min="0"+min
			}
			document.getElementById("dayInfo").innerHTML = year + "/" + mon + "/" + date ;
			document.getElementById("timeInfo").innerHTML = hours + ":" + min ;
			setTimeout("setDate()", 60000);
	}	

//根据日期获取 星期几
function getWeek(dateStr){
	dateStr = dateStr.replace(/-/g,"/");
	var date = new Date(dateStr)
	var show_day=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
	return show_day[date.getDay()];
}
//日期格式化
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
} 
// 根据当前日期 获取前后N 天的日期 格式 20180305
function getDateFormat(AddDayCount){
	var date = new Date(); 
	date.setDate(date.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	var dateFormat = date.format("yyyyMMdd");
	return dateFormat;
}

// 根据当前日期 获取前后N 天的日期 格式2018-3-5
function GetDateStr(AddDayCount) { 
   var dd = new Date(); 
   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
   var y = dd.getFullYear(); 
   var m = dd.getMonth()+1;//获取当前月份的日期 
   var d = dd.getDate(); 
   return y+"-"+m+"-"+d; 
} 