/**
 * Created by zhaojm on 15/4/17.
 */
game.HubLayer = cc.Layer.extend({
    _touchListener : null,
    ctor:function(){
        this._super();
        var self = this;
        var winSize = cc.winSize;

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true   ,       // true 为不向下传递
            onTouchBegan: function(touch, event){
                cc.log('touchbegan');

                var touchPos = touch.getLocation();


                if(touchPos.x >= winSize.width * 0.5){
                    self.parent._hero.turnRight();
                }else{
                    self.parent._hero.turnLeft();
                }
                return true;
            },
            //onTouchMoved: this.onTouchMoved,
            onTouchEnded: function(touch, event){
                cc.log('touch ended');
                self.parent._hero.stopX();
            },
            //onTouchCancel: this.onTouchCancel
        });
        this._touchListener = listener;
        cc.eventManager.addListener(listener, this);



        var right = new cc.Sprite(res.right_btn_png);
        var left = new cc.Sprite(res.right_btn_png);
        left.flippedX = true;

        right.setAnchorPoint(cc.p(1, 0));
        left.setAnchorPoint(cc.p(0, 0));

        right.setPosition(winSize.width, 50);
        left.setPosition(0, 50);

        this.addChild(right);
        this.addChild(left);


    },


});