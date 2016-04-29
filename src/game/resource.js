



var loadingRes = {
    loading_png : "res/" + game._Config.language + "/loading.png"
};

var loaderRes = {
    //loader_plist : "res/" + game._Config.language + "/plist/loader.plist",
    //loader_png : "res/" + game._Config.language + "/plist/loader.png",
    //loader_bg_jpg : "res/" + game._Config.language + "/jpg/loader_bg.jpg",
    loading_bar_png : "res/common/loading_bar.png",
};

var res = {

    //camera_png : "res/common/camera.png",
    bg_jpg : "res/common/jpg/bg.jpg",
    hero_png : "res/common/hero.png",
    bottom_bg_jpg : "res/common/bottom_bg.jpg",
    top_bg_jpg : "res/common/top_bg.jpg",

    right_btn_png : "res/common/right_btn.png",
    pause_btn_png : 'res/common/pause_btn.png',
    
    car_0_png : "res/common/car/0.png",
    car_1_png : "res/common/car/1.png",
    car_2_png : "res/common/car/2.png",
    car_3_png : "res/common/car/3.png",
    car_4_png : "res/common/car/4.png",

    oil_bar_png : "res/common/oil_bar.png",

    restart_png : "res/common/restart.png",
    share_png : "res/common/share.png",
    quit_png : "res/common/quit.png",
    retry_png : "res/common/retry.png",


    newcar1_png : 'res/common/newcar1.png',
    newcar2_png : 'res/common/newcar2.png',

    superman_png : "res/common/superman.png",

    pause_png : 'res/common/pause.png',
    lose_png : 'res/common/lose.png',
};


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

//cc.log(g_resources);


var g_loaderResources = [];
for (var i in loaderRes) {
    g_loaderResources.push(loaderRes[i]);
}
