class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;

        this.title = true;
        this.level = null;

        this.knight = new Knight(this.game, 2.5 * params.BITWIDTH, 0 * params.BITWIDTH);
        this.loadLevel(levelOne, 2.5 * params.BLOCKWIDTH, 13 * params.BLOCKWIDTH, false, true);
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, x, y, transition, title) {
        this.title = title;
        this.level = level;
        this.clearEntities();
        this.x = 0;

        if (transition) {
            this.game.addEntity(new TransitionScreen(this.game, level, x, y, title));
        } else {
            if (level.map) {
                for (var i = 0; i < level.map.length; i++) {
                    let map = level.map[i];
                    this.game.addEntity(new Map(this.game, map.x * params.BLOCKWIDTH, map.y * params.BLOCKWIDTH, map.size * params.BLOCKWIDTH));
                }
            }

            this.knight.x = x;
            this.knight.y = y;
            this.knight.removeFromWorld = false;
            this.knight.velocity = { x: 0, y: 0 };

            var that = this;
            var knight = false;
            this.game.entities.forEach(function(entity) {
                if(that.knight === entity) knight = true;
            });
            if(!knight) this.game.addEntity(this.knight);
        };

        this.knight.x = x;
        this.knight.y = y;
            // if (level.music && !this.title) {
            //     ASSET_MANAGER.pauseBackgroundMusic();
            //     ASSET_MANAGER.playAsset(level.music);
            // }
    };

    update() {

    };

    draw(ctx) {
    };
}