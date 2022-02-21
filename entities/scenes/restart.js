class Restart {
  constructor(game, x) {
    Object.assign(this, { game, x });
    this.game.camera.death_offset = 1366 / 4;
    this.defaultTimer = 10;
    this.selections = ["restart", "mainmenu"];
    this.selectedOption = "default";
  }

  update() {}

  draw(ctx) {
    var mouseBox = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);
    var optionWidth = 400;
    var optionHeight = 75;
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.3;

    ctx.fillRect(0, 0, 1366 / 2 + 100, 1000);
    ctx.globalAlpha = 1;

    ctx.font = "30px bitpap";
    ctx.fillStyle = "white";
    var deathString = "YOU HAVE DIED";
    var widthDeathString = ctx.measureText(deathString).width / 2;
    ctx.fillText(deathString, 1366 / 2 - 475 + widthDeathString + 10, 61);

    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = "white";

    // outlines
    ctx.strokeRect(1366 / 2 - 525, 135, optionWidth, optionHeight);
    ctx.strokeRect(1366 / 2 - 525, 335, optionWidth, optionHeight);
    ctx.strokeRect(1366 / 2 - 525, 535, optionWidth, optionHeight);

    // options
    ctx.globalAlpha = 1;
    ctx.font = "50px bitpap";
    ctx.fillStyle = "white";

    // restart
    var restartString = "R E S T A R T";
    var restartStringWidth = ctx.measureText(restartString).width / 2;
    ctx.fillText(restartString, 1366 / 2 - 550 + restartStringWidth, 135 + 52);

    var restartBox = new BoundingBox(1366 / 2 - 525, 135, optionWidth, optionHeight);
    if (mouseBox.collide(restartBox) && this.game.single_click) {
      this.game.camera.knight = new Knight(this.game, 800 - 64 / 1.5, 1100);
      this.game.camera.death_offset = 0;
      this.game.camera.loadLevel(1, false);
    }

    // main menu
    var menuString = "M E N U";
    var menuStringWidth = ctx.measureText(restartString).width / 2;
    ctx.fillText(menuString, 1366 / 2 - 500 + menuStringWidth, 335 + 52);

    var menuBox = new BoundingBox(1366 / 2 - 525, 335, optionWidth, optionHeight);
    if (mouseBox.collide(menuBox) && this.game.single_click) {
      this.game.camera = new SceneManager(this.game);
    }

    // controls
    var controlString = "C O N T R O L S";
    var controlStringWidth = ctx.measureText(controlString).width / 2;
    ctx.fillText(controlString, 1366 / 2 - 600 + controlStringWidth, 535 + 52);

    ctx.restore();
  }
}
