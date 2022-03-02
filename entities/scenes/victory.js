class Victory {
  constructor(game) {
    Object.assign(this, { game });
    this.game.camera.death_offset = 0;
    this.defaultTimer = 100;
    this.selections = ["restart", "mainmenu"];
    this.selectedOption = "default";
    this.message = "";
    this.game.restart = true;
    this.dots = 0;
    this.dotString = "";
    this.dotCooldown = 0.5;
    this.time = this.game.timer.gameTime;
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

    var boxWidth = 1366 / 2 - optionWidth / 2;
    var center = 1366 / 2;
    ctx.save();
    // ctx.fillStyle = "black";
    // ctx.globalAlpha = 1;

    // ctx.fillRect(0, 0, 1366 / 2 + 100, 1000);
    ctx.globalAlpha = 1;

    ctx.font = "30px bitpap";
    ctx.fillStyle = "green";
    var victoryString = "VICTORY";
    var victoryTime = " - " + this.time.toFixed(2) + " seconds";
    var widthVictoryString = ctx.measureText(victoryString).width / 2;
    ctx.fillText(victoryString, center - widthVictoryString - 70, 61);
    ctx.fillStyle = "white";
    ctx.fillText(victoryTime, center + widthVictoryString - 65, 61);

    var deathString2 = this.message;
    ctx.fillText(deathString2 + this.dotString, boxWidth - 50, 120);

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

    // Restart

    var restartBox = new BoundingBox(boxWidth, 235, optionWidth, optionHeight);
    if (mouseBox.collide(restartBox) && this.game.single_click) {
      this.selectedOption = this.selections[0];
      this.game.camera.knight = new Knight(this.game, 800 - 64 / 1.5, 1100);
      this.game.camera.death_offset = 0;
      this.game.restart = false;
      this.game.boss = false;
      this.game.camera.loadLevel(1, false);
    }

    if (mouseBox.collide(restartBox) && !this.game.single_click) {
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "black";
      ctx.fillRect(boxWidth, 235, optionWidth, optionHeight);
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = "white";
    var restartString = "R E S T A R T";
    var restartStringWidth = ctx.measureText(restartString).width / 2;
    ctx.fillText(restartString, center - restartStringWidth + 10, 235 + 52);

    // main menu

    var menuBox = new BoundingBox(boxWidth, 435, optionWidth, optionHeight);
    if (mouseBox.collide(menuBox) && !this.game.single_click) {
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "black";
      ctx.fillRect(boxWidth, 435, optionWidth, optionHeight);
      ctx.globalAlpha = 1;
    }

    if (mouseBox.collide(menuBox) && this.game.single_click) {
      this.selectedOption = this.selections[1];
      this.game.restart = false;
      this.game.boss = false;
      this.game.camera = new SceneManager(this.game);
    }

    ctx.fillStyle = "white";
    var menuString = "M E N U";
    var menuStringWidth = ctx.measureText(restartString).width / 2;
    ctx.fillText(menuString, center - menuStringWidth - 10 + restartStringWidth / 2, 435 + 52);

    // controls
    // var controlString = "C O N T R O L S";
    // var controlStringWidth = ctx.measureText(controlString).width / 2;
    // ctx.fillText(controlString, 1366 / 2 - 600 + controlStringWidth, 535 + 52);

    ctx.restore();
  }
}
