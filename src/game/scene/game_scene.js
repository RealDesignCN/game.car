/**
 * Created by zhaojm on 15/4/1.
 */
game.GameScene = cc.Scene.extend({
    _gameLayer : null,
    onEnter : function(){
        this._super();

        var self = this;


        //if(game._Config.show_ads && game._Config.language == game._Enum.language.en) {
        //    //setTimeout(function(){
        //        Ads.bottomAds();
        //    //}, 10 * 1000);
        //
        //}


        this._gameLayer = new game.GameLayer();
        this.addChild(this._gameLayer);

    },
});