class MainMenu {
  constructor(game) {
    Object.assign(this, { game });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/level_1.png");
    this.x = 400;
    this.y = 850;
  }

  update() {
    this.alpha += this.game.clockTick;
    this.x += this.game.clockTick * 150;
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
    ctx.font = "32px bitpap";
    ctx.fillStyle = "white";
    ctx.fillText("Press Space to continue...", this.game.width() / 2 - width, this.game.height() / 2 + 50);
    ctx.restore();
  }
}
