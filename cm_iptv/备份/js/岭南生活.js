
        onload = function () {
            ai.post({
                url: 'Hotel/GetHotelCategoryList',
                data: {
                    // jgid: 296566,
                    // itvAccount: "tv_20180822004",
                    jgid: ai.GetQueryString('jgid'),
                    itvAccount: ai.GetQueryString('itvAccount'),
                },
                load: function (json) {
                    if (json.ResultCode == 1000) {
                        var res = json.Data;
                        if (!res.length) {
                            document.querySelector('.manuBox').innerHTML = '暂无商品';
                            document.querySelector('.manuBox').setAttribute('style','justify-content: center;align-items: center;');
                            return false
                        }
                        var htmlStr = '';
                        res.forEach(function (item) {
                            htmlStr += ' <div class="mlist" data-id="' + item.Id + '">' + item.Title +
                                '</div>'
                        })
                        document.querySelector('.menulist').innerHTML = htmlStr;
                        document.querySelector('.jdName').innerHTML = res[0].DisplayName;
                        initStyle();
                        menuList[0].classList.add('activte');
                        id = menuList[0].dataset.id;
                        shopList1(id)
                    } else {

                        console.log(json.Message)
                    }
                }
            })

            function shopList1(id) {
                ai.post({
                    url: 'Hotel/GetHotelGoodsList',
                    data: {
                        // jgid: 296566,
                        // itvAccount: "tv_20180822004",
                        jgid: ai.GetQueryString('jgid'),
                        itvAccount: ai.GetQueryString('itvAccount'),
                        cid: id
                    },
                    load: function (json) {
                        if (json.ResultCode == 1000) {
                            document.querySelector('.shopList').scrollTop = 0;
                            // scroll(0)
                            groupHtml = template('groupTpl', {
                                data: {
                                    res: json.Data
                                }
                            })
                            document.querySelector('.shopList').innerHTML = groupHtml;
                        } else {
                            console.log(json.Message)
                        }
                    }
                })
            }
            var menuList = document.getElementsByClassName('mlist');
            var menuLisLength = menuList.length - 1;
            var shopList = document.getElementsByClassName('slist');
            var shopListLength = shopList.length - 1;
            console.log(menuList);
            var i = 0;
            var s = 0;

            function initStyle() { //初始化样式
                for (var j = 0; j <= menuList.length - 1; j++) {
                    menuList[j].classList.remove('activte')
                }
            }

            function collectStyleInit() { /*商品样式初始化*/
                for (var x = 0; x <= shopList.length - 1; x++) {
                    shopList[x].classList.remove('activte')
                }
            }
            window.document.onkeypress = document.onirkeypress = function (event) {
                event = event ? event : window.event;
                var keyCode = event.which ? event.which : event.keyCode;
                var slist = document.getElementsByClassName('slist');
                var mlist = document.getElementsByClassName('mlist')
                var aid, bid, sid, shopInfo, num, shopTrue;
                event.preventDefault()
                event.stopPropagation();

                for (var d = 0; d < slist.length; d++) {
                    if (slist[d].getAttribute("class") != 'slist') {
                        shopTrue = true;
                        num = d;
                        sid = slist[d].dataset.id
                        shopInfo = slist[d].dataset;
                        break;
                    }
                }
            
                if (keyCode == 39) { //右
        
                    console.log('you')               
                    right()
                    //ai.cue(s)
                }
                if (keyCode == 37) { //左
                    console.log('zuo')
                    left()
                }
                if (keyCode == 38) { //上
                    console.log('up')
                    up()
                }
                if (keyCode == 40) { //下
                    down()
                    //ai.cue(i)
                    // ai.cue(s)
                    console.log(event)
                }
                if (keyCode == 13) {
                    // var slist = document.getElementsByClassName('slist');
                    // var mlist = document.getElementsByClassName('mlist')
                    // var shopTrue = '';
                    // var sid;
                    // var shopInfo;
                    // for (var d = 0; d < slist.length; d++) {
                    //     if (slist[d].getAttribute("class") != 'slist') {
                    //         shopTrue = true;
                    //         num = d;
                    //         sid = slist[d].dataset.id
                    //         shopInfo = slist[d].dataset;
                    //         break;
                    //     }
                    // }
                    if (shopTrue) {
                        location.href = ai.forward('./detail.html?jgid=' + ai.GetQueryString('jgid') +
                            '&itvAccount=' + ai.GetQueryString('itvAccount') + '&id=' + sid + '&title=' +
                            shopInfo.title + '&imgsrc=' + shopInfo.img + '&price=' + shopInfo.price + ''+'&Stock=' + shopInfo.stock +'')
                    }

                }
                if (keyCode == 8 || keyCode == 24 || keyCode == 32) { /*返回键*/
                    location.href = ai.forward('http://211.139.180.160:8090/GDEpg/epg/login!index.action?itvAccount='+ai.GetQueryString('itvAccount'))
            }

                function down() {
                    // var slist = document.getElementsByClassName('slist');
                    // var mlist = document.getElementsByClassName('mlist')
                    // var shopTrue = '';
                    // var num;
                    // var aid, bid;
                    // for (var d = 0; d < slist.length; d++) {
                    //     if (slist[d].getAttribute("class") != 'slist') {
                    //         shopTrue = true;
                    //         num = d;
                    //         break;
                    //     }
                    // }

                    if (shopTrue) {
                        if (num == shopList.length || num == shopList.length - 1 || num == shopList.length - 2 ||
                            num == shopList.length - 3) {
                            s = num;
                            collectStyleInit()
                            shopList[s].classList.add('activte');
                        } else {

                            if (s + 4 > shopList.length - 1) {
                                s = num;
                                collectStyleInit()
                                shopList[s].classList.add('activte');
                            } else {
                                s = num + 4;
                                collectStyleInit()
                                shopList[s].classList.add('activte');
                                // scroll()
                                scroll(shopList[s].offsetTop - 110);
                            }

                        }
                        console.log(num, 2323)
                    } else {
                        if (i >= mlist.length - 1) {
                            i = mlist.length - 1;
                            initStyle()
                            menuList[i].classList.add('activte');

                        } else {
                            i++;
                            // ++i;
                            initStyle()
                            menuList[i].classList.add('activte');
                            for (var d = 0; d < mlist.length; d++) {
                                if (mlist[d].getAttribute("class") != 'mlist') {
                                    bid = mlist[d].dataset.id
                                    break;
                                }
                            }
                            setTimeout( shopList1(bid),1000)
                           
                        }
                    }
                }

                function right() {
                    // var slist = document.getElementsByClassName('slist');
                    // var shopTrue = '';
                    // var num;
                    // for (var d = 0; d < slist.length; d++) {
                    //     if (slist[d].getAttribute("class") != 'slist') {
                    //         shopTrue = true;
                    //         num = d;
                    //         break;
                    //     }
                    // }
                    if (shopTrue) {
                        if (num == 3 || num % 4 == 3) {
                            s = num;
                            collectStyleInit()
                            shopList[s].classList.add('activte');
                        } else if (num == slist.length - 1) {
                            s = num;
                            collectStyleInit()
                            shopList[s].classList.add('activte');
                        } else {
                            s++;
                            collectStyleInit()
                            shopList[s].classList.add('activte');

                        }
                    } else {
                        collectStyleInit()
                        s = 0;
                        shopList[s].classList.add('activte')
                    }
                }

                function up() {
                    // var slist = document.getElementsByClassName('slist');
                    // var mlist = document.getElementsByClassName('mlist')
                    // var shopTrue = '';
                    // var num;
                    // for (var d = 0; d < slist.length; d++) {
                    //     if (slist[d].getAttribute("class") != 'slist') {
                    //         shopTrue = true;
                    //         num = d;
                    //         break;
                    //     }
                    // }
                    if (shopTrue) {
                        if (num == 0 || num == 1 || num == 2 || num == 3) {
                            s = num;
                            collectStyleInit()
                            shopList[s].classList.add('activte');
                        } else {
                            s = num - 4;
                            collectStyleInit()
                            shopList[s].classList.add('activte');
                            scroll(shopList[s].offsetTop - 110);
                            // contentTop($(shopList).eq(s).offset().top-100)
                        }
                    } else {
                        initStyle()
                        if (i <= 0) {
                            i = 0;
                            menuList[i].classList.add('activte')
                        } else {
                            i--;
                            menuList[i].classList.add('activte')
                            for (var d = 0; d < mlist.length; d++) {
                                if (mlist[d].getAttribute("class") != 'mlist') {
                                    bid = mlist[d].dataset.id
                                    break;
                                }
                            }
                            setTimeout(shopList1(bid),1000)
                        }



                    }

                }

                function left() {
                    // var slist = document.getElementsByClassName('slist');
                    // var shopTrue = '';
                    // var num;
                    // for (var d = 0; d < slist.length; d++) {
                    //     if (slist[d].getAttribute("class") != 'slist') {
                    //         shopTrue = true;
                    //         num = d;
                    //         break;
                    //     }
                    // }
                    if (shopTrue) {
                        if (num == 0 || num % 4 == 0) {
                            s = num;
                            collectStyleInit()
                        } else {
                            s--
                            collectStyleInit()
                            shopList[s].classList.add('activte')
                        }
                    } else {
                        initStyle()
                        menuList[i].classList.add('activte')
                    }

                }

                function scroll(scrollTop) {
                    // document.querySelector('.shopList').scrollTo(0, scrollTop)
                    document.querySelector('.shopList').scrollTop = scrollTop;
                }

            }
        }
    