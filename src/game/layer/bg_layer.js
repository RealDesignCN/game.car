/**
 * Created by zhaojm on 15/3/30.
 */
game.BGLayer = cc.Layer.extend({

    backgroundImgList:null,


    backgroundList : null,

    _speed : null,


    ctor:function(bg_texture){
        this._super();
        var size = cc.winSize;

        this._speed = 400;

        this.backgroundList = [];

        this.backgroundImgList = [bg_texture];


        for(;;){
            var h = this.addOneBackground();
            if( this.backgroundList.length * h >= size.height * 2 && this.backgroundList.length >= 2){
                break;
            }
        }

        var self = this;

        //game._Camera.addListener(function (pos) {
        //    var eyeX = pos.x, eyeY = pos.y;
        //    self.refresh(eyeX, eyeY);
        //    self.setPosition(-eyeX, -eyeY);
        //});




        //this.scheduleUpdate();
        //this.schedule(this.checkBg, 1);
    },

    update:function(dt){
        var speed = this._speed;
        this.y -= speed * dt;
        this.refresh(0, -this.y);
    },

    addOneBackground:function(){
        //cc.log('addOneBackground');

        var bg = null;
        if(this.backgroundList.length == 0){

            bg = this.createBackgroundByIndex(0);

            bg.setPosition(cc.p(0, 0));

        }else{

            var lastBackground = this.backgroundList[this.backgroundList.length - 1];
            var lastIndex = lastBackground.backgroundImgIndex;
            lastIndex = (lastIndex + 1) % this.backgroundImgList.length;
            bg = this.createBackgroundByIndex(lastIndex);
            bg.setPosition(cc.p(0, lastBackground.getPositionY() + lastBackground.getContentSize().height - 2));
        }
        this.addChild(bg, 1);
        this.backgroundList.push(bg);


        return bg.getContentSize().height;
    },

    createBackgroundByIndex:function(index){

        var bg = new cc.Sprite(this.backgroundImgList[index]);

        bg.setAnchorPoint(cc.p(0, 0));
        bg.backgroundImgIndex = index;
        return bg;
    },

    refresh:function(eyeX, eyeY){
        //this._super(dt);
        var size = cc.winSize;
        while(true){

            if(this.backgroundList[0].getPositionY() + this.backgroundList[0].getContentSize().height  <= eyeY){
                //cc.log('removeBackground');
                //this.removeChild(this.backgroundList[0]);
                var bg = this.backgroundList[0];

                this.backgroundList.splice(0, 1);

                var lastbg = this.backgroundList[this.backgroundList.length - 1];
                bg.setPositionY(lastbg.getPositionY() + lastbg.getContentSize().height  - 2);

                this.backgroundList.push(bg);
                //this.addOneBackground();

            }else{
                break;
            }
        }

    },
});