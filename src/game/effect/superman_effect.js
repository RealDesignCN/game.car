/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/6
 */
game.SupermanEffect = cc.Class.extend({
    _sprite : null,
    _layer:null,
    ctor:function(){
        var winSize = cc.winSize;
        this._sprite = new cc.Sprite(res.superman_png);
        this._sprite.setAnchorPoint(cc.p(0.5, 0));
        this._sprite.setScale(0.4);
        this._sprite.setPosition(winSize.width / 2, -this._sprite.getContentSize().height);
    },

    addToLayer : function(layer){
        this._layer = layer;
        var winSize = cc.winSize;
        var self = this;
        layer.addChild(this._sprite, 2);

        this._sprite.runAction(new cc.Sequence(
            new cc.MoveTo(1.5, cc.p(winSize.width / 3, winSize.height)),
            new cc.CallFunc(function(){
                self.removeFromLayer();
            })
        ));

    },

    removeFromLayer:function(){
        this._sprite.removeFromParent();
    },
});