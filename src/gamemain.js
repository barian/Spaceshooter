//変数
var background;
var scrollSpeed = 1;
var size;
var player;
var playerx;
var playery;
var playerw;
var playerh;

var keytouching = false;
var touchOrigin
var touching = false;
var touchEnd;
var xSpeed = 0;
var ySpeed = 0;
var shotarray = new Array();
var enemyarray = new Array();
var enemysuu = 0;
var zanki = 3;

var timeText;
var second_timer = 0;
var time = 60;
var hiscore = 0;
var score = 0;
var scoretext;
//背景レイヤー
var BackLayer = cc.Layer.extend({
  ctor: function() {
    this._super();
    size = cc.director.getWinSize();

    //var label = cc.LabelTTF.create("HI 000000    score 000000         ×3", "Arial", 16);
    //label.setPosition(size.width / 2, size.height-20);
    //this.addChild(label, 1);
    background = new ScrollingBG();
    this.addChild(background);

    zankiText = cc.LabelTTF.create("×"+zanki,"Arial","16",cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(zankiText);
    zankiText.setPosition(size.width*0.9,size.height*0.95);

    var zanki_png = cc.Sprite.create(res.player_png);
    zanki_png.setPosition(size.width-70 , size.height-20)
    zanki_png.setScale(0.3);
    this.addChild(zanki_png);

    //timeの表示
    timeText = cc.LabelTTF.create(""+time,"Arial","16",cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(timeText);
    timeText.setPosition(size.width*0.1,size.height*0.95);


    this.scheduleUpdate();

    return true;
  },
  update: function(dt) {
    //backgroundのscrollメソッドを呼び出す
    background.scroll();
    this.removeChild(scoretext);
    scoretext = cc.LabelTTF.create("score : "+ score,"Arial",16);
    scoretext.setPosition(size.width / 2, size.height-20);
    this.addChild(scoretext,1);
    second_timer++;

    if(second_timer == 60){
      time--;
      second_timer = 0;
      timeText.setString(time);
      if(time == 10 || time == 15 || time == 20 || time == 25 || time == 30 || time == 35 || time == 40 || time == 45 || time == 50 || time == 55|| time == 5){
        for(var i=0;i<4;i++){
          enemyarray.push(new Enemy());
          enemysLayer.addChild(enemyarray[i],1);
          enemyarray[i].setPosition(60*(i+1),500);
        }
      }
      if(time < 0){
        time=60;
        cc.director.runScene(new ResultScene());
      }
    }
  },
});
//ゲームレイヤー
var GameLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        //プレイヤー
        /*playerx = size.width/2;
        playery = size.height/9;
        playerw = 0;
        playerh = 0;
        player = cc.Sprite.create(res.player_png);
        player.setPosition(playerx, playery);
        player.setScale(0.5);
        this.addChild(player);*/

        audioEngine.playMusic(res.BG_BGM, true);

        player = new Player();
        playerLayer = cc.Layer.create();
        this.addChild(playerLayer,1);
        playerLayer.addChild(player,1);

        enemyx = size.width/2;
        enemyy = size.height/2;

        enemysLayer = cc.Layer.create();
        this.addChild(enemysLayer);

        topLayer = cc.Layer.create();
        cc.eventManager.addListener(touchListener, this);
        cc.eventManager.addListener(keylistener, this);
            //アイテムがおちてくるレイヤー
        shotLayer = cc.Layer.create();
        this.addChild(shotLayer);
        this.schedule(this.addItem, 0.1);

        for(var i=0; i < 60;i++){

        }

        this.scheduleUpdate();
        return true;
    },
    addItem: function() {
    var shot = new Shot();
    //var enemy = new Enemy();
    shotLayer.addChild(shot, 1);

    },
    //removeItem: function(item) {
      //itemsLayer.removeChild(item);
    //},
    update: function(dt) {
      //enemysLayer.setPosition(enemysLayer.getPosition().x+0.1,enemysLayer.getPosition().y);
      //enemyarray[1].setPosition(enemyarray[1].getPosition().x+20,enemyarray[1].getPosition().y);

      for ( var i=0; i<enemyarray.length;i++){
        //enemyarray[i].setPosition(enemyarray[i].getPosition().x-3,enemyarray[i].getPosition().y-1);

      }
      for ( var i=0; i <enemyarray.length;i++){
        if (Math.abs(player.getPosition().y - enemyarray[i].getPosition().y) < 20 &&Math.abs(player.getPosition().x - enemyarray[i].getPosition().x) < 20) {
          audioEngine.playEffect(res.bomb_se);
          //audioEngine.setEffectsVolume(0.3);
          enemysLayer.removeChild(enemyarray[i]);
          enemyarray.splice(i,1);
          enemysuu--;
          restartGame();
        }
      }
      if(keytouching){
        player.setPosition(player.getPosition().x + playerw, player.getPosition().y + playerh);
        if(player.getPosition().x < 10 || player.getPosition().x > size.width-10)
        playerw = 0;
        if(player.getPosition().y < 10 || player.getPosition().y > size.height-10)
        playerh = 0;
      }

      if (touching) {
        xSpeed = (touchEnd.getPosition().x - touchOrigin.getPosition().x) / 10;
        ySpeed = (touchEnd.getPosition().y - touchOrigin.getPosition().y) / 10;
        if (xSpeed > 3 ) {
          xSpeed = 3;
        }
        if (xSpeed < -3 ){
          xSpeed = -3;
        }
        if (ySpeed > 3 ) {
          ySpeed = 3;
        }
        if (ySpeed < -3 ) {
          ySpeed = -3;
        }
        if(player.getPosition().x < 10 || player.getPosition().x > size.width-10)
        xSpeed = 0;
        if(player.getPosition().y < 10 || player.getPosition().y > size.height-10)
        ySpeed = 0;
        player.setPosition(player.getPosition().x + xSpeed, player.getPosition().y + ySpeed);
        //itemsLayer.setPostion(itemsLayer.getPosition().x,itemsLayer.getPosition().y + 5)
      }
      //if (Math.abs(itemsLayer.getPosition().y - enemy.getPosition().y) < 30 &&Math.abs(item.getPosition().x - enemy.getPosition().x) < 30) {
        //itemsLayer.removeChild(this);
        //enemysLayer.removeChild(this);
      //}
    },
});
var Player = cc.Sprite.extend({
  ctor: function(){
    this._super();
    this.initWithFile(res.player_png);
    playerx = size.width/2;
    playery = size.height/9;
    playerw = 0;
    playerh = 0;
    this.setPosition(playerx, playery);
    this.setScale(0.5);
  },
  onEnter: function(){
    this._super();

  }
})
//ショットレイヤー
/*var Shot = cc.Sprite.extend({
  ctor: function() {
      this._super();
      shotx = size.width/2;
      shoty = size.height/9;
      shotw = 0;
      shoth = 0;
      shot = cc.Sprite.create(res.shot_png);
      shot.setPosition(playerx, playery);
      shot.setScale(0.5);
      this.addChild(shot);
      this.scheduleUpdate();
      return true;
  },
  update: function(dt) {
  },
})*/;
var Enemy = cc.Sprite.extend({
  ctor: function(){
    this._super();
    this.initWithFile(res.enemy_png);
    this.setScale(0.5);
  },
  onEnter: function(){
    this._super();
    this.setPosition(size.width+100,size.height+100);
    //var moveAction = cc.MoveTo.create(2, new cc.Point(player.getPosition().x*2-160, player.getPosition().y+400));
    //this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt){
    this.setPosition(this.getPosition().x,this.getPosition().y-2);
    //enemysLayer.setPosition(enemysLayer.getPosition().x/2+1,enemysLayer.getPosition().y/2);

    //if (Math.abs(itemsLayer.getPosition().y - this.getPosition().y) < 25 &&Math.abs(itemsLayer.getPosition().x - this.getPosition().x) < 25) {
      //itemsLayer.removeChild(this);
      //enemysLayer.removeChild(this);
    //}
    //enemysLayer.setPosition(enemysLayer.getPosition().x/2+100,enemysLayer.getPosition().y/2+100);
  },
});
var Shot = cc.Sprite.extend({
  ctor: function() {
    this._super();
    //ランダムに爆弾と果物を生成する
    this.initWithFile(res.shot_png);
    this.setScale(0.5);
    audioEngine.playEffect(res.shot_se,false);
    audioEngine.setEffectsVolume(0.3);
    //shot = cc.Sprite.create(res.shot_png);
    //this.addChild(shot);
  },
  //アイテムが生成された後、描画されるときに実行
  onEnter: function() {
    this._super();
    //位置
    this.setPosition(player.getPosition().x, player.getPosition().y+30);
    //座標に移動させる
    //var moveAction = cc.MoveTo.create(2, new cc.Point(Math.random() * 800 - 100, 800));
    var moveAction = cc.MoveTo.create(2, new cc.Point(player.getPosition().x, player.getPosition().y+800));
    //console.log(moveAction);

    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    //this.setPosition(player.getPosition().x + playerw, player.getPosition().y + playerh);

    //果物の処理　座標をチェックしてカートの接近したら
    for ( var i=0; i <enemyarray.length;i++){
      if (Math.abs(this.getPosition().y - enemyarray[i].getPosition().y) < 20 &&Math.abs(this.getPosition().x - enemyarray[i].getPosition().x) < 20) {
        audioEngine.playEffect(res.bomb_se);
        shotLayer.removeChild(this);
        enemysLayer.removeChild(enemyarray[i]);
        enemyarray.splice(i,1);
        enemysuu--;
        score = score+ 10;
        //enemysLayer.removeChild(enemysLayer);
      }
    }
    //爆弾の処理　座標をチェックしてカートの接近したら　フルーツより爆弾に当たりやすくしている
    //if (this.getPosition().y < 35 && Math.abs(this.getPosition().x - cat.getPosition().x) < 25) {
      //gameLayer.removeItem(this);
    //}
    //地面に落ちたアイテムは消去
    if (this.getPosition().y > 480) {
      shotLayer.removeChild(this);
    }
  }
});
//カウントダウンレイヤー
var CountLayer = cc.Layer.extend({
    sprite: null,
    // ブロックを保持しておく配列
    dropSpriteArray: null,
    // 配列の宣言　ブロックの名前を指定
    dropArray: [res.drop01_png, res.drop02_png, res.drop03_png, res.drop04_png, res.drop05_png],
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        this.dropSpriteArray = new Array();
        var i = 1;
        for (i = 0; i < 10; i++) {
            var rnd = Math.floor(Math.random() * 5);
            this.sprite = new cc.Sprite(this.dropArray[rnd]);
            cc.log(i);
            cc.log(this.dropArray[i]);
            this.sprite.attr({
                x: size.width * Math.random() * 6 / 6,
                y: size.height * Math.random() * 6 / 6,
                scale: 0.1+Math.random()*1.9,
                rotation: 0
            });
            this.dropSpriteArray.push(this.sprite);
            // this.addChild(this.sprite);
            this.addChild(this.dropSpriteArray[i], 0);


            //  var drop01 = cc.Sprite.create(res.drop01_png);　
            //  drop01.setPosition(size.width * i / 6, size.height / 5);　
            //  this.addChild(drop01);
        }

        // タップイベントリスナーを登録する
      },
});

//スクロール移動する背景クラス
var ScrollingBG = cc.Sprite.extend({
  //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
  ctor: function() {
    this._super();
    this.initWithFile(res.background_png);
  },
  //onEnterメソッドはスプライト描画の際に必ず呼ばれる
  onEnter: function() {
    //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
    this.setPosition(size.width / 2, size.height / 2);
    //  this.setPosition(480,160);
  },
  scroll: function() {
    //座標を更新する
    this.setPosition(this.getPosition().x, this.getPosition().y - scrollSpeed);
    //画面の端に到達したら反対側の座標にする
    if (this.getPosition().y < 0) {
      this.setPosition(this.getPosition().x, this.getPosition().y + 540);
    }
  }
});
function restartGame() {
  zanki--;
  if(zanki < 0){
    zanki=3;
    //cc.director.runScene(new OverScene());
  }
  zankiText.setString("×"+zanki);
  player.ySpeed = 0;
  player.setPosition(player.getPosition().x, 160);
  player.invulnerability = 100;

  //bgmリスタート
  //if (!audioEngine.isMusicPlaying()) {
    //audioEngine.resumeMusic();
  //}
}

var keylistener = cc.EventListener.create({
   event: cc.EventListener.KEYBOARD,
   // swallowTouches: true,
   onKeyPressed: function(keyCode, event) {
     keytouching = true;
      console.log(player.getPosition().x);
      if(keyCode == 32)cc.director.runScene(new ResultScene());
      if(player.getPosition().x > 10){
        if (keyCode == 37){
          playerw = -3;
        }
      }
      if(player.getPosition().x < size.width-10){
        if (keyCode == 39){
          playerw = 3;
        }
      }
      if(player.getPosition().y > 10){
        if (keyCode == 40){
          playerh = -3;
        }
      }
      if(player.getPosition().y < size.height-10){
        if (keyCode == 38){
          playerh = 3;
        }
      }
      if(keyCode == 32){
        //shotarray.push(new Shot());
        //Shot.addChild(shot);
      }
      return true;
    },
    onKeyReleased: function(keyCode, event){
        keytouching = false;
        if(keyCode == 37 || keyCode == 39)
        playerw = 0;
        if(keyCode == 38 || keyCode == 40)
        playerh = 0;
      },
});

//バーチャルアナログパッド用のタッチリスナーの実装
var touchListener = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event) {

    //タッチ開始位置にスプライトを表示させる
    touchOrigin = cc.Sprite.create(res.touchorigin_png);
    topLayer.addChild(touchOrigin, 0);
    touchOrigin.setPosition(touch.getLocation().x, touch.getLocation().y);
　　//タッチ位置にドラック用スプライトを表示させる
    touchEnd = cc.Sprite.create(res.touchend_png);
    topLayer.addChild(touchEnd, 0);
    touchEnd.setPosition(touch.getLocation().x, touch.getLocation().y);

    //タッチしているぞflagをON
    touching = true;
    return true;
  },
  onTouchMoved: function(touch, event) {
    //移動中の指の位置にドラック用スプライトを表示させる

    touchEnd.setPosition(touch.getLocation().x, touchEnd.getPosition().y);
    touchEnd.setPosition(touchEnd.getPosition().x, touch.getLocation().y);

  },
  onTouchEnded: function(touch, event) {
    //タッチ終了のときはスプライトを消す　タッチflagをOFF
    touching = false;
    topLayer.removeChild(touchOrigin);
    topLayer.removeChild(touchEnd);
  }
});

var GameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        audioEngine = cc.audioEngine;

        var backlayer = new BackLayer();
        this.addChild(backlayer);

        var gamelayer = new GameLayer();
        this.addChild(gamelayer);

        var countlayer = new CountLayer();
        //this.addChild(countlayer);
        // 一秒後にオーブが消える
        setTimeout(function() {
            countlayer.removeAllChildren();
        }, 1000);

    }
});
