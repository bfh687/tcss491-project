class MainMenu {
  constructor(game, x, y) {
    Object.assign(this, { game });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/level_1.png");

    this.startX = x || 300;
    this.startY = y || 100;

    this.x = this.startX;
    this.y = this.startY;
    this.speed = 120;

    // 0: title screen, 1: main menu, 2: controls, 3: credits
    this.state = 0;

    // main menu variables
    this.alpha = 0;

    // credits variables
    this.creditsOffset = 0;
  }

  update() {
    this.x += this.game.clockTick * this.speed;
    this.y += (this.game.clockTick * this.speed) / 12;

    if (this.x > 4800) {
      this.x = this.startX;
    }
    if (this.y > 2600) {
      this.x = this.startX;
      this.y = this.startY;
    }

    if (this.state == 0) this.updateTitleScreen();
    if (this.state == 1) this.updateMainMenu();
    if (this.state == 2) this.updateControls();
    if (this.state == 3) this.updateCredits();

    if (this.game.keys[" "] && this.state == 0) this.state++;
  }

  draw(ctx) {
    // draw the map
    ctx.drawImage(this.spritesheet, 0, 0, 3216, 1760, -this.x, -this.y, 3216 * 2, 1760 * 2);

    // draw screen relevant to state
    if (this.state == 0) this.drawTitleScreen(ctx);
    if (this.state == 1) this.drawMainMenu(ctx);
    if (this.state == 2) this.drawControls(ctx);
    if (this.state == 3) this.drawCredits(ctx);
  }

  updateTitleScreen() {
    this.alpha += 2 * this.game.clockTick;
  }

  drawTitleScreen(ctx) {
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

  updateMainMenu() {
    const ctx = this.game.ctx;
    const mouseBox = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);

    ctx.save();
    ctx.font = "36px bitpap";

    const playWidth = 56.25;
    this.playBox = new BoundingBox(this.game.width() / 2 - playWidth / 2, this.game.height() / 6 + 63 + 120, playWidth, 30);
    if (mouseBox.collide(this.playBox) && this.game.left_click) {
      // load game
      this.game.camera.transition = new FadeTransition(this.game, 2.5, 1, false);
    }

    const controlWidth = 119.25;
    this.controlBox = new BoundingBox(this.game.width() / 2 - controlWidth / 2, this.game.height() / 6 + 63 + 120 + 40, controlWidth, 30);
    if (mouseBox.collide(this.controlBox) && this.game.left_click) {
      this.state = 2;
    }

    const creditsWidth = 90;
    this.creditsBox = new BoundingBox(this.game.width() / 2 - creditsWidth / 2, this.game.height() / 6 + 63 + 120 + 80, creditsWidth, 30);
    if (mouseBox.collide(this.creditsBox) && this.game.left_click) {
      this.state = 3;
    }

    ctx.restore();
  }

  drawMainMenu(ctx) {
    if (this.playBox) drawBoundingBox(this.playBox, ctx, this.game, "red");
    if (this.controlBox) drawBoundingBox(this.controlBox, ctx, this.game, "red");
    if (this.creditsBox) drawBoundingBox(this.creditsBox, ctx, this.game, "red");

    // draw play
    ctx.save();
    ctx.font = "36px bitpap";

    var title = "PLAY";
    var width = ctx.measureText(title).width / 2;
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.4;
    ctx.fillText(title, this.game.width() / 2 - width + 3, this.game.height() / 6 + 9 + 80 + 120 + 3);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText(title, this.game.width() / 2 - width, this.game.height() / 6 + 9 + 80 + 120);
    ctx.restore();

    // draw controls
    ctx.save();
    ctx.font = "36px bitpap";

    title = "CONTROLS";
    width = ctx.measureText(title).width / 2;
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.4;
    ctx.fillText(title, this.game.width() / 2 - width + 3, this.game.height() / 6 + 9 + 80 + 120 + 40 + 3);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText(title, this.game.width() / 2 - width, this.game.height() / 6 + 9 + 80 + 120 + 40);
    ctx.restore();

    // draw controls
    ctx.save();
    ctx.font = "36px bitpap";

    title = "CREDITS";
    width = ctx.measureText(title).width / 2;
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.4;
    ctx.fillText(title, this.game.width() / 2 - width + 3, this.game.height() / 6 + 9 + 80 + 120 + 80 + 3);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText(title, this.game.width() / 2 - width, this.game.height() / 6 + 9 + 80 + 120 + 80);
    ctx.restore();
  }

  updateControls() {}
  drawControls(ctx) {}

  updateCredits() {}
  drawCredits(ctx) {}
}
