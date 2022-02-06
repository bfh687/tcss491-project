class Map {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/level_1.png");
    this.bounding_boxes = [];

    // add props... has to be a better way... .... .....

    // add pillars
    this.game.addEntity(new Prop(this.game, 19 * 32, 4 * 32, "pillar1"));
    this.game.addEntity(new Prop(this.game, 29 * 32, 6 * 32, "pillar2"));

    // add bushes
    this.game.addEntity(new Foilage(this.game, 27 * 32, 8 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 43 * 32, 18 * 32, "smallbush"));
    this.game.addEntity(new Foilage(this.game, 69 * 32, 20 * 32, "smallbush"));

    // add rocks
    this.game.addEntity(new Prop(this.game, 21 * 32, 8 * 32, "smallrock3"));
    this.game.addEntity(new Prop(this.game, 53 * 32, 16 * 32, "smallrock3"));
    this.game.addEntity(new Prop(this.game, 19 * 32, 12 * 32, "smallrock4"));
    this.game.addEntity(new Prop(this.game, 27 * 32, 10 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 11 * 32, 18 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 45 * 32, 18 * 32, "bigrock"));

    // add misc props
    this.game.addEntity(new Prop(this.game, 33 * 32, 8 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 35 * 32, 10 * 32, "box"));
    this.game.addEntity(new Prop(this.game, 55 * 32, 10 * 32, "box"));

    // add trees
    this.game.addEntity(new Foilage(this.game, 9 * 32, 8 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 33 * 32, 10 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 13 * 32, 14 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 45 * 32, 10 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 49 * 32, 6 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 61 * 32, 12 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 59 * 32, 8 * 32, "medtree"));
  }

  update() {
    this.bounding_boxes = [];
    this.bounding_boxes.push(new BoundingBox(this.x + 645, this.y + 510, 14, 810));
  }

  draw(ctx) {
    if (params.DEBUG) {
      ctx.drawImage(this.spritesheet, 0, 0, 3216, 1760, this.x - this.game.camera.x, this.y - this.game.camera.y, 3216 * 2, 1760 * 2);
      this.bounding_boxes.forEach((box) => {
        drawBoundingBox(box, ctx, this.game, "red");
      });
    }
  }
}
