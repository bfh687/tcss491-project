class Map {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/prototype_hud.png");
    this.bounding_boxes = [];
  }

  update() {
    this.bounding_boxes = [];

    // // vertical walls
    this.bounding_boxes.push(new BoundingBox(this.x + 645, this.y + 510, 14, 810));
    this.bounding_boxes.push(new BoundingBox(this.x + 1745, this.y + 510, 14, 810));

    // middle platform vertical wall
    this.bounding_boxes.push(new BoundingBox(this.x + 1391, this.y + 470, 14, 315));
    this.bounding_boxes.push(new BoundingBox(this.x + 960, this.y + 470, 14, 315));

    // middle platform vertical stairs
    this.bounding_boxes.push(new BoundingBox(this.x + 1120, this.y + 670, 14, 180));
    this.bounding_boxes.push(new BoundingBox(this.x + 1232, this.y + 670, 14, 180));

    // bottom left platform
    this.bounding_boxes.push(new BoundingBox(this.x + 1071, this.y + 960, 14, 230));

    // horizontal walls
    this.bounding_boxes.push(new BoundingBox(this.x + 645, this.y + 505, 315, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1405, this.y + 505, 355, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 645, this.y + 1297, 1100, 14));

    // middle platform horizontal walls
    this.bounding_boxes.push(new BoundingBox(this.x + 960, this.y + 470, 448, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 960, this.y + 665, 175, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1232, this.y + 665, 169, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 960, this.y + 775, 175, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1232, this.y + 775, 169, 14));

    // bottom left platform
    this.bounding_boxes.push(new BoundingBox(this.x + 645, this.y + 948, 440, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 645, this.y + 1183, 440, 14));
  }

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      0,
      0,
      1184,
      880,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
      params.BLOCKWIDTH * (24.66 * 2),
      params.BLOCKWIDTH * (18.1 * 2)
    );

    if (params.DEBUG) {
      this.bounding_boxes.forEach((box) => {
        drawBoundingBox(box, ctx, this.game, "red");
      });
    }
  }
}
