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
    this.min_x = level.map.min_x;
    this.min_y = level.map.min_y;

    this.max_x = level.map.max_x;
    this.max_y = level.map.max_y;

    // set knight spawn
    this.knight.x = level.knight.x_spawn;
    this.knight.y = level.knight.y_spawn;

    // initialize and add map entity
    const map = new Map(this.game, level.map.origin_x, level.map.origin_y, level);
    this.game.addEntity(map);

    // if this isn't a boss level, create an a* grid from the map
    if (!level.boss) {
      const grid_width = 200;
      const grid_height = 200;
      this.game.addEntity(new Grid(this.game, grid_width, grid_height, map));
    }

    // add all enemies to the level
    level.clusters.forEach((cluster) => {
      this.game.addEntity(new MobCluster(this.game, cluster.x, cluster.y, cluster.amount, cluster.type));
    });

    // add all teleporters to the level
    level.teleporters.forEach((teleporter) => {
      this.game.addEntity(new Teleporter(this.game, teleporter.x, teleporter.y, teleporter.level));
    });

    // add boss if applicable
    if (level.boss) this.game.addEntity(new Minotaur(this.game, level.boss.x_spawn, level.boss.y_spawn));

    // play the level's music
    ASSET_MANAGER.playMusic(level.music);
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
