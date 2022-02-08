class Sign {
  constructor(game, x, y, code, dialogue) {
    Object.assign(this, { game, x, y, code, dialogue });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/props.png");
    this.init(code);

    this.drawIcon = false;
    this.isSignActive = false;

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

  init(code) {
    switch (code) {
      case "eastsign":
      case "westsign":
        this.sprite_x = 3 * 32;
        this.sprite_y = 5 * 32;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.interaction_box = new BoundingBox(this.x - 16, this.y, 96, 96);
        this.boundingBox = new BoundingBox(this.x + 6, this.y + 50, 48, 12);
        break;
      case "slab1":
        this.sprite_x = 7 * 32;
        this.sprite_y = 5 * 32;
        this.sprite_width = 32;
        this.sprite_height = 64;
        this.interaction_box = new BoundingBox(this.x - 16, this.y + 50, 96, 96);
        this.boundingBox = new BoundingBox(this.x + 7, this.y + 90, 48, 32);
        break;
    }
  }

  draw(ctx) {
    // draw sign shadow

    // draw sign
    ctx.drawImage(
      this.spritesheet,
      this.sprite_x,
      this.sprite_y,
      this.sprite_width,
      this.sprite_height,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
      this.sprite_width * 2,
      this.sprite_height * 2
    );

    var center = this.boundingBox.left + (this.boundingBox.right - this.boundingBox.left) / 2;

    // draw icon
    // ctx.save();
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
    ctx.save();
    ctx.globalAlpha = this.alpha;

    if (this.code == "slab1") {
      ctx.drawImage(
        this.spritesheet,
        8 * 32,
        6 * 32,
        32,
        32,
        this.x - this.game.camera.x,
        this.y - this.game.camera.y + 64,
        this.sprite_width * 2,
        this.sprite_height
      );
    }

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

    this.text_index = 1;
    this.text_cooldown = 0;

    this.interaction_cooldown = 0.1;
    this.current_text = this.dialogue[this.dialogue_index].charAt(0);
    console.log(this.current_text);
  }

  update() {
    this.updateText();

    this.interaction_cooldown -= this.game.clockTick;
    if (
      this.game.keys[" "] &&
      this.interaction_cooldown <= 0 &&
      this.text_index > this.dialogue[this.dialogue_index].length - 1
    ) {
      if (this.dialogue_index == this.dialogue.length - 1) {
        this.removeFromWorld = true;
      } else {
        this.dialogue_index++;
        this.current_text = this.dialogue[this.dialogue_index].charAt(0);
        this.text_index = 1;
        this.interaction_cooldown = 0.5;
      }
    } else if (this.game.keys[" "] && this.interaction_cooldown <= 0) {
      this.current_text = this.dialogue[this.dialogue_index];
      this.text_index = this.current_text.length;
      this.interaction_cooldown = 0.5;
    }
  }

  updateText() {
    if (this.text_cooldown <= 0) {
      this.current_text += this.dialogue[this.dialogue_index].charAt(this.text_index);
      this.text_cooldown = 0.0;
      this.text_index++;
    } else {
      this.text_cooldown -= this.game.clockTick;
    }
  }

  draw(ctx) {
    // refactor to draw sign item, where you pass sprite, x, y, item description, and item
    if (this.sign.isSignActive) {
      ctx.save();

      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      ctx.strokeRect(1366 / 2 - 350, 768 - 250, 700, 110);

      ctx.fillStyle = "black";
      ctx.globalAlpha = 0.4;
      ctx.fillRect(1366 / 2 - 350, 768 - 250, 700, 110);
      ctx.globalAlpha = 1;
      var text = this.current_text;
      ctx.fillStyle = "white";
      ctx.font = "24px bitpap";
      ctx.fillText(text, 1366 / 2 - 335, 768 - 250 + 50);
      ctx.restore();

      var mouseBox = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);
    } else {
      // remove from world if associated sign isnt active
      this.removeFromWorld = true;
    }
  }
}
