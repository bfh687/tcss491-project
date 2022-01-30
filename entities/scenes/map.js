class Map {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/prototype_hub.png");
    this.bounding_boxes = [];

    this.icons = ASSET_MANAGER.getAsset("./sprites/hud/icons.png");
    this.test_box = new BoundingBox(this.x + 1135, this.y + 515, 100, 100);
    this.drawIcon = false;

    this.alpha = 0;
    this.color = "purple";
  }

  update() {
    if (this.drawIcon) {
      this.alpha = Math.min(1, this.alpha + this.game.clockTick * 6);
    } else {
      this.alpha = Math.max(0, this.alpha - this.game.clockTick * 6);
    }

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

    ctx.save();
    ctx.globalAlpha = this.alpha;
    if (this.drawIcon || this.alpha > 0) {
      ctx.drawImage(
        this.icons,
        112,
        32,
        16,
        16,
        this.test_box.left + (this.test_box.right - this.test_box.left) / 2 - this.game.camera.x - 16,
        this.y + 515 - this.game.camera.y + Math.sin(this.game.timer.gameTime * 2) * 7,
        32,
        32
      );
    }
    ctx.restore();

    if (params.DEBUG) {
      this.bounding_boxes.forEach((box) => {
        drawBoundingBox(box, ctx, this.game, "red");
      });
      drawBoundingBox(this.test_box, ctx, this.game, this.color);
    }
  }
}
