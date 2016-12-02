//resource.js
var res = {
    HelloWorld_png : "res/HelloWorld.png",
    cocos_png : "res/cocos.png",
    drop01_png : "res/drop01.png",
    drop02_png : "res/drop02.png",
    drop03_png : "res/drop03.png",
    drop04_png : "res/drop04.png",
    drop05_png : "res/drop05.png",
    background_png : "res/background.png",
    title_png : "res/Title-sub.png",
    player_png : "res/player.png",
    shot_png : "res/shot.png",
    result_png : "res/result.png",
    touchorign_png : "res/touchorigin.png",
    touchend_png : "res/touchend.png",
    enemy_png : "res/enemy.png",
    BG_BGM : "res/loop.mp3",
    shot_se : "res/shoot.mp3",
    bomb_se : "res/bomb.mp3",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
