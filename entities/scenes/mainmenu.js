class MainMenu {
  constructor(game, x, y) {
    Object.assign(this, { game });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/level_1.png");

    this.startX = x || 300;
    this.startY = y || 100;

    this.x = this.startX;
    this.y = this.startY;
    this.alpha = 0;
    this.speed = 120;
  }

  update() {
    this.alpha += 2 * this.game.clockTick;
    this.x += this.game.clockTick * this.speed;
    this.y += (this.game.clockTick * this.speed) / 12;

    if (this.x > 4800) {
      this.x = this.startX;
    }
    if (this.y > 2600) {
      this.x = this.startX;
      this.y = this.startY;
    }

    if (this.game.keys[" "] && !this.game.camera.transition) this.game.camera.transition = new FadeTransition(this.game, 2.5, 1, false);
    if (this.game.keys["Tab"]) this.game.camera.loadCredits(this.x, this.y);
  }

  draw(ctx) {
    // draw the map
    ctx.drawImage(this.spritesheet, 0, 0, 3216, 1760, -this.x, -this.y, 3216 * 2, 1760 * 2);

    // draw the name of game
    ctx.save();
    ctx.font = "128px bitpap";

    const title = "ZAND";
    const width = ctx.measureText(title).width / 2;

    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.4;
    ctx.fillText(title, this.game.width() / 2 - width + 5, this.game.height() / 2 + 5);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText(title, this.game.width() / 2 - width, this.game.height() / 2);
    ctx.restore();

    // draw continue
    ctx.save();
    ctx.globalAlpha = Math.abs(Math.sin(this.alpha));
    ctx.font = "24px bitpap";
    ctx.fillStyle = "white";
    ctx.fillText("PRESS SPACE TO CONTINUE", this.game.width() / 2 - width, this.game.height() / 2 + 40);
    ctx.restore();
  }
}
