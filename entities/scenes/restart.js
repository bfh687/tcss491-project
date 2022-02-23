class Restart {
  constructor(game) {
    Object.assign(this, { game });
    this.game.camera.death_offset = 1366 / 4 + 49;
    this.defaultTimer = 15;
    this.selections = ["restart", "mainmenu"];
    this.selectedOption = "default";
    this.message = "";
    this.game.restart = true;
    this.dots = 0;
    this.dotString = "";
    this.dotCooldown = 0.5;
  }

  update() {
    this.defaultTimer -= this.game.clockTick;
    if (this.dotCooldown > 0) {
      this.dotCooldown -= this.game.clockTick;
    } else {
      this.dotCooldown = 0.5;
      this.dots = (this.dots + 1) % 4;
    }
    this.dotString = "";
    for (let i = 0; i < this.dots; i++) {
      this.dotString += ".";
    }
    if (this.selectedOption == "default") {
      this.message = "You will be returned to main menu in " + Math.ceil(this.defaultTimer) + " seconds";
    }

    if (this.defaultTimer <= 0) {
      this.removeFromWorld = true;
      this.game.camera = new SceneManager(this.game);
      this.game.boss = false;
      this.game.restart = false;
    }
  }

  draw(ctx) {
    var mouseBox = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);
    var optionWidth = 400;
    var optionHeight = 75;

    var boxWidth = 1366 / 2 - 500;
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = 1;

    ctx.fillRect(0, 0, 1366 / 2 + 100, 1000);
    ctx.globalAlpha = 1;

    ctx.font = "30px bitpap";
    ctx.fillStyle = "white";
    var deathString = "YOU HAVE DIED";
    var widthDeathString = ctx.measureText(deathString).width / 2;
    ctx.fillText(deathString, 1366 / 2 - 450 + widthDeathString + 10, 61);

    var deathString2 = this.message;
    ctx.fillText(deathString2 + this.dotString, 1366 / 2 - 850 + 258 + 30, 120);

    ctx.globalAlpha = 1;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;

    // outlines
    ctx.strokeRect(boxWidth, 235, optionWidth, optionHeight);
    ctx.strokeRect(boxWidth, 435, optionWidth, optionHeight);
    // ctx.strokeRect(boxWidth, 535, optionWidth, optionHeight);

    // options
    ctx.globalAlpha = 1;
    ctx.font = "50px bitpap";
    ctx.fillStyle = "white";

    // restart
    var restartString = "R E S T A R T";
    var restartStringWidth = ctx.measureText(restartString).width / 2;
    ctx.fillText(restartString, 1366 / 2 - 525 + restartStringWidth, 235 + 52);

    var restartBox = new BoundingBox(boxWidth, 235, optionWidth, optionHeight);
    if (mouseBox.collide(restartBox) && this.game.single_click) {
      this.selectedOption = this.selections[0];
      this.game.camera.knight = new Knight(this.game, this.game.camera.midpoint_x, this.game.camera.midpoint_y);
      this.game.camera.death_offset = 0;
      this.game.restart = false;
      this.game.boss = false;
      this.game.camera.loadLevel(1, false);
    }

    // main menu
    var menuString = "M E N U";
    var menuStringWidth = ctx.measureText(restartString).width / 2;
    ctx.fillText(menuString, 1366 / 2 - 485 + menuStringWidth, 435 + 52);

    var menuBox = new BoundingBox(boxWidth, 435, optionWidth, optionHeight);
    if (mouseBox.collide(menuBox) && this.game.single_click) {
      this.selectedOption = this.selections[1];
      this.game.restart = false;
      this.game.boss = false;
      this.game.camera = new SceneManager(this.game);
    }

    // controls
    // var controlString = "C O N T R O L S";
    // var controlStringWidth = ctx.measureText(controlString).width / 2;
    // ctx.fillText(controlString, 1366 / 2 - 600 + controlStringWidth, 535 + 52);

    ctx.restore();
  }
}
