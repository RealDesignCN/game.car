/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/6
 */
game.NewCarEffect = cc.Class.extend({
    _sprite : null,
    _sprite2 : null,
    _layer:null,
    ctor:function(){
        var winSize = cc.winSize;
        this._sprite = new cc.Sprite(res.newcar1_png);
        this._sprite.setPosition(winSize.width / 2, winSize.height / 2);
        this._sprite.setScale(40);
        this._sprite2 = new cc.Sprite(res.newcar2_png);
        this._sprite2.setPosition(winSize.width / 2, winSize.height / 2);
        this._sprite2.setVisible(false);
        this._sprite2.setScale(40);

    },

    addToLayer:function(layer, callback){
        this._layer = layer;
        var self = this;
        layer.addChild(this._sprite);
        layer.addChild(this._sprite2);

        var t = 1;
        var scaleTo = new cc.ScaleTo(t, 1);
        var fadeIn = new cc.FadeIn(t);
        var sp = new cc.Spawn(scaleTo, fadeIn);

        

        this._sprite.runAction(new cc.Sequence(
            sp,
            new cc.CallFunc(function(){
                self._sprite.setVisible(false);
                self._sprite2.setVisible(true);
                self._sprite2.runAction(new cc.Sequence(
                    sp,
                    new cc.CallFunc(function(){
                        self.removeFromLayer();
                        callback();
                    })
                ));
            })
        ));
    },
    removeFromLayer:function(){
        this._sprite.removeFromParent();
        this._sprite2.removeFromParent();
    },

});