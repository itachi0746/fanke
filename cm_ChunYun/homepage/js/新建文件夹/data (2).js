function PlacePointView(theMap) {
    var placeData = '客运站,福田汽车客运站CBG,福田汽车客运站CBG:114.013401,22.532431;\n' +
    '客运站,龙岗长途汽车客运站,龙岗长途汽车客运站:114.271555,22.724456;\n' +
    '客运站,罗湖汽车站,罗湖汽车站:114.119196,22.530169;\n' +
    '机场,深圳宝安国际机场,深圳宝安国际机场0:113.814549,22.63336;\n' +
    '铁路,深圳北站,深圳北站0:114.029113,22.609725;\n' +
    '客运站,深圳汽车站,深圳汽车站:114.089725,22.568639;\n' +
    '铁路,深圳西站,深圳西站0:113.907306,22.527573;\n' +
    '铁路,深圳站,深圳站0:114.11768,22.53199;\n' +
    '机场,白云国际机场二号航站楼,广州白云国际机场T2航站楼0:113.30558,23.395977;\n' +
    '客运站,广东省汽车客运站,广东省汽车客运站:113.252621,23.148364;\n' +
    '机场,广州白云国际机场,广州白云国际机场0:113.307648,23.389627;\n' +
    '铁路,广州北站,广州北站0:113.203794,23.377405;\n' +
    '铁路,广州东站,广州东站0:113.3249,23.150566;\n' +
    '客运站,广州芳村汽车客运站,广州芳村汽车客运站:113.235082,23.079645;\n' +
    '铁路,广州南站,广州南站0:113.268586,22.987472;\n' +
    '客运站,广州市汽车客运站,广州市汽车客运站:113.252132,23.146737;\n' +
    '客运站,广州市天河客运站,广州市天河客运站:113.342309,23.170892;\n' +
    '铁路,广州站,广州站0:113.257291,23.149415;\n' +
    '客运站,茂名市客运中心站,茂名市客运中心站:110.925976,21.645277;\n' +
    '机场,湛江机场,湛江机场0:110.363507,21.212952;\n' +
    '港口,湛江徐闻海安港,海安港0:110.235751,20.265909;\n' +
    '客运站,香洲长途站,香洲长途站:113.567377,22.279407;\n' +
    '客运站,佛山汽车站,佛山汽车站:113.110902,23.041469;\n' +
    '客运站,河源汽车总站,河源汽车总站:114.692044,23.737577;\n' +
    '机场,揭阳机场,揭阳机场0:116.509274,23.546361;\n' +
    '客运站,中山汽车总站,中山汽车总站:113.342613,22.521965;\n' +
    '客运站,中山小榄客运站,小榄车站:113.257901,22.671356;\n' +
    '客运站,江门汽车客运站,广东省江门汽车总站:113.066064,22.630537;\n' +
    '客运站,惠州汽车总站,惠阳汽车客运总站:114.460283,22.8141;\n' +
    '铁路,惠州站,惠州站0:114.416115,23.151307;\n' +
    '铁路,东莞东,东莞东站0:114.039355,22.967849;\n' +
    '客运站,东莞汽车总站,东莞总站:113.716865,23.031193;\n' +
    '铁路,东莞站,东莞站0:113.858658,23.088768;\n' +
    '客运站,东莞长安车站,长安汽车站:113.822428,22.800907;\n' +
    '铁路,虎门站,虎门站0:113.673238,22.860575;\n' +
    '铁路,潮汕站,潮汕站0:116.588171,23.539591;\n' +
    '客运站,潮州汽车客运站,潮州粤运汽车总站:116.635081,23.665183;\n' +
    '客运站,清远汽车客运站,清远市城北汽车客运站:113.003648,23.723292;\n' +
    '服务区,梁金山服务区-向东北,梁金山服务区:112.684761,22.450952;\n' +
    '服务区,梁金山服务区-向西南,梁金山服务区:112.684761,22.450952;\n' +
    '服务区,雅瑶服务区-向北,雅瑶服务区:112.989548,22.716462;\n' +
    '服务区,雅瑶服务区-向南,雅瑶服务区:112.989548,22.716462;\n' +
    '服务区,源潭服务区-向北,源潭服务区:113.228876,23.685219;\n' +
    '服务区,安塘服务区-向东,安塘服务区:112.185457,22.939435;\n' +
    '服务区,安塘服务区-向西,安塘服务区:112.185457,22.939435;\n' +
    '服务区,莲花山服务区-向东,莲花山服务区:115.111965,22.945835;\n' +
    '服务区,莲花山服务区-向西,莲花山服务区:115.111965,22.945835;\n' +
    '服务区,阳江服务区-向东,阳江服务区:111.953984,21.905044;\n' +
    '服务区,阳江服务区-向西,阳江服务区:111.953984,21.905044;\n' +
    '服务区,黎溪服务区-向东北,黎溪服务区:113.226716,23.976683;\n' +
    '服务区,黎溪服务区-向西南,黎溪服务区:113.226716,23.976683;\n' +
    '服务区,勒流服务区-向东,勒流服务区:113.165069,22.840909;\n' +
    '服务区,勒流服务区-向西,勒流服务区:113.164784,22.842427;\n' +
    '服务区,顺德服务区-向北,顺德服务区:113.26996,22.917663;\n' +
    '服务区,顺德服务区-向南,顺德服务区:113.26996,22.917663;\n' +
    '服务区,热水服务区-向东北,热水服务区:114.749369,23.822234;\n' +
    '服务区,热水服务区-向西南,热水服务区:114.749369,23.822234;\n' +
    '服务区,石坝服务区-向东,石坝服务区:114.63243,23.522732;\n' +
    '服务区,石坝服务区-向西,石坝服务区:114.63243,23.522732;\n' +
    '服务区,泰美服务区-向北,泰美服务区:114.48812,23.331663;\n' +
    '服务区,泰美服务区-向南,泰美服务区:114.48812,23.331663;\n' +
    '服务区,龙甫服务区-向南,龙甫服务区:112.714114,23.377723;\n' +
    '服务区,龙甫服务区-向北,龙甫服务区:112.714114,23.377723;\n' +
    '服务区,电白服务区-向西,电白服务区1:111.057489,21.629581;\n' +
    '服务区,电白服务区-向东,电白服务区0:111.057691,21.628508;\n' +
    '服务区,沙埔服务区-向西,沙埔服务区1:113.676465,23.18926;\n' +
    '服务区,沙埔服务区-向东,沙埔服务区0:113.675306,23.187154;\n' +
    '服务区,广州花城服务区-向南,花城服务区0:113.313094,23.503159;\n' +
    '收费站,清远西收费站,清远西收费站(G4W2许广高速北向)1:113.023031,23.660808;\n' +
    '"收费站,广园收费站,广园收费站(S15沈海高速广州支线入口)0:113.273612,23.158289;\n' +
    '收费站,三元里收费站,三元里收费站(S41机场高速出口)0:113.256076,23.158451;\n' +
    '收费站,勒流收费站,勒流收费站(G1501广州绕城高速出口北滘方向)0:113.187256,22.844037;\n' +
    '收费站,沙贝收费站,沙贝收费站(S15沈海高速广州支线出口)0:113.194773,23.154628;\n' +
    '收费站,佛山罗格收费站,罗格收费站(S5广明高速西向)0:113.011973,22.991334;\n' +
    '高速,莞佛高速虎门大桥,虎门大桥0:113.605895,22.784986;\n' +
    '高速,广佛高速沙贝立交,广佛高速公路主路跨线桥0:113.162358,23.135771;\n' +
    '高速,长深高速惠州段,S25长深高速惠州支线6:114.347452,23.002513;\n' +
    '高速,沈海高速广州黄村立交,黄村立交桥0:113.396634,23.151224;\n' +
    '高速,大广高速与机场高速连接段,机场立交与G45大广高速交叉口5:113.277728,23.351933;\n' +
    '高速,济广高速金龙大道出入口,石湾大道与G35济广高速出口交叉口9:113.913166,23.196854;\n' +
    '高速,京港高速广汕公路出入口,广汕公路与G4京港澳高速出口交叉口6:113.48691,23.21447;\n' +
    '高速,粤赣高速小金口到热水段,未找到位置;\n' +
    '高速,京珠北高速,G4京港澳高速5:113.692056,24.260996;\n' +
    '高速,华南快速,华南快速0:113.337019,23.027507;\n' +
    '高速,广深高速,S3广深沿江高速入口(西北向)9:113.561042,23.027907;\n' +
    '高速,花都白云机场高速,S41机场高速出口(北向)5:113.297704,23.365975;';
    var newarr = [];
    this.newarr2 = [];
    this.markes = [];
    this.theMap = theMap;
    var placeArr = placeData.split(';');
    for (var k = 0; k < placeArr.length; k++) {
        var pl = placeArr[k];
        var tr = pl.trim();
        // console.log(tr);
        newarr.push(tr);
        // newarr = tr.split(',')
    }
    //
    for (var m = 0; m < newarr.length; m++) {
        var obj = newarr[m];
        var tempArr = obj.split(',');
        var temp = tempArr[2] + ',' + tempArr[3];
        temp = temp.split(':')[1];
        this.newarr2.push({
            '类型': tempArr[0],
            '名称': tempArr[1],
            '坐标': temp
        })

    }
   
}
PlacePointView.prototype.getPlacePoints = function (pointType) {
    var thePlaces = [];
    for (var i = 0; i < this.newarr2.length; i++) {
        var thePlace = this.newarr2[i];
        if (thePlace['类型'] == pointType) {
            thePlaces.push(thePlace);
        }
    }
    return thePlaces;
}
PlacePointView.prototype.removePoints = function () {
    this.theMap.remove(this.markes);
    this.markes = [];
}
PlacePointView.prototype.showPoints = function (pointType) {
    this.removePoints();
    var thePlaces = this.getPlacePoints(pointType);
    if (!thePlaces) {
        console.log("未找到点!");
        return;
    }
    for (var i = 0; i < thePlaces.length; i++) {
        var thePlace = thePlaces[i];
        var theName = thePlace['名称'];
        var theLntLatStr = thePlace['坐标'];
        if (!theLntLatStr) {
            console.log(theName + "坐标错误!");
        }
        var theLntLats = theLntLatStr.split(',');
        var marker = new AMap.Marker({
            position: new AMap.LngLat(theLntLats[0], theLntLats[1]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: theName
        });
        this.markes.push(marker);
        theMap.add(marker);
    }
  
}
