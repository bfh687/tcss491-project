class Sign {
  constructor(game, x, y, code, dialogue) {
    Object.assign(this, { game, x, y, code, dialogue });

    this.spritesheet = ASSET_MANAGER.getAsset(sprites.props);
    this.shadow_spritesheet = ASSET_MANAGER.getAsset(sprites.prop_shadows);
    this.icons = ASSET_MANAGER.getAsset(sprites.icons);
    this.init(code);

    this.drawIcon = false;
    this.isSignActive = false;

    this.alpha = 0;
    this.color = "red";

    this.sound_cooldown = 0;
  }

  update() {
    const knight = this.game.knight;

    if (this.interaction_box.collide(knight.hurtBox)) {
      this.alpha = Math.min(0.9, this.alpha + this.game.clockTick * 6);

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
        this.sprite_x = 3 * 32;
        this.sprite_y = 5 * 32;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.interaction_box = new BoundingBox(this.x - 16, this.y, 96, 96);
        this.boundingBox = new BoundingBox(this.x + 6, this.y + 50, 48, 12);
        this.icon_offset = -35;
        break;
      case "westsign":
        this.sprite_x = 3 * 32;
        this.sprite_y = 7 * 32;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.interaction_box = new BoundingBox(this.x - 16, this.y, 96, 96);
        this.boundingBox = new BoundingBox(this.x + 6, this.y + 50, 48, 12);
        this.icon_offset = -35;
        break;
      case "slab1":
        this.sprite_x = 7 * 32;
        this.sprite_y = 5 * 32;
        this.sprite_width = 32;
        this.sprite_height = 64;
        this.interaction_box = new BoundingBox(this.x - 16, this.y + 50, 96, 96);
        this.boundingBox = new BoundingBox(this.x + 7, this.y + 90, 48, 32);
        this.icon_offset = 15;
        break;
      case "slab2":
        this.sprite_x = 7 * 32;
        this.sprite_y = 0 * 32;
        this.sprite_width = 32;
        this.sprite_height = 64;
        this.interaction_box = new BoundingBox(this.x - 16, this.y + 50, 96, 96);
        this.boundingBox = new BoundingBox(this.x + 7, this.y + 90, 48, 32);
        this.icon_offset = -15;
        break;
      case "slab3":
        this.sprite_x = 7 * 32;
        this.sprite_y = 2 * 32;
        this.sprite_width = 32;
        this.sprite_height = 96;
        this.interaction_box = new BoundingBox(this.x - 16, this.y + 50 + 60, 96, 96);
        this.boundingBox = new BoundingBox(this.x + 7, this.y + 90 + 60, 48, 32);
        this.icon_offset = 20;
        break;
    }
  }

  draw(ctx) {
    //draw sign shadow
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.drawImage(
      this.shadow_spritesheet,
      this.sprite_x,
      this.sprite_y,
      this.sprite_width + 32,
      this.sprite_height,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
      (this.sprite_width + 32) * 2,
      this.sprite_height * 2
    );
    ctx.restore();

    // draw sign
    ctx.save();
    ctx.globalAlpha = 1;
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
    ctx.restore();

    // draw sign overlay (will be blank squares in most cases)
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.drawImage(
      this.spritesheet,
      this.sprite_x + 32,
      this.sprite_y,
      this.sprite_width,
      this.sprite_height,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
      this.sprite_width * 2,
      this.sprite_height * 2
    );
    ctx.restore();

    // draw info text
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(
      this.icons,
      16 * 6,
      16 * 1,
      16,
      16,
      this.x - this.game.camera.x + 19,
      this.y + this.icon_offset - this.game.camera.y + Math.sin(this.game.timer.gameTime * 2) * 4,
      24,
      24
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

    this.sound_cooldown = 0;
    this.interaction_cooldown = 0.1;
    this.current_text = this.dialogue[this.dialogue_index].charAt(0);
  }

  update() {
    this.updateText();
    this.sound_cooldown -= this.game.clockTick;
    this.interaction_cooldown -= this.game.clockTick;
    if (this.game.keys[" "] && this.interaction_cooldown <= 0 && this.text_index > this.dialogue[this.dialogue_index].length - 1) {
      if (this.dialogue_index == this.dialogue.length - 1) {
        this.sign.isSignActive = false;
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
      if (this.sound_cooldown <= 0 && this.text_index < this.dialogue[this.dialogue_index].length) {
        ASSET_MANAGER.playAudio(sfx.text);
        this.sound_cooldown = 0.05;
      }
      this.current_text += this.dialogue[this.dialogue_index].charAt(this.text_index);
      this.text_cooldown = 0.0;
      this.text_index++;
    } else {
      ASSET_MANAGER.getAsset(sfx.text.path).pause();
      ASSET_MANAGER.getAsset(sfx.text.path).currentTime = 0;
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
      ctx.fillText(text, 1366 / 2 - 335, 768 - 250 + 60);
      ctx.restore();
    } else {
      this.removeFromWorld = true;
    }
  }
}
