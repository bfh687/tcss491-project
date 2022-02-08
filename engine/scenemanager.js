class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = 0;
    this.y = 0;

    this.title = true;
    this.level = null;
    let midpoint_x = 1366 / 2 - 64 * 1.25;
    let midpoint_y = 768 / 2 - 64 * 1.25;
    // -10 to not spawn in rock :D
    this.knight = new Knight(this.game, midpoint_x + 1700, midpoint_y + 200);
    this.loadLevel(0, 0, false, true);
  }

  clearEntities() {
    this.game.entities.forEach(function (entity) {
      entity.removeFromWorld = true;
    });
  }

  loadLevel(x, y, transition, title) {
    this.clearEntities();

    this.game.addEntity(new Map(this.game, 0, 0));
    this.game.addEntity(new Cursor(this.game));
    this.game.addEntity(new HUD(this.game, this.knight));
    this.game.addEntity(this.knight);

    //this.game.addEntity(new Shop(this.game, 1366 / 2 + 50 * 16 - 85, 670));
  }

  update() {
    let midpoint_x = 1366 / 2 - 35;
    let midpoint_y = 768 / 2 - (62 * 2.5) / 2 - 20;
    this.x = this.knight.x - midpoint_x;
    this.y = this.knight.y - midpoint_y;
  }

  draw(ctx) {}
}
