
function getKeyBoardType(keyval) {
  console.log(keyval)
  switch (keyval) {
    case 13:
      return 'OK';
    /*---- return ----*/
    // case 315: /* EC668 */
    // case 283: /* S7200 */
    // case 8: /* S1308 */
    case 109: /* ie M */
    case 8 /* ZXV10 B700(V2A) */:
    case 28:
    case 32:
      return 'BACK';

    /*---- up ----*/
    // case 133: /* EC668 */
    // case 269: /* S7200 */
    // case 0x0026: /* S1308 */
    case 119: /* ie W */
    case 38 /* ZXV10 B700(V2A) */:
      return 'UP';

    /*---- down ----*/
    // case 134: /* EC668 */
    // case 270: /* S7200 */
    // case 0x0028: /* S1308 */
    case 115: /* ie S */
    case 40 /* ZXV10 B700(V2A) */:
      return 'DOWN';

    /*---- left ----*/
    // case 135: /* EC668 */
    // case 271: /* S7200 */
    // case 0x0025: /* S1308 */
    case 97: /* ie A */
    case 37 /* ZXV10 B700(V2A) */:
      return 'LEFT';

    /*---- right ----*/
    // case 136: /* EC668 */
    // case 272: /* S7200 */
    // case 0x0027: /* S1308 */
    case 100: /* ie D */
    case 39 /* ZXV10 B700(V2A) */:
      return 'RIGHT';

    /*---- page up ----*/
    // case 150: /* EC668 */
    // case 301: /* S7200 */
    // case 0x0021: /* S1308 */
    case 98: /* ie B */
    case 33 /* ZXV10 B700(V2A) */:
      return 'PUP';

    /*---- page down ----*/
    // case 151: /* EC668 */
    // case 302: /* S7200 */
    // case 0x0022: /* S1308 */
    case 110: /* ie N */
    case 34 /* ZXV10 B700(V2A) */:
      return 'PDOWN';

    // /*---- number down ----*/
    case 49 /* ZXV10 B700(V2A) || ie Num1 */:
      return '1';
    case 50 /* ZXV10 B700(V2A) || ie Num2 */:
      return '2';
    case 51 /* ZXV10 B700(V2A) || ie Num3 */:
      return '3';
    case 52 /* ZXV10 B700(V2A) || ie Num4 */:
      return '4';

    // /*----  平台事件  ----*/
    case 768 /*  能力平台视频播放结束后返回按键值 */:
      return 'MEDIA_END';
    // case 53: /* ZXV10 B700(V2A) || ie Num5 */
    // case 54: /* ZXV10 B700(V2A) || ie Num6 */
    // case 55: /* ZXV10 B700(V2A) || ie Num7 */
    // case 56: /* ZXV10 B700(V2A) || ie Num8 */
    // case 57: /* ZXV10 B700(V2A) || ie Num9 */
    // if(typeof(Key_Number)!="undefined"&&Key_Number!=null) { return
    // Key_Number(keyval);}else{ return NumberDefault(keyval); }
    // /*---- F1 ----*/
    // case 1028: /* EC668 */
    // case 160: /* S7200 */
    // case 0x0070: /* S1308 */
    // if(typeof(Key_F1)!="undefined"&&Key_F1!=null) { return
    // Key_F1();}else{ return 1; }
    //
    // /*---- F2 ----*/
    // case 1026: /* EC668 */
    // case 161: /* S7200 */
    // case 0x0071: /* S1308 */
    // if(typeof(Key_F2)!="undefined"&&Key_F2!=null) { return
    // Key_F2();}else{ return 1; }
    //
    // /*---- F3 ----*/
    // case 1027: /* EC668 */
    // case 162: /* S7200 */
    // case 0x0072: /* S1308 */
    // if(typeof(Key_F3)!="undefined"&&Key_F3!=null) { return
    // Key_F3();}else{ return 1; }
  }

  return keyval; /* 返回1交回机定盒处理 */
}

function GetQueryString (name, url) {
  var search = window.location.search;
  if (url) {
    search = url.substring(url.indexOf('?'))
  }

  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = search.substr(1).match(reg);
  if (r !== null) return (r[2]);
  return null
}