class Map {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/level_1.png");
    this.bounding_boxes = [];

    // add props... has to be a better way... .... .....

    this.game.addEntity(new Sign(this.game, 128, 128, "eastsign", ["sample text", "sample text 1", "sample text 2", "sample text 3"]));

    // add pillars
    this.game.addEntity(new Prop(this.game, 19 * 32, 4 * 32, "pillar1"));
    this.game.addEntity(new Prop(this.game, 21 * 32, 62 * 32, "pillar1"));
    this.game.addEntity(new Prop(this.game, 29 * 32, 6 * 32, "pillar2"));
    this.game.addEntity(new Prop(this.game, 37 * 32, 76 * 32, "pillar2"));

    // add bushes
    this.game.addEntity(new Foilage(this.game, 27 * 32, 8 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 15 * 32, 48 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 11 * 32, 66 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 43 * 32, 18 * 32, "smallbush"));
    this.game.addEntity(new Foilage(this.game, 69 * 32, 20 * 32, "smallbush"));

    // add rocks
    this.game.addEntity(new Prop(this.game, 9 * 32, 54 * 32, "smallrock1"));
    this.game.addEntity(new Prop(this.game, 15 * 32, 58 * 32, "smallrock6"));
    this.game.addEntity(new Prop(this.game, 21 * 32, 8 * 32, "smallrock3"));
    this.game.addEntity(new Prop(this.game, 53 * 32, 16 * 32, "smallrock3"));
    this.game.addEntity(new Prop(this.game, 49 * 32, 60 * 32, "smallrock1"));
    this.game.addEntity(new Prop(this.game, 15 * 32, 86 * 32, "smallrock1"));
    this.game.addEntity(new Prop(this.game, 19 * 32, 12 * 32, "smallrock4"));
    this.game.addEntity(new Prop(this.game, 17 * 32, 52 * 32, "smallrock4"));
    this.game.addEntity(new Prop(this.game, 11 * 32, 62 * 32, "smallrock3"));
    this.game.addEntity(new Prop(this.game, 23 * 32, 64 * 32, "smallrock6"));
    this.game.addEntity(new Prop(this.game, 47 * 32, 62 * 32, "smallrock6"));
    this.game.addEntity(new Prop(this.game, 37 * 32, 66 * 32, "smallrock3"));
    this.game.addEntity(new Prop(this.game, 49 * 32, 68 * 32, "smallrock4"));
    this.game.addEntity(new Prop(this.game, 35 * 32, 72 * 32, "smallrock3"));
    this.game.addEntity(new Prop(this.game, 55 * 32, 66 * 32, "smallrock5"));
    this.game.addEntity(new Prop(this.game, 21 * 32, 82 * 32, "smallrock6"));
    this.game.addEntity(new Prop(this.game, 21 * 32, 88 * 32, "smallrock4"));
    this.game.addEntity(new Prop(this.game, 27 * 32, 10 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 11 * 32, 54 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 17 * 32, 84 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 51 * 32, 62 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 11 * 32, 18 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 45 * 32, 18 * 32, "bigrock"));

    // add misc props
    this.game.addEntity(new Prop(this.game, 33 * 32, 8 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 15 * 32, 38 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 35 * 32, 66 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 45 * 32, 90 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 59 * 32, 64 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 17 * 32, 38 * 32, "vase1"));
    this.game.addEntity(new Prop(this.game, 15 * 32, 42 * 32, "vase2"));
    this.game.addEntity(new Prop(this.game, 35 * 32, 10 * 32, "box"));
    this.game.addEntity(new Prop(this.game, 55 * 32, 10 * 32, "box"));
    this.game.addEntity(new Prop(this.game, 23 * 32, 70 * 32, "box"));
    this.game.addEntity(new Prop(this.game, 35 * 32, 78 * 32, "box"));

    // add trees
    this.game.addEntity(new Foilage(this.game, 9 * 32, 8 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 43 * 32, 28 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 33 * 32, 10 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 13 * 32, 14 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 5 * 32, 56 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 45 * 32, 10 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 49 * 32, 6 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 61 * 32, 12 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 59 * 32, 8 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 21 * 32, 72 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 41 * 32, 44 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 49 * 32, 48 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 17 * 32, 66 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 39 * 32, 62 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 43 * 32, 34 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 35 * 32, 68 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 11 * 32, 38 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 19 * 32, 44 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 27 * 32, 32 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 37 * 32, 30 * 32, "medtree"));

    // x = (index + 1) * 2 - 1, y = index * 2
    this.game.addEntity(new Foilage(this.game, 23 * 32, 58 * 32, "bigtree"));

    // add shops
    this.game.addEntity(new Shop(this.game, 55 * 32, 10 * 32));

    // add enemies
    this.game.addEntity(new Skeleton(this.game, 400, 650));
    this.game.addEntity(new Skeleton(this.game, 350, 690));
    this.game.addEntity(new Skeleton(this.game, 290, 640));
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
