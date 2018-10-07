/**
 * 导航到指定页面
 * @param pageName
 * @param defaultUrl
 * @param paramter
 * @constructor
 */
function GoToPage(pageName,defaultUrl,paramter) {
  var theParamterArray=[];
  for(var key in paramter){
    theParamterArray.push(key+'='+paramter[key]);
  }
  location.href=defaultUrl+"?"+theParamterArray.join('&');
}
