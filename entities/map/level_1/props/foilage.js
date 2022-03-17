class Foilage {
  constructor(game, x, y, code) {
    Object.assign(this, { game, x, y, code });
    this.spritesheet = ASSET_MANAGER.getAsset(sprites.foilage);
    this.shadow_spritesheet = ASSET_MANAGER.getAsset(sprites.foilage_shadows);

    this.init(code);
  }

  update() {}

  draw(ctx) {
    // draw shadow
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.drawImage(
      this.shadow_spritesheet,
      this.sprite_x,
      this.sprite_y,
      this.sprite_width,
      this.sprite_height,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
      this.sprite_width * 2,
      this.sprite_height * 2
    );
    ctx.restore();

    // draw terrain
    ctx.drawImage(
      this.spritesheet,
      this.sprite_x,
      this.sprite_y,
      this.sprite_width,
      this.sprite_height,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
      this.sprite_width * 2,
      this.sprite_height * 2
    );

    // draw bounding boxes
    if (params.DEBUG) {
      drawBoundingBox(this.boundingBox, ctx, this.game, "red");
    }
  }

  init(code) {
    switch (code) {
      case "bigtree":
        this.sprite_x = 0;
        this.sprite_y = 0;
        this.sprite_width = 160;
        this.sprite_height = 160;
        this.boundingBox = new BoundingBox(this.x + 320 / 2 - 12.5, this.y + 280, 25, 25);
        break;
      case "medtree":
        this.sprite_x = 160;
        this.sprite_y = 0;
        this.sprite_width = 96;
        this.sprite_height = 160;
        this.boundingBox = new BoundingBox(this.x + 320 / 2 - 12.5 - 64, this.y + 280, 25, 25);
        break;
      case "smalltree":
        this.sprite_x = 288;
        this.sprite_y = 0;
        this.sprite_width = 96;
        this.sprite_height = 160;
        this.boundingBox = new BoundingBox(this.x + 320 / 2 - 12.5 - 64, this.y + 280, 25, 25);
        break;
      case "smallbush":
        this.sprite_x = 32;
        this.sprite_y = 192;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 9, this.y + 32, 48, 18);
        break;
      case "medbush":
        this.sprite_x = 96;
        this.sprite_y = 192;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 6, this.y + 24, 54, 32);
        break;
      default:
        console.log("invalid foilage code");
    }
  }
}
