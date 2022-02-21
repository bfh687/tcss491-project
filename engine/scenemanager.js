class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;

    this.vignette = ASSET_MANAGER.getAsset("./vignette.png");

    // initialize camera coords
    this.x = 0;
    this.y = 0;

    this.death_offset = 0;

    // screenshake details
    this.shakeDuration = -0.01;
    this.shakeCooldown = -0.01;
    this.x_offset = 0;
    this.y_offset = 0;

    this.title = true;
    this.level = null;

    let midpoint_x = 1366 / 2;
    let midpoint_y = 768 / 2;

    this.knight = new Knight(this.game, 800 - 64 / 1.5, 1100);
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
        this.knight.y = 244;

        // add map and teleporter
        this.game.addEntity(new Map(this.game, 0, 0));
        this.game.addEntity(new Teleporter(this.game, 168 * 32, 32 * 6, 1, true));

        this.minX = 32;
        this.minY = 0;

        this.maxX = 3216 + 32 * 57;
        this.maxY = 45 * 60;
        this.playMusic("./music/Glitterglade_Grove.mp3");
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
        this.playMusic("./music/Orchestral_RATM.mp3");
      }
    } else if (level == 2) {
      if (boss) {
      } else {
      }
    }
  }

  updateAudio() {
    var mute = document.getElementById("mute").checked;
    var volume = document.getElementById("volume").value;

    ASSET_MANAGER.muteAudio(mute);
    ASSET_MANAGER.setVolume(volume);
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

    let midpoint_x = 1366 / 2 - 48;
    let midpoint_y = 768 / 2 - (62 * 2.5) / 2;

    if (this.death_offset == 0) {
      this.x = Math.min(Math.max(this.knight.x - midpoint_x, this.minX), this.maxX) + this.x_offset;
    } else {
      this.x = this.knight.x - midpoint_x + this.x_offset - this.death_offset;
    }
    this.y = Math.min(Math.max(this.knight.y - midpoint_y, this.minY), this.maxY) + this.y_offset;

    this.updateAudio();
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.drawImage(this.vignette, 0, 0, 1366, 768);
    ctx.restore();
  }

  screenshake() {
    if (this.shakeDuration <= 0 && this.shakeCooldown <= 0) {
      this.shakeDuration = 0.05;
      this.shakeCooldown = 0.3;
    }
  }

  playMusic(path) {
    ASSET_MANAGER.pauseAudio();
    ASSET_MANAGER.playAudio(path);
    ASSET_MANAGER.autoRepeat(path);
  }
}
