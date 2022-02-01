class Shop {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/shop.png");
    this.icons = ASSET_MANAGER.getAsset("./sprites/hud/icons.png");

    this.drawIcon = false;
    this.isShopActive = false;

    this.interaction_box = new BoundingBox(this.x + 48, this.y + 128, 96, 96);
    this.boundingBox = new BoundingBox(this.x + 59, this.y + 138, 73, 47);

    this.alpha = 0;
    this.color = "red";
  }

  update() {
    const knight = this.game.knight;
    // if player collides with me, display the thing and make me interactable
    // if interact, then

    if (this.interaction_box.collide(knight.hurtBox)) {
      this.alpha = Math.min(1, this.alpha + this.game.clockTick * 6);

      // enter shop
      if (this.game.keys.e && !this.isShopActive) {
        this.color = "red";
        this.isShopActive = true;
        this.game.addEntity(new ShopUI(this.game, this));
      }

      // leave shop
      else if (this.game.keys.q && this.isShopActive) {
        this.color = "purple";
        this.isShopActive = false;
      }
    } else {
      this.alpha = Math.max(0, this.alpha - this.game.clockTick * 6);
      this.isShopActive = false;
    }
  }

  draw(ctx) {
    // draw shop keeper
    ctx.drawImage(this.spritesheet, 0, 0, 96, 96, this.x - this.game.camera.x, this.y - this.game.camera.y, 96 * 2, 96 * 2);

    // draw icon
    ctx.save();
    ctx.globalAlpha = this.alpha;
    if (this.drawIcon || this.alpha > 0) {
      ctx.drawImage(
        this.icons,
        112,
        32,
        16,
        16,
        this.boundingBox.left + (this.boundingBox.right - this.boundingBox.left) / 2 - this.game.camera.x - 12,
        this.y - this.game.camera.y + Math.sin(this.game.timer.gameTime * 2) * 4,
        24,
        24
      );
    }
    ctx.restore();

    if (params.DEBUG) {
      drawBoundingBox(this.interaction_box, ctx, this.game, this.color);
      drawBoundingBox(this.boundingBox, ctx, this.game, "white");
    }
  }
}

class ShopUI {
  constructor(game, shop) {
    Object.assign(this, { game, shop });
  }

  update() {}

  draw(ctx) {
    if (this.shop.isShopActive) {
      ctx.save();
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "black";
      ctx.fillRect(1366 / 2 - 300, 768 / 2 - 325, 600, 650);
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = "white";
      ctx.fillRect(1366 / 2 - 300 + 25, 768 / 2 - 300, 550, 100);
      ctx.fillStyle = "black";
      ctx.fillText("TEST SHOP ITEM 1", 1366 / 2 - 300 + 35, 768 / 2 - 275);
      ctx.fillStyle = "white";
      ctx.fillRect(1366 / 2 - 300 + 25, 768 / 2 - 175, 550, 100);
      ctx.fillStyle = "black";
      ctx.fillText("TEST SHOP ITEM 2", 1366 / 2 - 300 + 35, 768 / 2 - 150);
      ctx.fillStyle = "white";
      ctx.fillRect(1366 / 2 - 300 + 25, 768 / 2 - 50, 550, 100);
      ctx.fillStyle = "black";
      ctx.fillText("TEST SHOP ITEM 3", 1366 / 2 - 300 + 35, 768 / 2 - 25);
      ctx.fillStyle = "white";
      ctx.fillRect(1366 / 2 - 300 + 25, 768 / 2 + 75, 550, 100);
      ctx.fillStyle = "black";
      ctx.fillText("TEST SHOP ITEM 4", 1366 / 2 - 300 + 35, 768 / 2 + 100);
      ctx.fillStyle = "white";
      ctx.fillRect(1366 / 2 - 300 + 25, 768 / 2 + 200, 550, 100);
      ctx.fillStyle = "black";
      ctx.fillText("TEST SHOP ITEM 5", 1366 / 2 - 300 + 35, 768 / 2 + 225);

      ctx.restore();
    } else {
      // remove from world if associated shop isnt active
      this.removeFromWorld = true;
    }
  }
}
