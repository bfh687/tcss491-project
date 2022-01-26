constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hub.png");
    this.bounding_boxes = [];
  }

  update() {
    this.bounding_boxes = [];

    // vertical walls
    this.bounding_boxes.push(new BoundingBox(62, 215, 8, 400));
    this.bounding_boxes.push(new BoundingBox(842, 215, 8, 400));
    this.bounding_boxes.push(new BoundingBox(590, 120, 8, 285));
    this.bounding_boxes.push(new BoundingBox(314, 120, 8, 285));
    this.bounding_boxes.push(new BoundingBox(411, 315, 8, 140));
    this.bounding_boxes.push(new BoundingBox(495, 315, 8, 140));

    // horizontal walls
    this.bounding_boxes.push(new BoundingBox(60, 602, 790, 8));
    this.bounding_boxes.push(new BoundingBox(314, 120, 287, 8));
    this.bounding_boxes.push(new BoundingBox(62, 218, 258, 8));
    this.bounding_boxes.push(new BoundingBox(590, 218, 258, 8));
    this.bounding_boxes.push(new BoundingBox(315, 315, 105, 8));
    this.bounding_boxes.push(new BoundingBox(495, 315, 105, 8));
    this.bounding_boxes.push(new BoundingBox(315, 400, 105, 8));
    this.bounding_boxes.push(new BoundingBox(495, 400, 105, 8));
  }

  draw(ctx) {
    ctx.drawImage(this.spritesheet, 0, 0, 18 * 32, 13 * 32, 0 - this.game.camera.x, 0 - this.game.camera.y, 18 * 32 * 1.5, 13 * 32 * 1.5);
    this.bounding_boxes.forEach((box) => {
      drawBoundingBox(box, ctx, this.game, "red");
    });
  }
}
