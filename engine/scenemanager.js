class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;

    this.vignette = ASSET_MANAGER.getAsset("./vignette.png");

    // initialize camera coords
    this.midpoint_x = 1366 / 2 - 44;
    this.midpoint_y = 768 / 2 - (62 * 2.5) / 2 - 12;
    this.x = this.midpoint_x;
    this.y = this.midpoint_y;

    this.death_offset = 0;

    // screenshake details
    this.shakeDuration = -0.01;
    this.shakeCooldown = -0.01;
    this.x_offset = 0;
    this.y_offset = 0;

    this.title = true;
    this.level = null;

    this.knight = new Knight(this.game, 722, 250);
    // load first level
    this.loadMainMenu();

    //this.loadLevel(1, false);
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
        this.game.timer.gameTime = 0;
        this.knight.direction = 3;

        this.x = this.midpoint_x;
        this.y = this.midpoint_y;

        // add map and teleporter
        const map = new Map(this.game, 0, 0, level1);
        this.game.addEntity(map);
        this.game.addEntity(new Grid(this.game, 200, 200, map));

        this.game.addEntity(new Teleporter(this.game, 168 * 32, 32 * 6, 1, true));

        // spawn path finding test skeleton
        //this.game.addEntity(new MobCluster(this.game, 300, 700, 5, "skeleton"));

        this.game.addEntity(new MobCluster(this.game, 600, 1350, 3, "skeleton"));
        this.game.addEntity(new MobCluster(this.game, 1730, 2130, 4, "skeleton"));
        this.game.addEntity(new MobCluster(this.game, 1696, 3008, 3, "skeleton"));
        this.game.addEntity(new MobCluster(this.game, 2336, 704, 4, "skeleton"));
        this.game.addEntity(new MobCluster(this.game, 3616, 896, 3, "skeleton"));
        this.game.addEntity(new MobCluster(this.game, 5536, 1280, 2, "skeleton"));

        this.minX = 32;
        this.minY = 0;

        this.maxX = 3216 + 32 * 57;
        this.maxY = 45 * 60;
        this.playMusic("./music/Glitterglade_Grove.mp3");
      } else {
        console.log("HERE");
        this.knight.direction = 2;
        this.knight.currSpeed = this.knight.minSpeed;

        this.knight.x = 750;
        this.knight.y = 2200;

        this.game.addEntity(new Transition(this.game, true));

        // add map and teleporter
        this.game.addEntity(new Map(this.game, 0, 0, level1boss));

        // add boss
        this.game.addEntity(new Minotaur(this.game, 800 - (96 * 3) / 1.9, 550));
        this.playMusic("./music/Orchestral_RATM.mp3");
      }
    } else if (level == 2) {
      if (boss) {
      } else {
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

    // smooth camera
    if (this.x_offset == 0 && this.y_offset == 0) this.lerp();

    // add shake
    this.x += this.x_offset;
    this.y += this.y_offset;

    // restrict to scene bounds
    this.x = Math.min(Math.max(this.minX, this.x), this.maxX);
    this.y = Math.min(Math.max(this.minY, this.y), this.maxY);

    this.updateAudio();
    if (this.game.camera.transition) this.game.camera.transition.update();
  }

  lerp() {
    const lerp_value = 0.05;

    const position_x = this.x;
    const target_x = this.game.knight.x - this.death_offset;

    const position_y = this.y;
    const target_y = this.game.knight.y;

    const velocity_x = (target_x - position_x - this.midpoint_x) * lerp_value;
    const velocity_y = (target_y - position_y - this.midpoint_y) * lerp_value;

    this.x += velocity_x;
    this.y += velocity_y;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.drawImage(this.vignette, 0, 0, 1366, 768);
    ctx.restore();
    if (this.game.camera.transition) this.game.camera.transition.draw(ctx);
  }

  screenshake() {
    if (this.shakeDuration <= 0 && this.shakeCooldown <= 0) {
      this.shakeDuration = 0.05;
      this.shakeCooldown = 0.2;
    }
  }

  playMusic(path) {
    ASSET_MANAGER.pauseAudio();
    ASSET_MANAGER.playAudio(path);
    ASSET_MANAGER.autoRepeat(path);
  }

  updateAudio() {
    var mute = document.getElementById("mute").checked;
    var volume = document.getElementById("volume").value;

    ASSET_MANAGER.muteAudio(mute);
    ASSET_MANAGER.setVolume(volume);
  }
}
