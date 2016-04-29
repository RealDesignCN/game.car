/**
 * Created by zhaojm on 15/4/27.
 */


game.Moster = game.BaseRole.extend({
    _sprite:null,
    _layer:null,
    _action : null,

    _DEFAULT_SPEED_Y : -200,
    _DEFAULT_SPEED_X : 80,
    _speedX : null,
    _speedY : null,



    _type : null,
    ctor:function(type, pos){
        this._super();
        var self = this;
        this._type = type;
        this._speedX = 0;
        this._speedY = this._DEFAULT_SPEED_Y;

        var index = 0;
        if(type == game._Enum.MOSTER_TYPE.NORMAL){
            index = [0, 0, 0, 1, 2].getRandomItem();
        }else if(type == game._Enum.MOSTER_TYPE.BAD){
            index = [2, 2, 3].getRandomItem();
        }else if(type == game._Enum.MOSTER_TYPE.ADDSCORE) {
            index = 4;
        }
        var frame = 'res/common/car/' + index + '.png';

        this._sprite = new cc.Sprite(frame);
        this._sprite.setAnchorPoint(cc.p(0.5, 0));
        this._sprite.setPosition(pos);
    },

    addToLayer:function(layer){
        this._layer = layer;
        layer.addChild(this._sprite);
        //layer._mosters.push(this);
    },

    removeFromLayer:function(){
        this._sprite.removeFromParent();
        //this._layer._mosters.remove(this);
    },

    update:function(dt, status){

        if(this._type == game._Enum.MOSTER_TYPE.BAD && status == game._Enum.GAME_STATUS.ONGAME){
            var pos = this._layer._hero.getPosition();
            var intervalY = this._sprite.y - pos.y + this._layer._hero.getContentSize().height;
            if(intervalY > 0 && intervalY < 150){
                this._speedX = this._sprite.x < pos.x ? this._DEFAULT_SPEED_X : -this._DEFAULT_SPEED_X;
            }else{
                this._speedX = 0;
            }
        }


        this._sprite.y += this._speedY * dt;
        this._sprite.x += this._speedX * dt;
    },

    getCollideRect:function(){
        var pos = this._sprite.getPosition();
        var contentSize = this._sprite.getContentSize();
        return new cc.Rect(pos.x - contentSize.width * 0.5, pos.y, contentSize.width, contentSize.height);
    },

    isOutOfView:function(){
        return this._sprite.y + this._sprite.getContentSize().height < 0;
    },




});



game.Moster.create = function(pos){
    var index = [0, 0, 1, 1, 2, 2].getRandomItem();

    var type = game._Enum.MOSTER_TYPE.NORMAL;

    if(index == 0){
        type = game._Enum.MOSTER_TYPE.NORMAL;
    }else if(index == 1){
        type = game._Enum.MOSTER_TYPE.BAD;
    }else if(index == 2){
        type = game._Enum.MOSTER_TYPE.ADDSCORE;
    }

    //cc.log('type==', type);

    return new game.Moster(type, pos);
};