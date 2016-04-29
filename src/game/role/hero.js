/**
 * Created by zhaojm on 15/4/27.
 */
game.Hero = game.BaseRole.extend({
    _sprite:null,
    _layer:null,

    _speedX : null,

    _DEFAULT_SPEED_X : 300,

    ctor:function(pos){
        this._super();
        this._sprite = new cc.Sprite(res.hero_png);
        this._sprite.setPosition(pos);
        this._sprite.setAnchorPoint(cc.p(0.5, 0.5));

        this._speedX = 0;

    },

    update:function(dt){
        var x = this._sprite.x + this._speedX * dt;
        if(x < game._Config.road_left){
            x = game._Config.road_left;
        }else if(x > game._Config.road_right){
            x = game._Config.road_right;
        }
        this._sprite.x = x;

    },

    addToLayer:function(layer){
        this._layer = layer;
        layer.addChild(this._sprite, 2);
    },

    removeFromLayer:function(){
        this._sprite.removeFromParent();
    },

    getCollideRect:function(){
        var pos = this._sprite.getPosition();
        var contentSize = this._sprite.getContentSize();
        return new cc.Rect(pos.x - contentSize.width / 2, pos.y - contentSize.height / 2, contentSize.width, contentSize.height);
    },

    turnLeft : function(){
        //this._sprite.runAction(new cc.RepeatForever(new cc.MoveBy(10, -100)));
        this._speedX = -this._DEFAULT_SPEED_X;
    },
    turnRight : function(){
        //this._sprite.runAction(new cc.RepeatForever(new cc.MoveBy(10, 100)));
        this._speedX = this._DEFAULT_SPEED_X;
    },
    stopX : function(){
        //this._sprite.stopAllActions();
        this._speedX = 0;
    },

    onCollide:function(callback, callback2){
        var pos = this._sprite.getPosition();
        var t = 3;
        if(pos.x > cc.winSize.width / 2){
            var move = new cc.MoveTo(t, cc.p(game._Config.road_right, pos.y));
            var rotate = new cc.RotateTo(t, 360 * 3);
        }else{
            var move = new cc.MoveTo(t, cc.p(game._Config.road_left, pos.y));
            var rotate = new cc.RotateTo(t, -360 * 3);
        }
        var self = this;
        this._sprite.runAction(new cc.Sequence(
            new cc.Spawn(move, rotate),
            new cc.CallFunc(function(){
                callback();
            }),
            new cc.Blink(1, 3),
            new cc.CallFunc(function(){
                self._sprite.setVisible(false);
            }),
            new cc.DelayTime(1),
            new cc.CallFunc(function(){
                self.removeFromLayer();
                callback2();
            })
        ));
    },
});