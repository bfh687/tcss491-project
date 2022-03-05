class MainMenu {
  constructor(game, x, y) {
    Object.assign(this, { game });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/level_1.png");

    this.wKey = ASSET_MANAGER.getAsset("./sprites/controls/W.png");
    this.aKey = ASSET_MANAGER.getAsset("./sprites/controls/A.png");
    this.sKey = ASSET_MANAGER.getAsset("./sprites/controls/S.png");
    this.dKey = ASSET_MANAGER.getAsset("./sprites/controls/D.png");
    this.eKey = ASSET_MANAGER.getAsset("./sprites/controls/E.png");
    this.tabKey = ASSET_MANAGER.getAsset("./sprites/controls/TAB.png");
    this.spaceKey = ASSET_MANAGER.getAsset("./sprites/controls/SPACEALTERNATIVE.png");
    this.back = ASSET_MANAGER.getAsset("./sprites/controls/ui_buttons.png");

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

    // bounding box info
    this.mouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);
    this.backBB = new BoundingBox(25, 20, 32, 32);

    // back button info
    this.backButtonCooldown = 0;
    this.alpha = 1;
    this.xOffset = 0;
    this.yOffset = 0;

    // hover booleans for sound
    this.backHover = false;
    this.playHover = false;
    this.controlsHover = false;
    this.creditsHover = false;
  }

  update() {
    this.mouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);

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
    else if (this.state == 1) this.updateMainMenu();
    else if (this.state == 2) this.updateControls();
    else if (this.state == 3) this.updateCredits();

    if (this.state != 0) this.updateBackButton();
  }

  draw(ctx) {
    // draw the map
    ctx.drawImage(this.spritesheet, 0, 0, 3216, 1760, -this.x, -this.y, 3216 * 2, 1760 * 2);

    // draw screen relevant to state
    if (this.state == 0) this.drawTitleScreen(ctx);
    if (this.state == 1) this.drawMainMenu(ctx);
    if (this.state == 2) this.drawControls(ctx);
    if (this.state == 3) this.drawCredits(ctx);

    if (this.state != 0) this.drawBackButton(ctx);
  }

  updateTitleScreen() {
    if (this.game.keys[" "]) {
      this.state = 1;
      var path = "./sfx/menu_select.mp3";
      ASSET_MANAGER.getAsset(path).volume = 0.5;
      ASSET_MANAGER.playAudio(path);
    }
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
    ctx.font = "24px bitpap";

    ctx.globalAlpha = Math.abs(Math.sin(this.alpha)) * 0.4;

    ctx.fillStyle = "black";
    ctx.fillText("PRESS SPACE TO CONTINUE", this.game.width() / 2 - width + 2, this.game.height() / 2 + 40 + 2);

    ctx.globalAlpha = Math.abs(Math.sin(this.alpha));

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
    if (mouseBox.collide(this.playBox)) {
      // load game on click
      if (this.game.left_click && this.game.camera.transition == null) {
        this.game.camera.transition = new FadeTransition(this.game, 2.5, 1, false);
        var path = "./sfx/menu_select.mp3";
        ASSET_MANAGER.getAsset(path).volume = 0.5;
        ASSET_MANAGER.playAudio(path);
      }
      if (!this.playHover && this.game.camera.transition == null) {
        this.playHover = true;
        var path = "./sfx/menu_hover.mp3";
        ASSET_MANAGER.getAsset(path).volume = 0.5;
        ASSET_MANAGER.playAudio(path);
      }
    } else {
      this.playHover = false;
    }

    const controlWidth = 119.25;
    this.controlBox = new BoundingBox(this.game.width() / 2 - controlWidth / 2, this.game.height() / 6 + 63 + 120 + 40, controlWidth, 30);
    if (mouseBox.collide(this.controlBox)) {
      if (this.game.left_click) {
        this.state = 2;
        var path = "./sfx/menu_select.mp3";
        ASSET_MANAGER.getAsset(path).volume = 0.5;
        ASSET_MANAGER.playAudio(path);
      }

      if (!this.controlsHover && this.game.camera.transition == null) {
        this.controlsHover = true;
        var path = "./sfx/menu_hover.mp3";
        ASSET_MANAGER.getAsset(path).volume = 0.5;
        ASSET_MANAGER.playAudio(path);
      }
    } else {
      this.controlsHover = false;
    }

    const creditsWidth = 90;
    this.creditsBox = new BoundingBox(this.game.width() / 2 - creditsWidth / 2, this.game.height() / 6 + 63 + 120 + 80, creditsWidth, 30);
    if (mouseBox.collide(this.creditsBox)) {
      if (this.game.left_click) {
        this.state = 3;
        var path = "./sfx/menu_select.mp3";
        ASSET_MANAGER.getAsset(path).volume = 0.5;
        ASSET_MANAGER.playAudio(path);
      }

      if (!this.creditsHover && this.game.camera.transition == null) {
        this.creditsHover = true;
        var path = "./sfx/menu_hover.mp3";
        ASSET_MANAGER.getAsset(path).volume = 0.5;
        ASSET_MANAGER.playAudio(path);
      }
    } else {
      this.creditsHover = false;
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
    var offset = 0;
    if (this.playHover) {
      offset = 1;
    }

    ctx.fillStyle = "white";
    ctx.fillText(title, this.game.width() / 2 - width + offset, this.game.height() / 6 + 9 + 80 + 120 + offset);
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
    offset = 0;
    if (this.controlsHover) {
      offset = 1;
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText(title, this.game.width() / 2 - width + offset, this.game.height() / 6 + 9 + 80 + 120 + 40 + offset);
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
    offset = 0;
    if (this.creditsHover) {
      offset = 1;
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText(title, this.game.width() / 2 - width + offset, this.game.height() / 6 + 9 + 80 + 120 + 80 + offset);
    ctx.restore();
  }

  updateControls() {}
  drawControls(ctx) {
    ctx.save();
    ctx.font = "96px bitpap";

    const title = "CONTROLS";
    const width = ctx.measureText(title).width / 2;
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.4;
    ctx.fillText(title, this.game.width() / 2 - width + 5, 150 + 5);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText(title, this.game.width() / 2 - width, 150);
    ctx.restore();

    ctx.save();
    ctx.font = "24px bitpap";

    var keyOffsetX = engine.width() / 2 - 126 / 2 - 8;
    var keyOffsetY = 200;

    ctx.drawImage(this.wKey, 0, 0, 19, 21, 50 + keyOffsetX, 20 + keyOffsetY, 38, 42);
    ctx.drawImage(this.aKey, 0, 0, 19, 21, 8 + keyOffsetX, 65 + keyOffsetY, 38, 42);
    ctx.drawImage(this.dKey, 0, 0, 19, 21, 92 + keyOffsetX, 65 + keyOffsetY, 38, 42);
    ctx.drawImage(this.sKey, 0, 0, 19, 21, 50 + keyOffsetX, 65 + keyOffsetY, 38, 42);

    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "black";
    ctx.fillText("MOVEMENT", 30 + keyOffsetX + 3, 135 + keyOffsetY + 3);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText("MOVEMENT", 30 + keyOffsetX, 135 + keyOffsetY);

    keyOffsetX = engine.width() / 2 - 126 / 2 - 50 + 129 - 32;
    keyOffsetY = 220;

    ctx.drawImage(this.eKey, 0, 0, 19, 21, 50 + keyOffsetX, 140 + keyOffsetY, 38, 42);

    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "black";
    ctx.fillText("INTERACT", 34 + keyOffsetX + 3, 210 + keyOffsetY + 3);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText("INTERACT", 34 + keyOffsetX, 210 + keyOffsetY);

    keyOffsetX = engine.width() / 2 - 98 - 5;
    keyOffsetY = 135;

    ctx.drawImage(this.spaceKey, 0, 0, 98, 21, 8 + keyOffsetX, 320 + keyOffsetY, 98 * 2, 42);

    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "black";
    ctx.fillText("DASH / SKIP TEXT", 34 + keyOffsetX + 3, 389 + keyOffsetY + 3);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText("DASH / SKIP TEXT", 34 + keyOffsetX, 389 + keyOffsetY);

    keyOffsetX = engine.width() / 2 - 126 / 2 - 50 + 50 - 32;
    keyOffsetY = -140;

    ctx.drawImage(this.tabKey, 0, 0, 33, 21, 20 + keyOffsetX, 20 + 60 * 8 + keyOffsetY, 33 * 2, 21 * 2);

    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "black";
    ctx.fillText("MENU", 32 + keyOffsetX + 3, 570 + keyOffsetY + 3);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText("MENU", 32 + keyOffsetX, 570 + keyOffsetY);

    ctx.restore();
  }

  updateCredits() {
    this.creditsOffset -= this.game.clockTick * 65;
  }

  drawCredits(ctx) {
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
      const pos = start + (i * gap + this.creditsOffset);

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

    if (finished) {
      this.state = 1;
      this.creditsOffset = 0;
    }
  }
  updateBackButton() {
    this.backButtonCooldown -= this.game.clockTick;

    if (this.mouseBB.collide(this.backBB)) {
      this.alpha = 0.8;
      this.xOffset = 1;
      this.yOffset = 1;
      if (this.game.left_click && this.backButtonCooldown <= 0) {
        if (this.state == 3) this.creditsOffset = 0;
        if (this.state != 1) {
          this.state = 1;
        } else if (this.state == 1) {
          this.state = 0;
        }
        this.backButtonCooldown = 0.25;

        var path = "./sfx/menu_select.mp3";
        ASSET_MANAGER.getAsset(path).volume = 0.5;
        ASSET_MANAGER.playAudio(path);
      }

      if (!this.backHover) {
        this.backHover = true;
        var path = "./sfx/menu_hover.mp3";
        ASSET_MANAGER.getAsset(path).volume = 0.5;
        ASSET_MANAGER.playAudio(path);
      }
    } else {
      this.alpha = 1;
      this.xOffset = 0;
      this.yOffset = 0;
      this.backHover = false;
    }
  }

  drawBackButton(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(this.back, 0, 0, 128, 128, 25 + this.xOffset, 20 + this.yOffset, 32, 32);
    ctx.restore();
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
