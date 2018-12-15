
/**
 * 数字化为金钱格式,千分位
 * @param num
 * @returns {string|*}
 */
function toMoney(num){
  if(!num) {
    console.log('toMoney:参数不能为空');
    return
  }
  num = num.toFixed(2);
  num = parseFloat(num)
  num = num.toLocaleString();
  return num;//返回的是字符串23,245.12保留2位小数
}

/**
 * 数字转换成xx万
 * @param num
 * @returns {number|*}
 */
function toWan(num) {
  if(!num) {
    console.log('toWan:参数不能为空');
    return
  }
  var spanDom = '';
  if(num>=1000) {
    spanDom = '<span>万</span>';
    num = (num/10000).toFixed(1);
  }
  // result = val>=10000?Math.round(val/10000):val;
  return num + spanDom
}

/**
 * 返回今天或者指定日期
 * @param detract 减去的天数
 * @returns {string}
 */
function returnDate(detract) {
  var myDate = new Date();
  var y,m,d;
  if(!detract) {
    y = myDate.getFullYear();
    m = myDate.getMonth() + 1;
    d = myDate.getDate();
    return y+'-'+m+'-'+d;
  } else {
    var sec = 24*60*60*1000*detract;
    var theDate = new Date(myDate.getTime()-sec);
    y = theDate.getFullYear();
    m = theDate.getMonth() + 1;
    d = theDate.getDate();
    return y+'-'+m+'-'+d;
  }
}