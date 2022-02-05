class Shop {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/shop.png");
    this.icons = ASSET_MANAGER.getAsset("./sprites/hud/icons.png");

    this.drawIcon = false;
    this.isShopActive = false;

    this.interaction_box = new BoundingBox(this.x + 48, this.y + 128, 96, 96);
    this.boundingBox = new BoundingBox(this.x + 59, this.y + 138, 73, 47);

    this.itemLevels = 4;

    this.alpha = 0;
    this.color = "red";
    this.gogglesLevel = 0;
    this.armorLevel = 0;
    this.potionLevel = 0;
    this.daggerLevel = 0;
    this.skillPoints = 0;
  }

  update() {
    const knight = this.game.knight;
    // if player collides with me, display the thing and make me interactable
    // if interact, then
    this.skillPoints = this.game.knight.xpSystem.skillPoints;
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

  levelGoggles() {
    this.gogglesLevel++;
  }

  levelArmor() {
    this.armorLevel++;
  }

  levelPotion() {
    this.potionLevel++;
  }

  levelDagger() {
    this.daggerLevel++;
  }
}

class ShopUI {
  constructor(game, shop) {
    Object.assign(this, { game, shop });
    this.items = ASSET_MANAGER.getAsset("./sprites/items/shopitems.png");

    this.itemStartX = 1366 / 2 - 96;
    this.containerStartX = 1366 / 2 - 94;
    this.nameStartX = 1366 / 2 - 24 + 6;
    this.descriptionStartX = 1366 / 2 - 25 + 10;
    this.shopHeight = 500;
    this.bubblesStart = 1366 / 2 + 2;
    this.skillPointsHeight = 100;
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
      var widthSP = ctx.measureText("SP").width / 2;
      ctx.fillStyle = "black";
      ctx.fillText("SHOP", 1366 / 2 - width + 1, 40 + 40 + 1);
      ctx.fillStyle = "white";
      ctx.fillText("SHOP", 1366 / 2 - width, 40 + 40);

      ctx.fillStyle = "black";
      ctx.fillText("SP", 1366 / 2 - widthSP + 1 - 170, 40 + 40 + 1);
      ctx.fillStyle = "white";
      ctx.fillText("SP", 1366 / 2 - widthSP - 170, 40 + 40);

      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "black";
      //shop bg
      ctx.fillRect(1366 / 2 - 100, 60 + 768 / 2 - 325, 200, this.shopHeight);

      //sp background
      ctx.fillRect(1366 / 2 - 100 - 120, 60 + 768 / 2 - 325, 100, this.skillPointsHeight);

      ctx.restore();

      //sp
      ctx.font = "40px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(this.shop.skillPoints, 1366 / 2 - 100 - 120 / 2 - 18, 70 + 768 / 2 - 325 + 52);
      ctx.fillStyle = "white";
      ctx.fillText(this.shop.skillPoints, 1366 / 2 - 100 - 120 / 2 - 20, 70 + 768 / 2 - 325 + 50);

      var mouseBox = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);
      // GERONIMOS GOGGLES

      //item
      ctx.drawImage(this.items, 0, 0, 32, 32, this.itemStartX + 2, 70 + 768 / 2 - 325, 32 * 2, 32 * 2);
      var itemBoxGoggles = new BoundingBox(this.itemStartX + 2, 70 + 768 / 2 - 325, 32 * 2, 32 * 2);
      if (mouseBox.collide(itemBoxGoggles) && this.game.single_click) {
        // outline hovered item

        if (this.shop.skillPoints > 0) {
          this.shop.gogglesLevel++;
          this.game.knight.xpSystem.skillPoints--;
          console.log(this.shop.gogglesLevel);
        } else {
          console.log("NO SKILL POINTS AVAILABLE");
        }
        this.game.single_click = false;
        ctx.save();

        // ADD COUNT TO ITEM

        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";

        ctx.restore();
      }
      //container
      // ctx.strokeStyle = "orange";
      // ctx.strokeRect(this.containerStartX - 2, 130, 65, 60);

      //text
      ctx.font = "12px Arial";
      ctx.fillStyle = "#ddd";
      ctx.fillText("Geronimo's Goggles", this.nameStartX, 70 + 768 / 2 - 313);
      ctx.fillStyle = "white";
      ctx.fillText("Deal 1.5x Damage!", this.descriptionStartX, 70 + 768 / 2 - 290);

      // levels
      let gogglesLevel = this.shop.gogglesLevel;
      for (let i = 0; i < this.shop.itemLevels; i++) {
        ctx.beginPath();
        ctx.arc(this.bubblesStart - (86 - 14 * i), 200, 5, 0, 2 * Math.PI, false);
        if (gogglesLevel > 0) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = "gold";
          ctx.fill();
          ctx.globalAlpha = 1;
          gogglesLevel--;
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
      }

      // ARMOR

      //item
      ctx.drawImage(this.items, 32, 0, 32, 32, this.itemStartX + 5, 70 + 768 / 2 - 323 + 125, 32 * 1.75, 32 * 1.75);
      var itemBoxArmor = new BoundingBox(this.itemStartX + 5, 70 + 768 / 2 - 323 + 125, 32 * 1.75, 32 * 1.75);
      if (mouseBox.collide(itemBoxArmor) && this.game.single_click) {
        // outline hovered item

        if (this.shop.skillPoints > 0) {
          this.shop.armorLevel++;
          this.game.knight.xpSystem.skillPoints--;
          console.log(this.shop.armorLevel);
        } else {
          console.log("NO SKILL POINTS AVAILABLE");
        }
        this.game.single_click = false;

        ctx.save();

        // ADD COUNT TO ITEM

        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";

        ctx.restore();
      }

      //container
      // ctx.strokeStyle = "orange";
      // ctx.strokeRect(this.containerStartX, 70 + 768 / 2 - 326 + 122, 65, 65);
      // ctx.fillStyle = "orange";

      //text
      ctx.fillStyle = "cyan";
      ctx.fillText("Rowan's Armor", this.nameStartX, 70 + 768 / 2 - 323 + 125);
      ctx.fillStyle = "white";
      ctx.fillText("Deflect 15%", this.descriptionStartX + 3, 70 + 768 / 2 - 300 + 125);
      ctx.fillText("of damage to", this.descriptionStartX, 70 + 768 / 2 - 280 + 125);
      ctx.fillText("nearby enemies", this.descriptionStartX - 5, 70 + 768 / 2 - 260 + 125);

      //levels
      let armorLevel = this.shop.armorLevel;
      for (let i = 0; i < this.shop.itemLevels; i++) {
        ctx.beginPath();
        ctx.arc(this.bubblesStart - (86 - 14 * i), 330, 5, 0, 2 * Math.PI, false);
        if (armorLevel > 0) {
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = "cyan";
          ctx.fill();
          ctx.globalAlpha = 1;
          armorLevel--;
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
      }

      // POTION

      //item
      ctx.drawImage(this.items, 64, 0, 32, 32, this.itemStartX + 5, 70 + 768 / 2 - 323 + 125 * 2, 32 * 1.75, 32 * 1.75);
      var itemBoxPotion = new BoundingBox(this.itemStartX + 5, 70 + 768 / 2 - 323 + 125 * 2, 32 * 1.75, 32 * 1.75);
      if (mouseBox.collide(itemBoxPotion) && this.game.single_click) {
        // outline hovered item

        if (this.shop.skillPoints > 0) {
          this.shop.potionLevel++;
          this.game.knight.xpSystem.skillPoints--;
          console.log(this.shop.potionLevel);
        } else {
          console.log("NO SKILL POINTS AVAILABLE");
        }
        this.game.single_click = false;

        ctx.save();

        // ADD COUNT TO ITEM

        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";

        ctx.restore();
      }
      //text
      ctx.fillStyle = "red";
      ctx.fillText("Penelope's Potion", this.nameStartX, 70 + 768 / 2 - 325 + 125 * 2);
      ctx.fillStyle = "white";
      ctx.fillText("Regen 5% HP / sec", this.nameStartX - 4, 70 + 768 / 2 - 325 + 125 * 2.2);

      // levels
      let potionLevel = this.shop.potionLevel;
      for (let i = 0; i < this.shop.itemLevels; i++) {
        ctx.beginPath();
        ctx.arc(this.bubblesStart - (86 - 14 * i), 455, 5, 0, 2 * Math.PI, false);
        if (potionLevel > 0) {
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = "red";
          ctx.fill();
          ctx.globalAlpha = 1;
          potionLevel--;
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
      }

      // DAGGER

      // item

      ctx.drawImage(this.items, 96, 0, 32, 32, this.itemStartX + 5, 70 + 768 / 2 - 323 + 125 * 3, 32 * 2, 32 * 2);
      var itemBoxDagger = new BoundingBox(this.itemStartX + 5, 70 + 768 / 2 - 323 + 125 * 3, 32 * 2, 32 * 2);
      if (mouseBox.collide(itemBoxDagger) && this.game.single_click) {
        // outline hovered item

        if (this.shop.skillPoints > 0) {
          this.shop.daggerLevel++;
          this.game.knight.xpSystem.skillPoints--;
          console.log(this.shop.daggerLevel);
        } else {
          console.log("NO SKILL POINTS AVAILABLE");
        }
        this.game.single_click = false;

        ctx.save();

        // ADD COUNT TO ITEM

        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";

        ctx.restore();
      }
      // text
      ctx.fillStyle = "magenta";
      ctx.fillText("Arlo's Dagger", this.nameStartX, 70 + 768 / 2 - 325 + 125 * 3);
      ctx.fillStyle = "white";
      ctx.fillText("Make enemies bleed", this.nameStartX, 70 + 768 / 2 - 325 + 125 * 3.2);
      ctx.fillText("for 2% HP / sec", this.nameStartX, 70 + 768 / 2 - 325 + 125 * 3.3);

      // levels
      let daggerLevel = this.shop.daggerLevel;
      for (let i = 0; i < this.shop.itemLevels; i++) {
        ctx.beginPath();
        ctx.arc(this.bubblesStart - (86 - 14 * i), 580, 5, 0, 2 * Math.PI, false);
        if (daggerLevel > 0) {
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = "magenta";
          ctx.fill();
          ctx.globalAlpha = 1;
          daggerLevel--;
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
      }
    } else {
      // remove from world if associated shop isnt active
      this.removeFromWorld = true;
    }
  }
}
