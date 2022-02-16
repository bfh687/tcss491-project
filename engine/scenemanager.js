class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = 0;
    this.y = 0;

    // screenshake details
    this.shakeDuration = -0.01;
    this.x_offset = 0;
    this.y_offset = 0;

    this.title = true;
    this.level = null;

    let midpoint_x = 1366 / 2;
    let midpoint_y = 768 / 2;
    this.knight = new Knight(this.game, 800 - 64 / 1.5, 1100);
    this.knight.direction = 2;
    this.loadLevel(1, false);
  }

  // remove all entities from the game engine
  clearEntities() {
    this.game.entities = [];
  }

  loadLevel(level, boss) {
    this.clearEntities();
    this.boss = null;

    // add hud elements
    this.game.addEntity(new Cursor(this.game));
    this.game.addEntity(new HUD(this.game, this.knight));

    // add knight
    this.game.addEntity(this.knight);

    if (level == 1) {
      if (!boss) {
        this.knight.direction = 3;
        //this.knight.y = 244;

        // remove for actual demo
        this.knight.y = 1000;
        this.knight.x = 4700;
        //

        // add map and teleporter
        this.game.addEntity(new Map(this.game, 0, 0));
        this.game.addEntity(new Teleporter(this.game, 168 * 32, 32 * 6, 1, true));
      } else {
        this.knight.direction = 2;
        this.knight.currSpeed = this.knight.minSpeed;
        this.knight.x = 750;
        this.knight.y = 2200;

        this.game.addEntity(new Transition(this.game, true));

        // add map and teleporter
        this.game.addEntity(new Map2(this.game, 0, 0));
        //this.game.addEntity(new Teleporter(this.game, this.knight.x, this.knight.y, 1, true));

        // add boss
        this.game.addEntity(new Minotaur(this.game, 800 - (96 * 3) / 1.9, 550));
      }
    } else if (level == 2) {
      if (boss) {
      } else {
      }
    }
  }

  update() {
    this.shakeDuration -= this.game.clockTick;
    if (this.shakeDuration >= 0) {
      this.y_offset = Math.random() * 10 - 5;
      this.x_offset = Math.random() * 10 - 5;
    }

    let midpoint_x = 1366 / 2 - 48;
    let midpoint_y = 768 / 2 - (62 * 2.5) / 2;
    this.x = this.knight.x - midpoint_x;
    this.y = this.knight.y - midpoint_y;
  }

  draw(ctx) {}

  screenshake() {
    if (this.shakeDuration <= 0) {
      this.shakeDuration = 0.2;
    }
  }
}
