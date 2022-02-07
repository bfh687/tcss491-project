class Sign {
  constructor(game, x, y, code, dialogue) {
    Object.assign(this, { game, x, y, dialogue });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/props.png");
    this.init(code);

    this.drawIcon = false;
    this.isSignActive = false;

    this.interaction_box = new BoundingBox(this.x - 16, this.y, 96, 96);

    // east/west sign
    this.boundingBox = new BoundingBox(this.x + 6, this.y + 50, 48, 12);

    this.alpha = 0;
    this.color = "red";
  }

  update() {
    const knight = this.game.knight;

    if (this.interaction_box.collide(knight.hurtBox)) {
      this.alpha = Math.min(1, this.alpha + this.game.clockTick * 6);

      // enter sign dialogue
      if (this.game.keys.e && !this.isSignActive) {
        this.color = "purple";
        this.isSignActive = true;
        this.game.addEntity(new SignUI(this.game, this));
      }

      // leave sign dialogue
      else if (this.game.keys.q && this.isSignActive) {
        this.color = "red";
        this.isSignActive = false;
      }
    } else {
      this.alpha = Math.max(0, this.alpha - this.game.clockTick * 6);
      this.color = "red";
      this.isSignActive = false;
    }
  }

  init(code) {}

  draw(ctx) {
    // draw sign shadow

    // draw sign
    ctx.drawImage(this.spritesheet, 3 * 32, 5 * 32, 32, 32, this.x - this.game.camera.x, this.y - this.game.camera.y, 32 * 2, 32 * 2);

    var center = this.boundingBox.left + (this.boundingBox.right - this.boundingBox.left) / 2;

    // draw icon
    // ctx.save();
    // ctx.globalAlpha = this.alpha;
    // if (this.drawIcon || this.alpha > 0) {
    //   ctx.drawImage(
    //     this.icons,
    //     112,
    //     32,
    //     16,
    //     16,
    //     center - this.game.camera.x - 12,
    //     this.y - this.game.camera.y + Math.sin(this.game.timer.gameTime * 2) * 4,
    //     24,
    //     24
    //   );

    var width = ctx.measureText("PRESS E TO READ").width / 2;

    // draw info text
    ctx.fillStyle = "black";
    ctx.fillText(
      "PRESS E TO READ",
      center - width - this.game.camera.x + 1,
      this.y + 50 - this.game.camera.y + 1 + Math.sin(this.game.timer.gameTime * 2) * 4
    );

    ctx.fillStyle = "white";
    ctx.fillText(
      "PRESS E TO READ",
      center - width - this.game.camera.x,
      this.y + 50 - this.game.camera.y + Math.sin(this.game.timer.gameTime * 2) * 4
    );

    ctx.restore();

    if (params.DEBUG) {
      drawBoundingBox(this.interaction_box, ctx, this.game, this.color);
      drawBoundingBox(this.boundingBox, ctx, this.game, "white");
    }
  }
}

class SignUI {
  constructor(game, sign) {
    Object.assign(this, { game, sign });
    this.x = sign.x;
    this.y = sign.y;
    this.dialogue = sign.dialogue;
    this.dialogue_index = 0;
    this.interaction_cooldown = 0.5;
  }

  update() {
    this.interaction_cooldown -= this.game.clockTick;
    if (this.game.keys[" "] && this.interaction_cooldown <= 0) {
      if (this.dialogue_index == this.dialogue.length - 1) {
        this.removeFromWorld = true;
      } else {
        this.dialogue_index++;
        this.interaction_cooldown = 0.5;
      }
    }
  }

  draw(ctx) {
    // refactor to draw sign item, where you pass sprite, x, y, item description, and item
    if (this.sign.isSignActive) {
      ctx.save();
      ctx.fillStyle = "black";
      ctx.globalAlpha = 0.7;
      ctx.fillRect(1366 / 2 - 350, 768 - 250, 700, 110);
      ctx.globalAlpha = 1;
      var text = this.dialogue[this.dialogue_index];
      ctx.fillStyle = "white";
      ctx.fillText(text, 1366 / 2 - 335, 768 - 250 + 100);
      ctx.restore();
      var mouseBox = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);
    } else {
      // remove from world if associated sign isnt active
      this.removeFromWorld = true;
    }
  }
}
