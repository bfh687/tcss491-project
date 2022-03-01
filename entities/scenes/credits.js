class Credits {
  constructor(game, x, y) {
    Object.assign(this, { game });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/level_1.png");

    this.startX = x || 300;
    this.startY = y || 100;

    this.x = this.startX;
    this.y = this.startY;
    this.alpha = 0;
    this.speed = 120;
    this.transition = true;

    this.offset = 0;
  }

  update() {
    this.offset -= this.game.clockTick * 50;
    this.x += this.game.clockTick * this.speed;
    this.y += (this.game.clockTick * this.speed) / 12;

    if (this.x > 4800) {
      this.x = this.startX;
    }
    if (this.y > 2600) {
      this.x = this.startX;
      this.y = this.startY;
    }
  }

  draw(ctx) {
    // draw the map
    ctx.drawImage(this.spritesheet, 0, 0, 3216, 1760, -this.x, -this.y, 3216 * 2, 1760 * 2);

    // draw the name of game
    ctx.save();
    ctx.font = "96px bitpap";

    const title = "CREDITS";
    const width = ctx.measureText(title).width / 2;

    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.4;
    ctx.fillText(title, this.game.width() / 2 - width + 5, 150 + 5);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText(title, this.game.width() / 2 - width, 150);
    ctx.restore();

    var finished = false;

    ctx.save();
    const gap = 25;
    const start = 660;
    for (var i = 0; i < credits.length; i++) {
      if (
        credits[i] == "PROGRAMMERS" ||
        credits[i] == "BOSS DESIGN" ||
        credits[i] == "LEVEL DESIGN" ||
        credits[i] == "MUSIC" ||
        credits[i] == "SPRITES"
      )
        ctx.font = "32px bitpap";
      else ctx.font = "24px bitpap";

      const width = ctx.measureText(credits[i]).width / 2;
      const pos = start + (i * gap + this.offset);

      var alpha;
      if (pos < 300) alpha = (pos - 200) / 50;
      else if (pos > 500) alpha = 1 - (pos - 600) / 50;
      else alpha = 1;

      alpha = Math.max(0, alpha);
      alpha = Math.min(1, alpha);

      // draw shadow
      ctx.globalAlpha = 0.4 * alpha;
      ctx.fillStyle = "black";
      ctx.fillText(credits[i], this.game.width() / 2 - width + 3, pos + 3);

      // draw foreground
      ctx.globalAlpha = 1 * alpha;
      ctx.fillStyle = "white";
      ctx.fillText(credits[i], this.game.width() / 2 - width, pos);

      if (i == credits.length - 1 && pos < 200) finished = true;
    }
    ctx.restore();

    if (finished) this.game.camera.loadMainMenu(this.x, this.y);
  }
}

const credits = [
  "PROGRAMMERS",
  "",
  "Blake Hamilton",
  "Benjamin Stewart",
  "Alexander Perez",
  "",
  "",
  "BOSS DESIGN",
  "",
  "Blake Hamilton",
  "Benjamin Stewart",
  "Naomi Nottingham",
  "",
  "",
  "LEVEL DESIGN",
  "",
  "Alexander Perez",
  "Blake Hamilton",
  "",
  "",
  "MUSIC",
  "",
  "Naomi Nottingham",
  "Benjamin Stewart",
  "",
  "",
  "SPRITES",
  "",
  "Sprite Store 1",
  "Sprite Store 2",
  "Sprite Store 3",
  "Sprite Store 4",
];
