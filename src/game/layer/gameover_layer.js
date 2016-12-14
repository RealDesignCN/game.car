/**
 * Created by zhaojm on 15/4/5.
 */
game.GameOverLayer = cc.Layer.extend({

    _score : null,
    ctor:function(data){
        this._super();
        var self = this;

        //if(game._Config.show_ads && game._Config.language == game._Enum.language.en) {
        //    Ads.fullViewAds(function(){
        //        //clearInterval(timer);
        //        //runScene();
        //    });
        //}

        var node = new cc.Node();

        var bg = new cc.Sprite(res.bottom_bg_jpg);
        var bgSize = bg.getContentSize();
        bg.setPosition(bgSize.width / 2, bgSize.height / 2);
        node.addChild(bg);
        node.setContentSize(bgSize);

        var txt = new cc.Sprite(res.lose_png);
        txt.attr({
            x : bgSize.width * 0.7,
            y : bgSize.height * 0.7
        });
        node.addChild(txt);


        var self = this;
        var restartItem = new cc.MenuItemImage(res.restart_png,res.restart_png, res.restart_png, function(){
            cc.director.runScene(new game.GameScene());
        }, this);
        restartItem.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.15));
        restartItem.setAnchorPoint(cc.p(0.5,0));


        var shareItem = new cc.MenuItemImage(res.share_png,res.share_png, res.share_png, function(){
            cc.log('share...');
            window.location.href="http://mingz.me";
        }, this);
        shareItem.setPosition(cc.p(bgSize.width * 0.8, bgSize.height * 0.15));
        shareItem.setAnchorPoint(cc.p(0.5,0));


        var menu = new cc.Menu(restartItem, shareItem);
        //menu.alignItemsVertically();
        menu.setPosition( cc.p(0, 0));
        menu.setContentSize(bgSize);
        node.addChild(menu);

        this.addChild(node);
        node.setPosition(0, -bgSize.height);
        node.runAction(new cc.MoveTo(1, cc.p(0, 0)).easing(cc.easeBackOut()));

    },


});