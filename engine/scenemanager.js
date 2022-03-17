class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;

    this.vignette = ASSET_MANAGER.getAsset(sprites.vignette);

    // initialize camera coords
    const x_offset = -44;
    this.midpoint_x = engine.width() / 2 + x_offset;

    const y_offset = -65.5;
    this.midpoint_y = engine.height() / 2 + y_offset;

    this.x = this.midpoint_x;
    this.y = this.midpoint_y;

    // screenshake details
    this.shakeDuration = -0.01;
    this.shakeCooldown = -0.01;
    this.x_offset = 0;
    this.y_offset = 0;

    // spawn knight
    this.knight = new Knight(this.game, level1.knight.x_spawn, level1.knight.y_spawn);

    // load first level
    this.loadMainMenu();
  }

  // remove all entities from the game engine
  clearEntities() {
    this.game.entities = [];
  }

  loadMainMenu() {
    this.clearEntities();
    this.boss = null;

    this.game.addEntity(new MainMenu(this.game));
    this.game.addEntity(new Cursor(this.game));
  }

  loadLevel(level) {
    // clear entities and remove boss (if any)
    this.clearEntities();
    this.boss = null;

    // add hud elements
    this.game.addEntity(new Cursor(this.game));
    this.game.addEntity(new HUD(this.game, this.knight));

    // add knight
    this.game.addEntity(this.knight);

    ///// NEW /////

    // reset timer if no boss, and specify knight start direction
    if (!level.boss) {
      this.game.timer.reset();
      this.knight.direction = 3;
    } else {
      this.knight.direction = 2;
    }

    // reset camera location
    this.x = this.midpoint_x;
    this.y = this.midpoint_y;

    // set camera bounds
    this.min_x = level.min_x;
    this.min_y = level.min_y;

    this.max_x = level.max_x;
    this.max_y = level.max_y;

    // set knight spawn
    this.knight.x = level.knight.x_spawn;
    this.knight.y = level.knight.y_spawn;

    ///////////////
    if (level == 1) {
      if (!boss) {
        // add map and teleporter
        const map = new Map(this.game, 0, 0, level1);
        this.game.addEntity(map);
        this.game.addEntity(new Grid(this.game, 200, 200, map));

        this.game.addEntity(new Teleporter(this.game, 168 * 32, 32 * 6, 1, true));

        // spawn path finding test skeleton
        this.game.addEntity(new MobCluster(this.game, 300, 900, 2, "minion"));

        this.game.addEntity(new MobCluster(this.game, 600, 1350, 3, "skeleton"));
        this.game.addEntity(new MobCluster(this.game, 1730, 2130, 4, "skeleton"));
        this.game.addEntity(new MobCluster(this.game, 1696, 3008, 3, "skeleton"));
        this.game.addEntity(new MobCluster(this.game, 2336, 704, 4, "skeleton"));
        this.game.addEntity(new MobCluster(this.game, 3616, 896, 3, "skeleton"));
        this.game.addEntity(new MobCluster(this.game, 5536, 1280, 2, "skeleton"));
        ASSET_MANAGER.playMusic(music.level1);
      } else {
        // add map and teleporter
        this.game.addEntity(new Map(this.game, 0, 0, level1boss));

        // add boss
        this.game.addEntity(new Minotaur(this.game, 800 - (96 * 3) / 1.9, 550));
        ASSET_MANAGER.playMusic(music.boss);
      }
    }
  }

  update() {
    this.shakeDuration -= this.game.clockTick;
    this.shakeCooldown -= this.game.clockTick;
    if (this.shakeDuration >= 0) {
      this.y_offset = Math.random() * 15 - 7.5;
      this.x_offset = Math.random() * 15 - 7.5;
    } else {
      this.x_offset = this.y_offset = 0;
    }

    // smooth camera if not currently screenshaking
    if (this.x_offset == 0 && this.y_offset == 0) this.lerp();

    // add shake
    this.x += this.x_offset;
    this.y += this.y_offset;

    // restrict to scene bounds
    this.x = Math.min(Math.max(this.min_x, this.x), this.max_x);
    this.y = Math.min(Math.max(this.min_y, this.y), this.max_y);

    ASSET_MANAGER.updateMusic();
    if (this.game.camera.transition) this.game.camera.transition.update();
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.drawImage(this.vignette, 0, 0, 1366, 768);
    ctx.restore();
    if (this.game.camera.transition) this.game.camera.transition.draw(ctx);
  }

  lerp() {
    const lerp_value = 0.05;

    const position_x = this.x;
    const target_x = this.game.knight.x + 40;

    const position_y = this.y;
    const target_y = this.game.knight.y;

    const velocity_x = (target_x - position_x - this.midpoint_x) * lerp_value;
    const velocity_y = (target_y - position_y - this.midpoint_y) * lerp_value;

    this.x += velocity_x;
    this.y += velocity_y;
  }

  screenshake() {
    if (this.shakeDuration <= 0 && this.shakeCooldown <= 0) {
      this.shakeDuration = 0.05;
      this.shakeCooldown = 0.2;
    }
  }
}
