class Item {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.items_spritesheet = ASSET_MANAGER.getAsset("./sprites/items.png");
    this.goggles_spritesheet = ASSET_MANAGER.getAsset("./sprites/geronimo's_goggles.png");
    this.textAnimations = [];
    this.items = [];

    this.priority =
      // Items in items.png
      this.shatterproofSkull = {
        code: "Shatterproof Skull",
        x: 0,
        y: 0,
        dropChance: 5, // 5% chance
      };

    this.boneThickener = {
      code: "Bone Thickener",
      x: 32,
      y: 0,
      dropChance: 20, // 20% chance
    };

    this.spareHeart = {
      code: "Spare Heart",
      x: 64,
      y: 0,
      dropChance: 10, // 10% chance
    };

    this.wing = {
      code: "Wing",
      x: 160,
      y: 0,
      dropChance: 15, // 15% chance
    };

    this.scale = {
      code: "Scale",
      x: 320,
      y: 0,
      dropChance: 20, // 20% chance
    };

    this.clover1 = {
      code: "Clover 1",
      x: 0,
      y: 32,
      dropChance: 23, // 23% chance
    };

    this.clover2 = {
      code: "Clover 2",
      x: 32,
      y: 32,
      dropChance: 4, // 4% chance
    };

    this.clover3 = {
      code: "Clover 3",
      x: 64,
      y: 32,
      dropChance: 2, // 2% chance
    };

    this.clover4 = {
      code: "Clover 4",
      x: 96,
      y: 32,
      dropChance: 1, // 1% chance
    };

    // Item from Geronimos Goggles
    // this.goggles = {
    //   code: "Goggles",
    //   coords: [0, 0],
    //   dropChance: 15, // 6.67% chance
    // };
    this.loadItems();

    this.updateBoundingBox();

    // select random item
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

  animateRarity(item) {
    console.log(this.items[item]);
    let string = "";
    if (this.items[item].dropChance >= 15) {
      string = "COMMON";
    } else if (this.items[item].dropChance >= 5) {
      string = "RARE";
    } else {
      string = "MYTHIC";
    }
    const animator = new TextAnimator(this.x, this.y - 32, string, 100, this.game, this);
    if (this.items[item].dropChance >= 15) {
      animator.critColor("white");
    } else if (this.items[item].dropChance >= 5) {
      animator.critColor("cyan");
    } else {
      animator.critColor("orange");
    }
    this.textAnimations.push(animator);
  }

  getItem() {
    return this.items[this.selectedItem];
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

  loadItems() {
    this.randomizeItems();
    this.shuffleArray(this.items);
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  update() {
    this.elapsedTime += this.game.clockTick;
    // despawn if past duration and not picked up
    if (this.elapsedTime >= this.duration) this.removeFromWorld = true;

    // add knight to scene manager at some point
    var knight;
    for (var i = 0; i < this.game.entities.length; i++) {
      if (this.game.entities[i] instanceof Knight) {
        knight = this.game.entities[i];
        break;
      }
    }

    var knight_x = knight.hurtBox.left + Math.abs(knight.hurtBox.right - knight.hurtBox.left) / 2;
    var knight_y = knight.hurtBox.top + Math.abs(knight.hurtBox.top - knight.hurtBox.bottom) / 2;

    // center these values
    var dist = getDistance(knight_x, knight_y, this.x, this.y);

    var xVector = 0;
    var yVector = 0;
    if (knight && dist < this.pullDist) {
      xVector = 20000 * ((knight_x - this.x) / (dist * dist));
      yVector = 20000 * ((knight_y - this.y) / (dist * dist));
    }

    this.x += xVector * this.game.clockTick;
    this.y += yVector * this.game.clockTick;
    //this.checkCollisions();
    this.updateBoundingBox();
  }

  checkCollisions() {
    this.game.entities.forEach((entity) => {});
  }

  updateBoundingBox() {
    this.boundingBox = new BoundingBox(this.x - 16, this.y - 24, 32, 32);
  }

  draw(ctx) {
    ctx.drawImage(
      this.items_spritesheet,
      this.items[this.selectedItem].x,
      this.items[this.selectedItem].y,
      32,
      32,
      this.x - 16 - this.game.camera.x,
      this.y - 24 + Math.sin(this.elapsedTime * 2) * 10 - this.game.camera.y,
      32,
      32
    );
    if (params.DEBUG) {
      drawBoundingBox(this.boundingBox, ctx, this.game, "yellow");
    }

    for (var i = 0; i < this.textAnimations.length; i++) {
      if (!this.textAnimations[i].isDone()) {
        this.textAnimations[i].drawText(this.game.clockTick, ctx);
      }
    }
  }
}
