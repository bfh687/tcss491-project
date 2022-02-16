class Map {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/bossroom.png");
    this.bounding_boxes = [];
  }

  update() {
    this.bounding_boxes = [];
  }

  draw(ctx) {
    ctx.drawImage(this.spritesheet, 0, 0, 800, 880, this.x - this.game.camera.x, this.y - this.game.camera.y, 800 * 2, 800 * 2);

    if (params.DEBUG) {
      this.bounding_boxes.forEach((box) => {
        drawBoundingBox(box, ctx, this.game, "red");
      });
    }
  }
}
