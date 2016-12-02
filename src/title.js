//myScene.js
var TitleLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();
        /*
                var sprite = cc.Sprite.create(res.HelloWorld_png);
                sprite.setPosition(size.width / 2, size.height / 2);
                sprite.setScale(0.8);
                this.addChild(sprite, 0);
        */
        var title = cc.Sprite.create(res.title_png);
        title.setPosition(size.width / 2, size.height / 2);
        title.setScale(0.5);
        this.addChild(title);
        //add code

        

        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        cc.director.runScene(new GameScene());
    },
});

var TitleScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var titlelayer = new TitleLayer();
        this.addChild(titlelayer);
    }
});
