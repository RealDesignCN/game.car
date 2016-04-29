/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/6
 */
game.AddScoreEffect = cc.Class.extend({

    _layer:null,

    _label:null,
    ctor:function(pos){
        cc.log('pos..', pos);
        this._label = cc.LabelTTF.create('1000', 'Arial', 18);
        //this._label.setColor(new cc.Color(231, 231, 231));
        this._label.setPosition(pos);
        //this._label.setAnchorPoint(cc.p(0, 0.5));
        //this.addChild(this._label);
    },

    addToLayer:function(layer){
        cc.log('add score effect..');
        this._layer = layer;
        var self = this;
        layer.addChild(this._label);
        this._label.runAction(new cc.Sequence(
            new cc.DelayTime(1),
            new cc.FadeIn(1),
            new cc.CallFunc(function(){
                cc.log('remove score............');
                self.removeFromLayer();
            })
        ));
    },

    removeFromLayer:function(){
        this._label.removeFromParent();
    },

});