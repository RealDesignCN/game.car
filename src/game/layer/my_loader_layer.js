/**
 * Created by zhaojm on 15/3/21.
 */
game.MyLoaderLayer = cc.LayerColor.extend({

    _loadingBar : null,
    _label : null,
    _spriteSheet : null,

    _startItem : null,

    _percent : null,

    ctor:function(){
        this._super(new cc.Color(43, 43, 43));

        var self = this;
        var winSize = cc.winSize;



        this._percent = cc.LabelTTF.create('LOADING...', 'Arial', 15);
        this._percent.setColor(new cc.Color(231, 231, 231));
        this._percent.setPosition(cc.p(winSize.width * 0.5, winSize.height  * 0.5));
        this._percent.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._percent);

        var loader_bar = new cc.Sprite(loaderRes.loading_bar_png);
        this.addChild(loader_bar);
        loader_bar.x = winSize.width/2;
        loader_bar.y = winSize.height/2;
        loader_bar.runAction(new cc.RepeatForever(new cc.RotateBy(1, 360)));
        loader_bar.setScale(1.5);

        //var bg = new cc.Sprite(loaderRes.loader_bg_jpg);
        //bg.setPosition(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.5));
        ////this._spriteSheet.addChild(bg);
        //this.addChild(bg);

        //cc.spriteFrameCache.addSpriteFrames(loaderRes.loader_plist);
        //this._spriteSheet = new cc.SpriteBatchNode(loaderRes.loader_png);
        //this.addChild(this._spriteSheet);



        //var load_bar_bg = new cc.Sprite('#bar_bg.png');
        //this._spriteSheet.addChild(load_bar_bg);
        //load_bar_bg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.15));


        //this._loadingBar = new cc.Sprite('#bar_front.png');
        //this._spriteSheet.addChild(this._loadingBar);
        //this._loadingBar.setAnchorPoint(cc.p(0, 0.5));
        //this._loadingBar.setPosition(cc.p(cc.winSize.width / 2 - this._loadingBar.getContentSize().width / 2, cc.winSize.height * 0.15));
        //this._loadingBar.setScaleX(0);



        //var startFrame = cc.spriteFrameCache.getSpriteFrame('btn_start.png');
        //this._startItem = new cc.MenuItemImage(startFrame, startFrame, startFrame,  function(){
        //
        //    game.init();
        //    cc.director.runScene(new game.GameScene());
        //
        //
        //}, this);
        //this._startItem.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.3);
        ////this._startitem.setVisible(false);
        //this._startItem.runAction(new cc.FadeOut(0.1));


        //var moreFrame = cc.spriteFrameCache.getSpriteFrame("ookor.png");
        //var moreItem = new cc.MenuItemImage(moreFrame, moreFrame, moreFrame, function(){
        //
        //    if(game._Config.language == game._Enum.language.en){
        //        window.location.href="http://ookor.com";
        //    }else {
        //        window.location.href="http://www.59600.com";
        //    }
        //
        //}, this);
        //moreItem.setPosition(cc.p(cc.winSize.width - 20, cc.winSize.height - 20));
        //moreItem.setAnchorPoint(cc.p(1,1));

        //var menu = new cc.Menu();
        //menu.addChild(this._startItem);
        //menu.addChild(moreItem);
        //this.addChild(menu);
        //menu.setPosition(0, 0);



        cc.loader.load(g_resources,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                self._percent.setString(percent + "%");
                //self.loadingBar.setPercentage(percent * 100);
                //self._loadingBar.setScaleX(percent / 100);


            }, function () {

                self._percent.setString('100%');

                //self._loadingBar.setScaleX( 1);
                //
                //self._startItem.runAction(new cc.FadeIn(2));

                cc.director.runScene(new game.GameScene());

            });
    },


});