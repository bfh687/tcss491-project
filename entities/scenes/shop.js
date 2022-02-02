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

    var center = this.boundingBox.left + (this.boundingBox.right - this.boundingBox.left) / 2;

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
        center - this.game.camera.x - 12,
        this.y - this.game.camera.y + Math.sin(this.game.timer.gameTime * 2) * 4,
        24,
        24
      );

      var width = ctx.measureText("PRESS E TO SHOP").width / 2;

      // draw info text
      ctx.fillStyle = "black";
      ctx.fillText(
        "PRESS E TO SHOP",
        center - width - this.game.camera.x + 1,
        this.y + 130 - this.game.camera.y + 1 + Math.sin(this.game.timer.gameTime * 2) * 4
      );

      ctx.fillStyle = "white";
      ctx.fillText(
        "PRESS E TO SHOP",
        center - width - this.game.camera.x,
        this.y + 130 - this.game.camera.y + Math.sin(this.game.timer.gameTime * 2) * 4
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
    this.items = ASSET_MANAGER.getAsset("./sprites/items/shopitems.png");
  }

  update() {
    // things you should be able to buy
    // buy back health,
    // buy certain items?
  }

  draw(ctx) {
    // refactor to draw shop item, where you pass sprite, x, y, item description, and item
    if (this.shop.isShopActive) {
      ctx.save();
      ctx.font = "30px Arial";
      var width = ctx.measureText("SHOP").width / 2;
      ctx.fillStyle = "black";
      ctx.fillText("SHOP", 1366 / 2 - width + 1, 40 + 40 + 1);
      ctx.fillStyle = "white";
      ctx.fillText("SHOP", 1366 / 2 - width, 40 + 40);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "black";
      ctx.fillRect(1366 / 2 - 100, 60 + 768 / 2 - 325, 200, 300);
      ctx.restore();

      ctx.fillStyle = "white";
      ctx.drawImage(this.items, 0, 0, 32, 32, 1366 / 2 - 32, 70 + 768 / 2 - 325, 32 * 2, 32 * 2);
      ctx.fillText("Geronimo's Goggles", 1366 / 2 - 48, 70 + 768 / 2 - 325);
      ctx.fillText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, ", 1366 / 2 - 48, 70 + 768 / 2 - 325);

      ctx.drawImage(this.items, 32, 0, 32, 32, 1366 / 2 - 280, 70 + 768 / 2 - 325 + 125, 32 * 1.75, 32 * 1.75);
      ctx.fillText("______'s Armor", 1366 / 2 - 280, 70 + 768 / 2 - 325 + 125);

      ctx.drawImage(this.items, 64, 0, 32, 32, 1366 / 2 - 280, 70 + 768 / 2 - 325 + 125 * 2, 32 * 1.75, 32 * 1.75);
      ctx.fillText("______'s Potion", 1366 / 2 - 280, 70 + 768 / 2 - 325 + 125 * 2);

      ctx.drawImage(this.items, 96, 0, 32, 32, 1366 / 2 - 280, 70 + 768 / 2 - 325 + 125 * 3, 32 * 2, 32 * 2);
      ctx.fillText("______'s Dagger", 1366 / 2 - 280, 70 + 768 / 2 - 325 + 125 * 3);
    } else {
      // remove from world if associated shop isnt active
      this.removeFromWorld = true;
    }
  }
}
