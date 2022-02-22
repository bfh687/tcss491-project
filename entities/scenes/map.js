class Map {
  constructor(game, x, y, level) {
    Object.assign(this, { game, x, y, level });
    this.spritesheet = ASSET_MANAGER.getAsset(level.map.path);
    this.loadEntities();
    this.loadBoundingBoxes();
  }

  loadEntities() {
    const level = this.level;

    // load props
    level.props.forEach((prop) => {
      this.game.addEntity(new Prop(this.game, prop.x, prop.y, prop.type));
    });

    // load foilage
    level.foilage.forEach((foilage) => {
      this.game.addEntity(new Foilage(this.game, foilage.x, foilage.y, foilage.type));
    });

    // load signs
    level.signs.forEach((sign) => {
      this.game.addEntity(new Sign(this.game, sign.x, sign.y, sign.type, sign.dialogue));
    });

    // load shops
    level.shops.forEach((shop) => {
      this.game.addEntity(new Shop(this.game, shop.x, shop.y));
    });

    this.game.addEntity(new MobCluster(this.game, 800, 900, 5, "edsadas"));
  }

  loadBoundingBoxes() {
    const level = this.level;
    this.bounding_boxes = [];

    level.bounding_boxes.forEach((box) => {
      this.bounding_boxes.push(new BoundingBox(box.x, box.y, box.width, box.height));
    });
  }

  update() {}

  draw(ctx) {
    const width = this.level.map.width;
    const height = this.level.map.height;

    ctx.drawImage(this.spritesheet, 0, 0, width, height, this.x - this.game.camera.x, this.y - this.game.camera.y, width * 2, height * 2);
    if (params.DEBUG) {
      this.bounding_boxes.forEach((box) => {
        drawBoundingBox(box, ctx, this.game, "red");
      });
    }
  }
}
