class Map {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hub.png");
    this.bounding_boxes = [];
  }

  update() {
    this.bounding_boxes = [];

    // vertical walls
    this.bounding_boxes.push(new BoundingBox(this.x + 62, this.y + 215, 8, 400));
    this.bounding_boxes.push(new BoundingBox(this.x + 842, this.y + 215, 8, 400));
    this.bounding_boxes.push(new BoundingBox(this.x + 590, this.y + 120, 8, 285));
    this.bounding_boxes.push(new BoundingBox(this.x + 314, this.y + 120, 8, 285));
    this.bounding_boxes.push(new BoundingBox(this.x + 411, this.y + 315, 8, 140));
    this.bounding_boxes.push(new BoundingBox(this.x + 495, this.y + 315, 8, 140));

    // horizontal walls
    this.bounding_boxes.push(new BoundingBox(this.x + 60, this.y + 602, 790, 8));
    this.bounding_boxes.push(new BoundingBox(this.x + 314, this.y + 120, 287, 8));
    this.bounding_boxes.push(new BoundingBox(this.x + 62, this.y + 218, 258, 8));
    this.bounding_boxes.push(new BoundingBox(this.x + 590, this.y + 218, 258, 8));
    this.bounding_boxes.push(new BoundingBox(this.x + 315, this.y + 315, 105, 8));
    this.bounding_boxes.push(new BoundingBox(this.x + 495, this.y + 315, 105, 8));
    this.bounding_boxes.push(new BoundingBox(this.x + 315, this.y + 400, 105, 8));
    this.bounding_boxes.push(new BoundingBox(this.x + 495, this.y + 400, 105, 8));
  }

  draw(ctx) {
    ctx.drawImage(this.spritesheet, 0, 0, 18 * 32, 13 * 32, this.x - this.game.camera.x, this.y - this.game.camera.y, 18 * 32 * 1.5, 13 * 32 * 1.5);
    if (params.DEBUG) {
      this.bounding_boxes.forEach((box) => {
        drawBoundingBox(box, ctx, this.game, "red");
      });
    }
  }
}
