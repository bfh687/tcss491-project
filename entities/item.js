class Item {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.items_spritesheet = ASSET_MANAGER.getAsset("./sprites/items.png");
    this.goggles_spritesheet = ASSET_MANAGER.getAsset("./sprites/geronimo's_goggles.png");

    this.items = [];
    this.loadItems();

    this.updateBoundingBox();

    // select random item
    this.selectedItem = Math.floor(Math.random() * this.items.length);

    // total time item has been on the map
    this.elapsedTime = 0;

    // time item stays before being removed
    this.duration = 30;

    // remove from world
    this.removeFromWorld = false;

    // max pull distance
    this.pullDist = 100;

    // Items in items.png
    this.shatterproofSkull = {
      code: "Shatterproof Skull",
      coords: [0, 0],
      dropChance: 20, // 5% chance
    };

    this.boneThickener = {
      code: "Bone Thickener",
      coords: [32, 0],
      dropChance: 5, // 20% chance
    };

    this.spareHeart = {
      code: "Spare Heart",
      coords: [64, 0],
      dropChance: 10, // 10% chance
    };

    this.wing = {
      code: "Wing",
      coords: [96, 0],
      dropChance: 10, // 10% chance
    };

    this.scale = {
      code: "Scale",
      coords: [128, 0],
      dropChance: 10, // 10% chance
    };

    this.clover1 = {
      code: "Clover 1",
      coords: [0, 32],
      dropChance: 5, // 20% chance
    };

    this.clover2 = {
      code: "Clover 2",
      coords: [32, 32],
      dropChance: 25, // 4% chance
    };

    this.clover3 = {
      code: "Clover 3",
      coords: [64, 32],
      dropChance: 50, // 2% chance
    };

    this.clover4 = {
      code: "Clover 4",
      coords: [96, 32],
      dropChance: 100, // 1% chance
    };

    // Item from Geronimos Goggles
    this.goggles = {
      code: "Goggles",
      coords: [0, 0],
      dropChance: 15, // 6.67% chance
    };
  }

  loadItems() {}

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
    this.updateBoundingBox();
  }

  updateBoundingBox() {
    this.boundingBox = new BoundingBox(this.x - 16, this.y - 24, 32, 32);
  }

  draw(ctx) {
    ctx.drawImage(
      this.items_spritesheet,
      this.clover1.Coords[0],
      this.clover1.Coords[1],
      32,
      32,
      this.x - 16,
      this.y - 24 + Math.sin(this.elapsedTime * 2) * 10,
      32,
      32
    );
    drawBoundingBox(this.boundingBox, ctx, "yellow");
  }
}
