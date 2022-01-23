class Item {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/items.png");

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

    this.speed = 200;

    this.pullDist = 500;
  }

  loadItems() {
    // load all items
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

    var knight_x =
      knight.hurtBox.left +
      Math.abs(knight.hurtBox.right - knight.hurtBox.left) / 2;
    var knight_y =
      knight.hurtBox.top +
      Math.abs(knight.hurtBox.top - knight.hurtBox.bottom) / 2;

    // center these values
    var dist = getDistance(knight_x, knight_y, this.x, this.y);

    var xVector = 0;
    var yVector = 0;
    if (knight && dist < this.pullDist) {
      xVector = (knight_x - this.x) / dist;
      yVector = (knight_y - this.y) / dist;
    }

    this.x += xVector * this.speed * this.game.clockTick;
    this.y += yVector * this.speed * this.game.clockTick;
    this.updateBoundingBox();
  }

  updateBoundingBox() {
    console.log("x: " + this.x + ", y: " + this.y);
    this.boundingBox = new BoundingBox(this.x - 16, this.y - 24, 32, 32);
  }

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      0,
      0,
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
