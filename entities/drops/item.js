class Item {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.items_spritesheet = ASSET_MANAGER.getAsset(sprites.drop_items);

    // load items and shuffle them
    this.items = [];
    this.uniques = [];
    this.loadItems();
    this.getUniques();
    this.randomizeItems();
    this.shuffleArray(this.items);

    // init bounding box
    this.updateBoundingBox();

    // select random item and animate text for item
    this.selectedItem = Math.floor(Math.random() * this.items.length);
    this.animateRarity(this.selectedItem);

    // total time item has been on the map
    this.elapsedTime = 0;

    // time item stays before being removed
    this.duration = 30;

    // remove from world
    this.removeFromWorld = false;

    // max pull distance
    this.pullDist = 100;
  }

  getUniques() {
    return this.uniques;
  }

  animateRarity(item) {
    let rarity = "";
    if (this.items[item].dropChance >= 15) {
      rarity = "COMMON";
    } else if (this.items[item].dropChance >= 5) {
      rarity = "RARE";
    } else {
      rarity = "MYTHIC";
    }

    let color = "";
    if (this.items[item].dropChance >= 15) {
      color = "white";
    } else if (this.items[item].dropChance >= 5) {
      color = "cyan";
    } else {
      color = "orange";
    }

    this.textAnimation = new TextAnimator(rarity, color, this.game, this);
  }

  getItem() {
    return this.items[this.selectedItem];
  }

  loadItems() {
    this.shatterproofSkull = {
      code: "Shatterproof Skull",
      x: 0,
      y: 0,
      dropChance: 2, // 2% chance
      desc: "Upon receiving damage that would kill you,\nbe restored to full health (60 sec. cooldown)",
    };
    this.uniques.push(this.shatterproofSkull);

    this.boneThickener = {
      code: "Bone Thickener",
      x: 32,
      y: 0,
      dropChance: 20, // 20% chance
      desc: "Increase HP by 25 per stack",
    };
    this.uniques.push(this.boneThickener);

    this.spareHeart = {
      code: "Spare Heart",
      x: 64,
      y: 0,
      dropChance: 10, // 10% chance
      desc: "Instantly Regen to Max Health",
    };
    this.uniques.push(this.spareHeart);

    this.wing = {
      code: "Wing",
      x: 160,
      y: 0,
      dropChance: 15, // 15% chance
      desc: "Gain 0.25% movement speed per stack",
    };
    this.uniques.push(this.wing);

    this.scale = {
      code: "Scale",
      x: 320,
      y: 0,
      dropChance: 20, // 20% chance
      desc: "Gain 1 armor (take 1% less damage on hit)",
    };
    this.uniques.push(this.scale);

    this.clover1 = {
      code: "Clover 1",
      x: 0,
      y: 32,
      dropChance: 23, // 23% chance
      desc: "Gain 5% critical hit chance",
    };
    this.uniques.push(this.clover1);

    this.clover2 = {
      code: "Clover 2",
      x: 32,
      y: 32,
      dropChance: 4, // 4% chance
      desc: "Gain 10% critical hit chance",
    };
    this.uniques.push(this.clover2);

    this.clover3 = {
      code: "Clover 3",
      x: 64,
      y: 32,
      dropChance: 2, // 2% chance
      desc: "Gain 15% critical hit chance",
    };
    this.uniques.push(this.clover3);

    this.clover4 = {
      code: "Clover 4",
      x: 96,
      y: 32,
      dropChance: 1, // 1% chance
      desc: "Gain 25% critical hit chance",
    };
    this.uniques.push(this.clover4);
  }

  randomizeItems() {
    // insert skulls
    for (let i = 0; i < this.shatterproofSkull.dropChance; i++) {
      this.items.push(this.shatterproofSkull);
    }

    // insert bones
    for (let i = 0; i < this.boneThickener.dropChance; i++) {
      this.items.push(this.boneThickener);
    }

    // insert hearts
    for (let i = 0; i < this.spareHeart.dropChance; i++) {
      this.items.push(this.spareHeart);
    }

    // insert wings
    for (let i = 0; i < this.wing.dropChance; i++) {
      this.items.push(this.wing);
    }

    // insert scales
    for (let i = 0; i < this.scale.dropChance; i++) {
      this.items.push(this.scale);
    }

    // insert clover 1
    for (let i = 0; i < this.clover1.dropChance; i++) {
      this.items.push(this.clover1);
    }

    // insert clover 2
    for (let i = 0; i < this.clover2.dropChance; i++) {
      this.items.push(this.clover2);
    }

    // insert clover 3
    for (let i = 0; i < this.clover3.dropChance; i++) {
      this.items.push(this.clover3);
    }

    // insert clover 4
    for (let i = 0; i < this.clover4.dropChance; i++) {
      this.items.push(this.clover4);
    }
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  update() {
    // increment time item has been on the map
    this.elapsedTime += this.game.clockTick;

    // despawn if past duration and not picked up
    if (this.elapsedTime >= this.duration) this.removeFromWorld = true;

    // calculate knight center
    var knight = this.game.knight;
    var knight_x = knight.hurtBox.left + Math.abs(knight.hurtBox.right - knight.hurtBox.left) / 2;
    var knight_y = knight.hurtBox.top + Math.abs(knight.hurtBox.top - knight.hurtBox.bottom) / 2;

    // center these values
    var dist = getDistance(knight_x, knight_y, this.x, this.y);

    // calculate vectors of attraction towards knight
    var xVector = 0;
    var yVector = 0;
    if (knight && dist < this.pullDist) {
      xVector = 20000 * ((knight_x - this.x) / (dist * dist));
      yVector = 20000 * ((knight_y - this.y) / (dist * dist));
    }

    this.x += xVector * this.game.clockTick;
    this.y += yVector * this.game.clockTick;
    this.updateBoundingBox();
  }

  updateBoundingBox() {
    this.boundingBox = new BoundingBox(this.x, this.y - 24, 32, 32);
  }

  draw(ctx) {
    var center_x = this.boundingBox.left + (this.boundingBox.right - this.boundingBox.left) / 2 - this.game.camera.x;
    var center_y = this.boundingBox.bottom - this.game.camera.y;

    // draw item shadow;
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.125;
    ctx.beginPath();
    ctx.arc(center_x, center_y, Math.sin(this.elapsedTime * 2) * 3 + 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    ctx.drawImage(
      this.items_spritesheet,
      this.items[this.selectedItem].x,
      this.items[this.selectedItem].y,
      32,
      32,
      this.x - this.game.camera.x,
      this.y - 24 + Math.sin(this.elapsedTime * 2) * 7 - this.game.camera.y,
      32,
      32
    );

    // draw bounding box of item
    if (params.DEBUG) {
      drawBoundingBox(this.boundingBox, ctx, this.game, "yellow");
    }

    // draw text animation for the item
    this.textAnimation.drawText(ctx);
  }
}
