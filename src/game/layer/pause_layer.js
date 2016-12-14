/**
 * Created by zhaojm on 15/4/6.
 */
game.PauseLayer = cc.Layer.extend({
    _node : null,
    _bgSize : null,
    ctor:function(){
        this._super();

        //if(game._Config.show_ads && game._Config.language == game._Enum.language.en) {
        //    Ads.fullViewAds(function(){
        //        //clearInterval(timer);
        //        //runScene();
        //    });
        //}


        var node = new cc.Node();
        this._node = node;

        var bg = new cc.Sprite(res.bottom_bg_jpg);
        var bgSize = this._bgSize = bg.getContentSize();
        bg.setPosition(bgSize.width / 2, bgSize.height / 2);
        node.addChild(bg);
        node.setContentSize(bgSize);

        var txt = new cc.Sprite(res.pause_png);
        txt.attr({
            x : bgSize.width * 0.7,
            y : bgSize.height * 0.7
        });
        node.addChild(txt);

        var self = this;
        var retryItem = new cc.MenuItemImage(res.retry_png,res.retry_png, res.retry_png, function(){
            cc.director.resume();

            //if(game._Config.show_ads && game._Config.language == game._Enum.language.en) {
            //    //setTimeout(function(){
            //    Ads.bottomAds();
            //    //}, 10 * 1000);
            //
            //}

            self.removeFromLayer();
        }, this);
        retryItem.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.15));
        retryItem.setAnchorPoint(cc.p(0.5,0));


        var quitItem = new cc.MenuItemImage(res.quit_png,res.quit_png, res.quit_png, function(){
            cc.log('quit...');
            window.location.href="http://mingz.me";
        }, this);
        quitItem.setPosition(cc.p(bgSize.width * 0.8, bgSize.height * 0.15));
        quitItem.setAnchorPoint(cc.p(0.5,0));


        var menu = new cc.Menu(retryItem, quitItem);
        //menu.alignItemsVertically();
        menu.setPosition( cc.p(0, 0));
        menu.setContentSize(bgSize);
        node.addChild(menu);

        this.addChild(node);
        node.setPosition(0, -bgSize.height);
        node.runAction(new cc.Sequence(
            new cc.MoveTo(1, cc.p(0, 0)).easing(cc.easeBackOut()),
            new cc.CallFunc(function(){
                cc.director.pause();
            })
        ));

    },


    removeFromLayer : function(){
        var self = this;
        this._node.runAction(new cc.Sequence(
            new cc.MoveTo(1, cc.p(0, -this._bgSize.height)).easing(cc.easeBackIn()),
            new cc.CallFunc(function(){
                self.removeFromParent();
            })
        ));
    },


});