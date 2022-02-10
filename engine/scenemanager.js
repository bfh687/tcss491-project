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

    this.transitionIndex = 0;
    this.frameCooldown = 0.1;
    this.alpha = 0;
    this.textAlpha = 0;
  }

  clearEntities() {
    this.game.entities.forEach(function (entity) {
      entity.removeFromWorld = true;
    });
  }

  loadLevel(x, y, transition, title) {
    this.clearEntities();
    let midpoint_x = 1366 / 2 - 64 * 1.25;
    let midpoint_y = 768 / 2 - 64 * 1.25;
    this.knight = new Knight(this.game, midpoint_x + 1700, midpoint_y + 200);
    this.game.addEntity(new Map(this.game, 0, 0));
    this.game.addEntity(new Cursor(this.game));
    this.game.addEntity(new HUD(this.game, this.knight));

    this.game.addEntity(this.knight);
    this.game.addEntity(this);
    //this.game.addEntity(new Shop(this.game, 1366 / 2 + 50 * 16 - 85, 670));
  }

  update() {
    this.frameCooldown -= this.game.clockTick;
    let midpoint_x = 1366 / 2 - 35;
    let midpoint_y = 768 / 2 - (62 * 2.5) / 2 - 20;
    this.x = this.knight.x - midpoint_x;
    this.y = this.knight.y - midpoint_y;
    if (this.knight.state == 4 && this.knight.animations[this.knight.state][this.knight.direction].isDone()) {
      this.loadLevel(0, 0, true, true);
    }
    console.log(this.game.entities);
  }

  draw(ctx) {
    const frame = ASSET_MANAGER.getAsset("./sprites/death_transition/death_transition (" + this.transitionIndex + ").png");
    if (frame && this.frameCooldown <= 0) {
      this.frameCooldown = 0.07;
      this.transitionIndex++;
    }
    if (frame) ctx.drawImage(frame, 0, 0, 1366, 780);
    if (this.transitionIndex > 6) {
      this.alpha = Math.min(this.alpha + this.game.clockTick, 1);
    }
    if (this.transitionIndex > 8) {
      this.textAlpha = Math.min(this.textAlpha + this.game.clockTick, 1);
    }
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = this.alpha;
    ctx.fillRect(0, 0, 1400, 800);
    ctx.restore();

    if (this.transitionIndex > 8) {
      ctx.save();
      ctx.globalAlpha = this.textAlpha;
      ctx.font = "32px bitpap";
      ctx.fillStyle = "white";
      ctx.fillText("YOU DIED.", 1366 / 2 - ctx.measureText("YOU DIED.").width / 2, 768 / 2 + 8);
      ctx.restore();
    }
  }
}
