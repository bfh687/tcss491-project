class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;

        this.title = true;
        this.level = null;

        this.knight = new Knight(this.game, 2.5 * params.BITWIDTH, 0 * params.BITWIDTH);
        // this.loadLevel(levelOne, 0 * params.BLOCKWIDTH, 0 * params.BLOCKWIDTH, false, true);
        this.loadLevel(0, 0, false, true);
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(x, y, transition, title) {
        this.clearEntities();
        this.game.addEntity(new Knight(this.game, 2.5 * params.BITWIDTH, 0 * params.BITWIDTH));
        this.game.addEntity(new Map(this.game, 0, 0));
        this.title = title;
        // this.level = level;
        // this.clearEntities();
        this.x = 0;
        console.log("In Load Level");


        // if (transition) {
        //     this.game.addEntity(new TransitionScreen(this.game, level, x, y, title));
        // } else {
        //     //  if (level.map) {
        //     // //     // for (var i = 0; i < level.map.length; i++) {
        //     // //         let map = level.map[i];
        //     //          this.game.addEntity(new Map(this.game, 0 * params.BLOCKWIDTH, 0 * params.BLOCKWIDTH, 0 * params.BLOCKWIDTH));
        //     // //     // }
        //     //  }

        //     this.knight.x = x;
        //     this.knight.y = y;
        //     this.knight.removeFromWorld = false;
        //     this.knight.velocity = { x: 0, y: 0 };
        // };
        // this.knight.x = x;
        // this.knight.y = y;
    };

    update() {
    };

    draw(ctx) {
    };
}