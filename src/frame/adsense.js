/**
* Created by zhaojm on 15/5/2.
*/
var Ads = Ads || {};

Ads.debug = false;


Ads.fullViewAds = function(rootDivId, closeCallback){
    var url = "http://googleads.g.doubleclick.net/pagead/ads?ad_type=image_flash&client=ca-games-pub-9474641572216293&description_url=http%3A%2F%2Fookor.com&videoad_start_delay=0&hl=zh_CN";
    //var url = "http://googleads.g.doubleclick.net/pagead/ads?ad_type=image_text_flash_video&client=ca-games-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&hl=en&max_ad_duration=40000&adtest=on";
    //var winSize = cc.winSize;
    var clientWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;
    var w = 360;
    var h = 360;
    var top = (clientHeight - h) / 2;
    var left = (clientWidth - w) / 2;
    (new Ads.AdSense(url, top, left, w, h, 'mainContainer', closeCallback)).show(true);
};

Ads.bottomAds = function(rootDivId, closeCallback){
    var url = "http://googleads.g.doubleclick.net/pagead/ads?ad_type=text&client=ca-games-pub-9474641572216293&description_url=http%3A%2F%2Fookor.com&videoad_start_delay=0&hl=zh_CN";
    //var url = "http://googleads.g.doubleclick.net/pagead/ads?ad_type=image_text_flash_video&client=ca-games-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&hl=en&max_ad_duration=40000&adtest=on";
    //var winSize = cc.winSize;
    var clientWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;
    var w = 360;
    var h = 100;
    //var top = (clientHeight - h) / 2;
    var left = (clientWidth - w) / 2;
    var top = clientHeight - h;
    (new Ads.AdSense(url, top, left, w, h, 'mainContainer', closeCallback)).show(false);
};




Ads.AdSense = cc.Class.extend({
    adsManager:null,
    adsLoader:null,
    adDisplayContainer:null,
    intervalTimer:null,

    adTagUrl:null,
    isFullScreen:null,
    top : null,
    left : null,
    width : null,
    height : null,



    //linearAdSlotWidth:null,
    //linearAdSlotHeight:null,
    //nonLinearAdSlotWidth:null,
    //nonLinearAdSlotHeight:null,
    //px:null,
    //py:null,


    videoContent:null,
    videoContentElement:null,
    adContainerDiv:null,
    mainContainerDiv : null,

    checkAddAdsTimer : null,

    closeCallback : null,

    rootDivId : null,

    ctor:function(url, top, left, w, h, rootDivId, closeCallback){
        console.log('ctor...');
        this.adTagUrl = url;
        this.top = top;
        this.left = left;
        this.width = w;
        this.height = h;
        this.userCloseCallback = closeCallback;
        this.rootDivId = rootDivId;

        this.init();
    },

    show:function(isFullScreen) {
        console.log('show..');
        this.isFullScreen = isFullScreen;


        this.createDiv(this.top, this.left, this.width, this.height, this.rootDivId, isFullScreen);

        this.checkAddAdsTimer = window.setInterval(this.addAds.bind(this), 1000);
        //egret.Ticker.getInstance().register(this.addAds, this, 1000);
    },

    init:function() {
        console.log('init..');
        window["googletag"] = window["googletag"]|| {};
        var googletag = window["googletag"];
        googletag.cmd = googletag.cmd || [];
        (function() {
            var gads = document.createElement('script');
            gads.id = 'imaSprite';
            gads.type = 'text/javascript';
            gads.src = 'http://s0.2mdn.net/instream/html5/ima3.js';
            var node = document.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(gads, node);

            //console.log('node==', node);

        })();
    },


    createDiv:function(top, left, w, h, rootDivId, isFullScreen) {
        console.log('createDiv');


        var clientWidth = document.body.clientWidth;
        var clientHeight = document.body.clientHeight;
        var scaleX = clientWidth / w;
        var scaleY = clientHeight / h;

        if(isFullScreen){

            scaleY = scaleX;
            var top = (scaleY - 1) * h / 2 + (clientHeight - h * scaleY) / 2;
            var left = (scaleX - 1) * w / 2 + (clientWidth - w * scaleX) / 2;
        }else{
            var scaleX = 1;
            var scaleY = 1;
        }

        if(!rootDivId){
            rootDivId = 'mainContainer';
        }

        this.mainContainerDiv = document.getElementById(rootDivId);
        if(this.mainContainerDiv) document.body.removeChild(this.mainContainerDiv);
        this.mainContainerDiv = document.createElement('div');
        this.mainContainerDiv.id = rootDivId;
        if(Ads.debug) {
            this.mainContainerDiv.style.backgroundColor = 'red';
        }
        this.mainContainerDiv.style.position = 'absolute';
        this.mainContainerDiv.style.width = w + 'px';
        this.mainContainerDiv.style.height = h + 'px';
        this.mainContainerDiv.style.transform = 'scale('+ scaleX + ',' + scaleY +')';
        //this.mainContainerDiv.style.top = top + 'px';
        //this.mainContainerDiv.style.left = left + 'px';
        this.mainContainerDiv.style.top = -clientHeight + 'px';
        this.mainContainerDiv.style.left = -clientWidth + 'px';
        //this.mainContainerDiv.style.margin = '0 auto';
        //this.mainContainerDiv.style.marginLeft = '-200px';
        //this.mainContainerDiv.style.marginTop = '-150px';
        document.body.appendChild(this.mainContainerDiv);



        this.videoContentElement = document.createElement('div');
        this.videoContentElement.id = 'content';
        //this.videoContentElement = document.getElementById('content');
        //this.videoContentElement.style.backgroundColor = 'blue';
        this.videoContentElement.style.position = 'absolute';
        this.videoContentElement.style.width = w + 'px';
        this.videoContentElement.style.height = h + 'px';
        this.videoContentElement.style.top = '0px';
        this.videoContentElement.style.left = '0px';
        this.mainContainerDiv.appendChild(this.videoContentElement);

        this.videoContent = document.createElement('video');
        this.videoContent.id = 'contentElement';
        this.videoContent.style.width = w + 'px';
        this.videoContent.style.height = h + 'px';
        this.videoContentElement.appendChild(this.videoContent);


        this.adContainerDiv = document.createElement('div');
        this.adContainerDiv.id = 'adContainer';
        //this.adContainerDiv = document.getElementById('adContainer');
        //this.adContainerDiv.style.backgroundColor = 'yellow';
        this.adContainerDiv.style.position = 'absolute';
        this.adContainerDiv.style.width = w + 'px';
        this.adContainerDiv.style.height = h + 'px';
        this.adContainerDiv.style.top = '0px';
        this.adContainerDiv.style.left = '0px';
        this.mainContainerDiv.appendChild(this.adContainerDiv);


        //this.mainContainerDiv = document.getElementById('mainContainer');
        //this.videoContent = document.getElementById('contentElement');
        //this.adContainerDiv = document.getElementById('adContainer');

    },



    addAds:function() {
        if (window["google"]) {
            //egret.Ticker.getInstance().unregister(this.addAds, this);
            window.clearInterval(this.checkAddAdsTimer);

            // 开始提出广告请求
            this.requestAds();
        }
    },




    requestAds:function() {
        // 创建广告显示容器。
        // 我们假设 adContainer 是
        // 将要容纳广告的元素的 DOM ID。
        //console.log('adContainerDiv=', this.adContainerDiv);
        this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainerDiv);

        // 如果 requestAds 在用户操作过程中调用，则初始化容器。
        // 仅在 iOS/Android 设备上需要此操作。
        //this.adDisplayContainer.initialize();
        // 创建广告加载器。
        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
        // 监听并响应已加载的广告和错误事件。
        this.adsLoader.addEventListener(
            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            this.onAdsManagerLoaded.bind(this),
            false);
        this.adsLoader.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            this.onAdError.bind(this),
            false);

        // 提出视频广告请求。
        var adsRequest = new google.ima.AdsRequest();
        adsRequest.adTagUrl = this.adTagUrl;

        // 指定线性和非线性广告位的尺寸。如果返回多个广告，这有助于 SDK
        // 选择正确的广告。

        adsRequest.linearAdSlotWidth = this.width;
        adsRequest.linearAdSlotHeight = this.height;

        adsRequest.nonLinearAdSlotWidth = this.width;
        adsRequest.nonLinearAdSlotHeight = this.height;

        this.adsLoader.requestAds(adsRequest);
    },



    onAdsManagerLoaded:function(adsManagerLoadedEvent) {
        // 获取广告管理器。
        this.adsManager = adsManagerLoadedEvent.getAdsManager(
            this.videoContent);  // 应被设置为内容视频元素

        // 为所需事件添加监听器。
        this.adsManager.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            this.onAdError.bind(this)
        );
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
            this.onContentPauseRequested.bind(this)
        );
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
            this.onContentResumeRequested.bind(this)
        );
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
            this.onAdEvent.bind(this)
        );

        // 如有必要，请监听其他任何事件。
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.LOADED,
            this.onAdEvent.bind(this)
        );
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.STARTED,
            this.onAdEvent.bind(this)
        );
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.COMPLETE,
            this.onAdEvent.bind(this)
        );

        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.PAUSED,
            this.onAdEvent.bind(this)
        );

        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.USER_CLOSE,
            this.onAdUserClose.bind(this)
        );

        try {
            // 初始化广告管理器。广告规则播放列表将在此时开始。
            this.adsManager.init(this.width, this.height, google.ima.ViewMode.NORMAL);
            // 调用播放以开始展示广告。单个视频和重叠式广告将
            // 在此时开始；广告规则将忽略此调用。
            this.adsManager.start();
        } catch (adError) {
            // 如果 VAST 响应存在问题，可能会引发错误。
            console.log('vast error...');
            console.log(adError);
            document.body.removeChild(this.mainContainerDiv);
            //this.closeCallback();
        }
    },

    onAdUserClose:function(){
        console.log('onAdUserClose');
        document.body.removeChild(this.mainContainerDiv);
        //this.closeCallback();
    },

    onAdEvent:function(adEvent) {
        console.log('adEvent Type:::::', adEvent.type);
        // 从事件检索广告。有些事件（例如 ALL_ADS_COMPLETED）
        // 没有相关联的广告对象。
        var self = this;
        var ad = adEvent.getAd();
        switch (adEvent.type) {
            case google.ima.AdEvent.Type.LOADED:
                // 这是为广告发送的第一个事件 - 可以
                // 确定该广告是视频广告还是重叠式广告。
                if (!ad.isLinear()) {
                    // 准确定位重叠式广告的 AdDisplayContainer。
                    // 使用 ad.width 和 ad.height。
                    console.log('ad..width...height...', ad.width, ad.height);
                }
                break;
            case google.ima.AdEvent.Type.STARTED:
                // 此事件表示广告已启动 - 视频播放器
                // 可以调整用户界面，例如显示暂停按钮和
                // 剩余时间。
                if (ad.isLinear()) {
                    // 对于线性广告，可以启动计时器来查看
                    // 剩余时间。
                    this.intervalTimer = setInterval(
                        function () {
                            var remainingTime = self.adsManager.getRemainingTime();
                            console.log('remaingTime==', remainingTime);
                        },
                        300); // every 300ms
                }

                // TODO 根div的位置调整
                this.mainContainerDiv.style.top = this.top + 'px';
                this.mainContainerDiv.style.left = this.left + 'px';





                break;
            case google.ima.AdEvent.Type.COMPLETE:
                // 此事件表示广告已完成 - 视频播放器
                // 可以执行相应的用户界面操作，例如删除
                // 剩余时间检测的定时器。
                if (ad.isLinear()) {
                    clearInterval(this.intervalTimer);
                }
                console.log('on complete...');
                //document.body.removeChild(this.mainContainerDiv);
                break;
        }
    },


    onAdError:function(adErrorEvent) {
        // 处理错误日志记录。
        console.log(adErrorEvent.getError());
        document.body.removeChild(this.mainContainerDiv);
        //this.closeCallback();
    },

    onContentPauseRequested:function() {
        this.videoContent.pause();
        // 您应该使用此函数设置用户界面来展示广告（例如
        // 展示广告计时器倒计时、停用搜寻等）
        // setupUIForAds();
    },

    onContentResumeRequested:function() {
        this.videoContent.play();
        // 您应该使用此函数确保用户界面已准备好
        // 播放内容。发布商负责
        // 在必要时实施此函数。
        // setupUIForContent();

    },

});

