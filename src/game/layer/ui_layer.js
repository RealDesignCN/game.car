/**
 * Created by zhaojm on 15/4/14.
 */
game.UILayer = cc.Layer.extend({

    _scoreLbl : null,
    _velocityLbl : null,

    _oil_bar : null,
    ctor:function(){
        this._super();
        var winSize = cc.winSize;

        var pauseItem = new cc.MenuItemImage(res.pause_btn_png, res.pause_btn_png, res.pause_btn_png, function(){
            this.addChild(new game.PauseLayer());

        }, this);
        pauseItem.setAnchorPoint(cc.p(0, 1));
        pauseItem.setPosition(0, winSize.height);
        var menu = new cc.Menu(pauseItem);
        menu.setAnchorPoint(cc.p(0, 0));
        menu.setPosition(0, 0);
        this.addChild(menu);


        var top = new cc.Sprite(res.top_bg_jpg);
        top.attr({
            anchorX : 1,
            anchorY : 1,
            x : winSize.width,
            y : winSize.height,
        });
        this.addChild(top);








        this._scoreLbl = cc.LabelTTF.create('0000000', 'Arial', 18);
        //this._scoreLbl.setColor(new cc.Color(231, 231, 231));
        this._scoreLbl.setPosition(cc.p(10, winSize.height  - 8));
        this._scoreLbl.setAnchorPoint(cc.p(0, 0.5));
        this.addChild(this._scoreLbl);


        this._oil_bar = new cc.Sprite(res.oil_bar_png);
        this._oil_bar.setAnchorPoint(cc.p(0, 0.5));
        this._oil_bar.setPosition(cc.p(winSize.width * 0.5 - 30, winSize.height - 8));
        this._oil_bar.setScaleX(1);
        this.addChild(this._oil_bar);

        this._velocityLbl = cc.LabelTTF.create('0000000', 'Arial', 18);
        //this._velocityLbl.setColor(new cc.Color(231, 231, 231));
        this._velocityLbl.setPosition(cc.p(winSize.width - 10, winSize.height  - 8));
        this._velocityLbl.setAnchorPoint(cc.p(1, 0.5));
        this.addChild(this._velocityLbl);






    },


    setScore : function(score){
        this._scoreLbl.setString(score.toFixed(0));
    },

    setOilPercent:function(p){
        this._oil_bar.setScaleX(p);
    },

    setSpeed : function(speed){
        this._velocityLbl.setString(speed);
    },


});