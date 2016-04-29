/**
 * Created by zhaojm on 15/4/1.
 */


game.GameLayer = cc.Layer.extend({

    _hero : null,

    _bgLayer : null,

    _hubLayer : null,
    _uiLayer : null,

    _mosters : null,
    _mosterGenerator : null,

    _status : null,


    _oil : null,
    //_score : null,
    _addScore : null,

    _supermanScore : null,

    ctor:function () {
        this._super();

        var self = this;
        var winSize = cc.winSize;


        //this._status = game._Enum.GAME_STATUS.ONGAME;
        this._oil = game._Config.default_oil;
        this._addScore = 0;

        this._supermanScore = 10000;

        this._mosters = [];

        this._bgLayer = new game.BGLayer(res.bg_jpg);
        this.addChild(this._bgLayer);

        this.newCar();

        this._mosterGenerator = new game.MosterGenerator(this);

        this._hubLayer = new game.HubLayer(this);
        this.addChild(this._hubLayer, 2);


        this._uiLayer = new game.UILayer();
        this.addChild(this._uiLayer, 2);



        this.scheduleUpdate();

    },

    newCar:function(){
        var winSize = cc.winSize;
        var self = this;
        this._hero = new game.Hero(cc.p(winSize.width / 2, winSize.height * 0.2));
        this.addRole(this._hero);
        new game.NewCarEffect().addToLayer(this, function(){
            self._status = game._Enum.GAME_STATUS.ONGAME;
        });

    },



    update:function (dt) {
        this._super();
        var winSize = cc.winSize;

        var score = this.getScore();
        if(score > this._supermanScore){
            new game.SupermanEffect().addToLayer(this);
            this._supermanScore += 10000;
        }
        this._uiLayer.setScore(score);
        this._uiLayer.setSpeed(this.getSpeed());

        if(this._status != game._Enum.GAME_STATUS.GAMEOVER) {
            this._oil -= dt;
            this._uiLayer.setOilPercent(this._oil / game._Config.default_oil);
            if (this._oil <= 0) {
                this.gameOver();
            }
        }

        if(this._status == game._Enum.GAME_STATUS.ONGAME || this._status == game._Enum.GAME_STATUS.COLLIDED){
            this._bgLayer.update(dt);
        }

        if(this._status == game._Enum.GAME_STATUS.ONGAME) {

            this._hero.update(dt);

            this._mosterGenerator.update(dt);

            for(var i = 0; i < this._mosters.length; i++){
                this._mosters[i].update(dt, this._status);
            }

            // check Collide
            for(var i = 0; i < this._mosters.length; i++){
                var mosterRect = this._mosters[i].getCollideRect();
                var heroRect = this._hero.getCollideRect();
                if(cc.rectIntersectsRect(mosterRect, heroRect)){
                    var type = this._mosters[i]._type;
                    this._mosters[i].removeFromLayer();
                    this._mosters.splice(i, 1);
                    if(type == game._Enum.MOSTER_TYPE.ADDSCORE){

                        var pos = this._hero.getPosition();
                        new game.AddScoreEffect(cc.p(
                            pos.x,
                            pos.y + 100
                        )).addToLayer(this);

                        this.addScore();

                    }else{
                        this.onCollide();
                    }

                    break;
                }
            }
        }



    },

    onCollide:function(){
        var self = this;
        this._status = game._Enum.GAME_STATUS.COLLIDED;

        // TODO remove all moster
        while(this._mosters.length > 0){
            this._mosters[0].removeFromLayer();
            this._mosters.splice(0, 1);
        }


        this._hero.onCollide(function(){
            self._status = game._Enum.GAME_STATUS.DIE;
        }, function(){
            self.onDie();
        });
    },

    addRole:function(role){
        role.addToLayer(this);
    },

    addScore : function(){
        // TODO add score
        cc.log('add score');
        var s = 1000;

        this._addScore += s;

    },

    gameOver:function(){
        this._status = game._Enum.GAME_STATUS.GAMEOVER;
        this.unscheduleUpdate();
        cc.log('game over');
        this.addChild(new game.GameOverLayer(), 5);
    },

    onDie : function(){
        this.newCar();
    },


    getSpeed:function(){
        return this._bgLayer._speed;
    },

    getScore : function(){
        return -this._bgLayer.y + this._addScore;
    },









});