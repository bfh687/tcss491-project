class Shop {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAsset(sprites.shop);
    this.icons = ASSET_MANAGER.getAsset(sprites.icons);

    this.drawIcon = false;
    this.isShopActive = false;

    this.interaction_box = new BoundingBox(this.x + 48, this.y + 128, 96, 96);
    this.boundingBox = new BoundingBox(this.x + 59, this.y + 138, 73, 47);

    this.itemLevels = 4;

    this.alpha = 0;
    this.color = "red";
  }

  update() {
    const knight = this.game.knight;

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
    this.items = ASSET_MANAGER.getAsset(sprites.shop_items);

    this.itemStartX = 1366 / 2 - 256 - 24;
    this.containerStartX = 1366 / 2 - 94;
    this.nameStartX = 1366 / 2 - 256 + 48 + 24;
    this.descriptionStartX = 1366 / 2 - 25 + 10;
    this.shopHeight = 500;
    this.bubblesStart = 1366 / 2 + 72;
    this.skillPointsHeight = 100;

    this.menuHover = false;
    this.game.isShopActive = true;
    this.errorCooldown = 0.5;
  }

  update() {
    this.errorCooldown -= this.game.clockTick;
  }

  draw(ctx) {
    // refactor to draw shop item, where you pass sprite, x, y, item description, and item
    if (this.shop.isShopActive) {
      ctx.save();

      ctx.globalAlpha = 0.6;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 1400, 800);
      ctx.globalAlpha = 1;

      ctx.font = "30px bitpap";
      var width = ctx.measureText("SHOP").width / 2;

      ctx.fillStyle = "black";
      ctx.fillText("SHOP", 1366 / 2 - width + 1, 61);
      ctx.fillStyle = "white";
      ctx.fillText("SHOP", 1366 / 2 - width, 60);

      // box one
      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      ctx.strokeRect(1366 / 2 - 300, 100, 600, 110);
      ctx.fillStyle = "black";
      ctx.globalAlpha = 0.4;
      ctx.fillRect(1366 / 2 - 300, 100, 600, 110);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "white";
      ctx.font = "24px bitpap";

      var hoverFlag = false;
      var goggleHover = false;
      var armorHover = false;
      var potionHover = false;
      var daggerHover = false;

      var mouseBox = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);

      // item 1
      ctx.drawImage(this.items, 0, 0, 32, 32, this.itemStartX + 2, 70 + 768 / 2 - 330, 32 * 2, 32 * 2);
      var itemBoxGoggles = new BoundingBox(850, 530 - 130 * 3, 55, 30);
      if (mouseBox.collide(itemBoxGoggles) && this.game.knight.gogglesLevel + 1 < 5) {
        if (this.game.single_click) {
          if (this.game.knight.xp.skillPoints < this.game.knight.gogglesLevel + 1) {
            this.playErrorSound();
          } else {
            this.levelGoggles();
            this.playSelectSound();
          }
        }
        hoverFlag = true;
        goggleHover = true;
      }

      // description text
      ctx.font = "18px bitpap";
      ctx.fillStyle = "#ddd";
      ctx.fillText("Geronimo's Goggles", this.nameStartX, 70 + 768 / 2 - 304);
      ctx.fillStyle = "white";
      ctx.fillText("Deal 1.5x Damage!", this.nameStartX, 70 + 768 / 2 - 281);

      // container
      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      ctx.strokeRect(1366 / 2 - 300, 230, 600, 110);
      ctx.fillStyle = "black";
      ctx.globalAlpha = 0.4;
      ctx.fillRect(1366 / 2 - 300, 230, 600, 110);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "white";

      //
      ctx.fillText("Current Level:", this.nameStartX + 190, 70 + 768 / 2 - 325 + 125 * 3.2 + 13 - 130 * 3);
      let goggleLevel = this.game.knight.gogglesLevel;
      for (let i = 0; i < this.shop.itemLevels; i++) {
        ctx.beginPath();
        ctx.arc(this.bubblesStart + 40 - (86 - 14 * i), 556 - 130 * 3, 5, 0, 2 * Math.PI, false);
        if (goggleLevel > 0) {
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = "#ddd";
          ctx.fill();
          ctx.globalAlpha = 1;
          goggleLevel--;
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
      }

      //item 2
      ctx.drawImage(this.items, 32, 0, 32, 32, this.itemStartX + 5, 70 + 768 / 2 - 323 + 125, 32 * 1.75, 32 * 1.75);
      var itemBoxArmor = new BoundingBox(850, 530 - 130 * 2, 55, 30);
      if (mouseBox.collide(itemBoxArmor) && this.game.knight.armorLevel + 1 < 5) {
        if (this.game.single_click) {
          if (this.game.knight.xp.skillPoints < this.game.knight.armorLevel + 1) {
            this.playErrorSound();
          } else {
            this.levelArmor();
            this.playSelectSound();
          }
        }
        hoverFlag = true;
        armorHover = true;
      }

      //text
      ctx.fillStyle = "cyan";
      ctx.fillText("Rowan's Armor", this.nameStartX, 70 + 768 / 2 - 323 + 138);
      ctx.fillStyle = "white";
      ctx.fillText("Reflect 15% of damage", this.nameStartX, 70 + 768 / 2 - 300 + 138);
      ctx.fillText("taken to the attacker", this.nameStartX, 70 + 768 / 2 - 280 + 138);

      // item 3
      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      ctx.strokeRect(1366 / 2 - 300, 360, 600, 110);
      ctx.fillStyle = "black";
      ctx.globalAlpha = 0.4;
      ctx.fillRect(1366 / 2 - 300, 360, 600, 110);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "white";

      ctx.fillText("Current Level:", this.nameStartX + 190, 70 + 768 / 2 - 325 + 125 * 3.2 + 13 - 130 * 2);
      let armorLevel = this.game.knight.armorLevel;
      for (let i = 0; i < this.shop.itemLevels; i++) {
        ctx.beginPath();
        ctx.arc(this.bubblesStart + 40 - (86 - 14 * i), 556 - 130 * 2, 5, 0, 2 * Math.PI, false);
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

      ctx.drawImage(this.items, 64, 0, 32, 32, this.itemStartX + 5, 70 + 768 / 2 - 323 + 125 * 2 + 5, 32 * 1.75, 32 * 1.75);
      var itemBoxPotion = new BoundingBox(850, 530 - 130, 55, 30);
      if (mouseBox.collide(itemBoxPotion) && this.game.knight.potionLevel + 1 < 5) {
        if (this.game.single_click) {
          if (this.game.knight.xp.skillPoints < this.game.knight.potionLevel + 1) {
            this.playErrorSound();
          } else {
            this.levelPotion();
            this.playSelectSound();
          }
        }
        hoverFlag = true;
        potionHover = true;
      }

      ctx.fillStyle = "red";
      ctx.fillText("Penelope's Potion", this.nameStartX, 70 + 768 / 2 - 325 + 125 * 2 + 30);
      ctx.fillStyle = "white";
      ctx.fillText("Regen HP faster!", this.nameStartX, 70 + 768 / 2 - 325 + 125 * 2 + 20 + 25 + 7);

      ctx.fillText("Current Level:", this.nameStartX + 190, 70 + 768 / 2 - 325 + 125 * 3.2 + 13 - 130);
      let potionLevel = this.game.knight.potionLevel;
      for (let i = 0; i < this.shop.itemLevels; i++) {
        ctx.beginPath();
        ctx.arc(this.bubblesStart + 40 - (86 - 14 * i), 556 - 130, 5, 0, 2 * Math.PI, false);
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

      // item 4
      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      ctx.strokeRect(1366 / 2 - 300, 490, 600, 110);
      ctx.fillStyle = "black";
      ctx.globalAlpha = 0.4;
      ctx.fillRect(1366 / 2 - 300, 490, 600, 110);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "white";

      ctx.drawImage(this.items, 96, 0, 32, 32, this.itemStartX, 70 + 768 / 2 - 323 + 125 * 3 + 10, 32 * 2, 32 * 2);
      var itemBoxDagger = new BoundingBox(850, 530, 55, 30);
      if (mouseBox.collide(itemBoxDagger)) {
        if (this.game.single_click) {
          if (this.game.knight.xp.skillPoints < this.game.knight.daggerLevel + 1) {
            this.playErrorSound();
          } else {
            this.levelDagger();
            this.playSelectSound();
          }
        }
        hoverFlag = true;
        daggerHover = true;
      }

      if (hoverFlag && !this.menuHover) {
        this.playHoverSound();
        this.menuHover = true;
      }

      if (!hoverFlag) {
        this.menuHover = false;
      }

      // text
      ctx.fillStyle = "magenta";
      ctx.fillText("Arlo's Dagger", this.nameStartX, 70 + 768 / 2 - 325 + 125 * 3.2 - 23 + 22);
      ctx.fillStyle = "white";
      ctx.fillText("Make enemies bleed", this.nameStartX, 70 + 768 / 2 - 325 + 125 * 3.2 + 22);
      ctx.fillText("for 2% HP / sec", this.nameStartX, 70 + 768 / 2 - 325 + 125 * 3.2 + 20 + 22);

      ctx.fillText("Current Level:", this.nameStartX + 190, 70 + 768 / 2 - 325 + 125 * 3.2 + 13);
      let daggerLevel = this.game.knight.daggerLevel;
      for (let i = 0; i < this.shop.itemLevels; i++) {
        ctx.beginPath();
        ctx.arc(this.bubblesStart + 40 - (86 - 14 * i), 556, 5, 0, 2 * Math.PI, false);
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

      ctx.globalAlpha = 0.7;
      ctx.fillStyle = "gray";

      if (daggerHover) ctx.globalAlpha = 0.6;

      ctx.fillRect(850, 530, 55, 30);
      ctx.globalAlpha = 0.7;

      if (potionHover) ctx.globalAlpha = 0.6;

      ctx.fillRect(850, 530 - 130, 55, 30);
      ctx.globalAlpha = 0.7;

      if (armorHover) ctx.globalAlpha = 0.6;

      ctx.fillRect(850, 530 - 130 * 2, 55, 30);
      ctx.globalAlpha = 0.7;

      if (goggleHover) ctx.globalAlpha = 0.6;
      ctx.fillRect(850, 530 - 130 * 3, 55, 30);

      ctx.globalAlpha = 1;
      ctx.fillStyle = "white";

      // dagger skill point level
      var daggerText = this.game.knight.daggerLevel + 1 + " SP";
      if (this.game.knight.daggerLevel + 1 > 4) daggerText = "MAX";
      ctx.fillText(daggerText, 850 + 55 / 2 - ctx.measureText(daggerText).width / 2, 551);

      // potion level
      var potionText = this.game.knight.potionLevel + 1 + " SP";
      if (this.game.knight.potionLevel + 1 > 4) potionText = "MAX";
      ctx.fillText(potionText, 850 + 55 / 2 - ctx.measureText(potionText).width / 2, 551 - 130);

      // armor level
      var armorText = this.game.knight.armorLevel + 1 + " SP";
      if (this.game.knight.armorLevel + 1 > 4) armorText = "MAX";
      ctx.fillText(armorText, 850 + 55 / 2 - ctx.measureText(armorText).width / 2, 551 - 130 * 2);

      // goggles sp cost
      var gogglesText = this.game.knight.gogglesLevel + 1 + " SP";
      if (this.game.knight.gogglesLevel + 1 > 4) gogglesText = "MAX";
      ctx.fillText(gogglesText, 850 + 55 / 2 - ctx.measureText(gogglesText).width / 2, 551 - 130 * 3);

      ctx.restore();

      // // levels
    } else {
      // remove from world if associated shop isnt active
      this.game.isShopActive = false;
      this.removeFromWorld = true;
    }

    if (this.game.knight.state == 4) {
      this.removeFromWorld = true;
    }
  }

  playSelectSound() {
    ASSET_MANAGER.playAudio(sfx.menu_select);
  }

  playHoverSound() {
    ASSET_MANAGER.playAudio(sfx.menu_hover);
  }

  playErrorSound() {
    if (this.errorCooldown > 0) return;
    ASSET_MANAGER.playAudio(sfx.menu_error);
    this.errorCooldown = 0.5;
  }

  levelGoggles() {
    if (this.game.knight.xp.skillPoints > 0 && this.game.knight.gogglesLevel < this.shop.itemLevels) {
      if (this.game.knight.gogglesLevel == 0 && this.game.knight.xp.skillPoints >= 1) {
        this.game.knight.purchaseGoggles();
        this.game.knight.xp.skillPoints--;
      } else if (this.game.knight.gogglesLevel == 1 && this.game.knight.xp.skillPoints > 1) {
        this.game.knight.purchaseGoggles();
        this.game.knight.xp.skillPoints -= 2;
      } else if (this.game.knight.gogglesLevel == 2 && this.game.knight.xp.skillPoints > 2) {
        this.game.knight.purchaseGoggles();
        this.game.knight.xp.skillPoints -= 3;
      } else if (this.game.knight.gogglesLevel == 3 && this.game.knight.xp.skillPoints > 3) {
        this.game.knight.purchaseGoggles();
        this.game.knight.xp.skillPoints -= 4;
      } else {
        console.log("REACHED HERE");
      }
    } else if (this.game.knight.gogglesLevel == this.shop.itemLevels) {
      console.log("MAX LEVEL");
    } else {
      console.log("Not enough SP");
    }
    this.game.single_click = false;
    console.log("goggle level " + this.game.knight.gogglesLevel);
  }

  levelArmor() {
    if (this.game.knight.xp.skillPoints > 0 && this.game.knight.armorLevel < this.shop.itemLevels) {
      if (this.game.knight.armorLevel == 0 && this.game.knight.xp.skillPoints >= 1) {
        this.game.knight.purchaseArmor();
        this.game.knight.xp.skillPoints--;
      } else if (this.game.knight.armorLevel == 1 && this.game.knight.xp.skillPoints > 1) {
        this.game.knight.purchaseArmor();
        this.game.knight.xp.skillPoints -= 2;
      } else if (this.game.knight.armorLevel == 2 && this.game.knight.xp.skillPoints > 2) {
        this.game.knight.purchaseArmor();
        this.game.knight.xp.skillPoints -= 3;
      } else if (this.game.knight.armorLevel == 3 && this.game.knight.xp.skillPoints > 3) {
        this.game.knight.purchaseArmor();
        this.game.knight.xp.skillPoints -= 4;
      }
    } else if (this.game.knight.armorLevel == this.shop.itemLevels) {
      console.log("MAX LEVEL");
    } else {
      console.log("Not enough SP");
    }
    this.game.single_click = false;
  }

  levelPotion() {
    if (this.game.knight.xp.skillPoints > 0 && this.game.knight.potionLevel < this.shop.itemLevels) {
      if (this.game.knight.potionLevel == 0 && this.game.knight.xp.skillPoints >= 1) {
        this.game.knight.potionLevel++;
        this.game.knight.xp.skillPoints--;
      } else if (this.game.knight.potionLevel == 1 && this.game.knight.xp.skillPoints > 1) {
        this.game.knight.potionLevel++;
        this.game.knight.xp.skillPoints -= 2;
      } else if (this.game.knight.potionLevel == 2 && this.game.knight.xp.skillPoints > 2) {
        this.game.knight.potionLevel++;
        this.game.knight.xp.skillPoints -= 3;
      } else if (this.game.knight.potionLevel == 3 && this.game.knight.xp.skillPoints > 3) {
        this.game.knight.potionLevel++;
        this.game.knight.xp.skillPoints -= 4;
      }
    } else if (this.game.knight.potionLevel == this.shop.itemLevels) {
      console.log("MAX LEVEL");
    } else {
      console.log("Not enough SP");
    }
    this.game.single_click = false;
  }

  levelDagger() {
    if (this.game.knight.xp.skillPoints > 0 && this.game.knight.daggerLevel < this.shop.itemLevels) {
      if (this.game.knight.daggerLevel == 0 && this.game.knight.xp.skillPoints >= 1) {
        this.game.knight.daggerLevel++;
        this.game.knight.xp.skillPoints--;
      } else if (this.game.knight.daggerLevel == 1 && this.game.knight.xp.skillPoints > 1) {
        this.game.knight.daggerLevel++;
        this.game.knight.xp.skillPoints -= 2;
      } else if (this.game.knight.daggerLevel == 2 && this.game.knight.xp.skillPoints > 2) {
        this.game.knight.daggerLevel++;
        this.game.knight.xp.skillPoints -= 3;
      } else if (this.game.knight.daggerLevel == 3 && this.game.knight.xp.skillPoints > 3) {
        this.game.knight.daggerLevel++;
        this.game.knight.xp.skillPoints -= 4;
      }
    } else if (this.game.knight.daggerLevel == this.shop.itemLevels) {
      console.log("MAX LEVEL");
    } else {
      console.log("Not enough SP");
    }
    this.game.single_click = false;
  }
}
