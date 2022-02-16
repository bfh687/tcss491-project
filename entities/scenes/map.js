class Map {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/level_1.png");

    this.loadEntities();
    this.loadBoundingBoxes();
  }

  loadEntities() {
    // add props... has to be a better way... .... .....
    this.game.addEntity(new Sign(this.game, 32 * 29, 32 * 20, "eastsign", ["Shop to the east..."]));
    this.game.addEntity(
      new Sign(this.game, 32 * 91, 32 * 16, "slab2", [
        "This land was once occupied by humans and what they called pets...",
        "but as they all passed, all that remained was a shell of what once was...",
        "cursed to roam the land for eternity...",
      ])
    );
    this.game.addEntity(
      new Sign(this.game, 32 * 103, 32 * 12, "slab3", [
        "Neighboring towns were no longer safe...",
        "and so they prayed that a hero would come to cleanse what was left...",
      ])
    );
    this.game.addEntity(new Sign(this.game, 32 * 109, 32 * 18, "slab1", ["That hero never came...", "and they may never, but still they hoped..."]));
    this.game.addEntity(new Sign(this.game, 32 * 177, 32 * 28, "slab1", ["Here lies the graves of those who have failed to pass..."]));

    this.game.addEntity(new Sign(this.game, 32 * 71, 32 * 86, "eastsign", ["This way..."]));
    this.game.addEntity(new Sign(this.game, 32 * 77, 32 * 86, "westsign", ["This way..."]));

    this.game.addEntity(new Sign(this.game, 32 * 163, 32 * 30, "slab2", ["Boss ahead...", "Are you sure you're ready?"]));
    this.game.addEntity(new Sign(this.game, 32 * 173, 32 * 26, "slab2", ["One last chance to turn back..."]));
    this.game.addEntity(
      new Sign(this.game, 32 * 167, 32 * 24, "slab3", [
        "For thousands of years challengers have faced the Minotaur...",
        "For thousands of years the Minotaur has gone undefeated...",
      ])
    );

    // // add pillars
    this.game.addEntity(new Prop(this.game, 19 * 32, 4 * 32, "pillar1"));
    this.game.addEntity(new Prop(this.game, 163 * 32, 16 * 32, "pillar1"));

    this.game.addEntity(new Prop(this.game, 161 * 32, 38 * 32, "pillar1"));

    this.game.addEntity(new Prop(this.game, 97 * 32, 36 * 32, "pillar1"));
    this.game.addEntity(new Prop(this.game, 111 * 32, 42 * 32, "pillar1"));

    this.game.addEntity(new Prop(this.game, 21 * 32, 62 * 32, "pillar1"));
    this.game.addEntity(new Prop(this.game, 29 * 32, 6 * 32, "pillar2"));
    this.game.addEntity(new Prop(this.game, 99 * 32, 46 * 32, "pillar2"));
    this.game.addEntity(new Prop(this.game, 175 * 32, 46 * 32, "pillar2"));
    this.game.addEntity(new Prop(this.game, 177 * 32, 18 * 32, "pillar2"));

    this.game.addEntity(new Prop(this.game, 111 * 32, 36 * 32, "pillar2"));

    this.game.addEntity(new Prop(this.game, 37 * 32, 76 * 32, "pillar2"));

    // add bushes
    this.game.addEntity(new Foilage(this.game, 27 * 32, 8 * 32, "medbush"));

    this.game.addEntity(new Foilage(this.game, 175 * 32, 20 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 177 * 32, 10 * 32, "medbush"));

    this.game.addEntity(new Foilage(this.game, 173 * 32, 12 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 165 * 32, 8 * 32, "medbush"));

    this.game.addEntity(new Foilage(this.game, 127 * 32, 66 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 137 * 32, 64 * 32, "medbush"));

    this.game.addEntity(new Foilage(this.game, 93 * 32, 66 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 97 * 32, 68 * 32, "smallbush"));

    this.game.addEntity(new Foilage(this.game, 15 * 32, 48 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 11 * 32, 66 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 77 * 32, 94 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 191 * 32, 50 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 149 * 32, 82 * 32, "medbush"));
    this.game.addEntity(new Foilage(this.game, 145 * 32, 76 * 32, "medbush"));

    this.game.addEntity(new Foilage(this.game, 43 * 32, 18 * 32, "smallbush"));
    this.game.addEntity(new Foilage(this.game, 69 * 32, 20 * 32, "smallbush"));
    this.game.addEntity(new Foilage(this.game, 93 * 32, 46 * 32, "smallbush"));

    // add rocks
    this.game.addEntity(new Prop(this.game, 9 * 32, 54 * 32, "smallrock1"));
    this.game.addEntity(new Prop(this.game, 15 * 32, 58 * 32, "smallrock6"));
    this.game.addEntity(new Prop(this.game, 139 * 32, 80 * 32, "smallrock6"));

    this.game.addEntity(new Prop(this.game, 121 * 32, 50 * 32, "smallrock5"));
    this.game.addEntity(new Prop(this.game, 115 * 32, 44 * 32, "smallrock3"));

    // here
    this.game.addEntity(new Prop(this.game, 167 * 32, 6 * 32, "smallrock6"));
    this.game.addEntity(new Prop(this.game, 167 * 32, 10 * 32, "smallrock5"));
    this.game.addEntity(new Prop(this.game, 163 * 32, 12 * 32, "smallrock3"));

    this.game.addEntity(new Prop(this.game, 21 * 32, 8 * 32, "smallrock3"));
    this.game.addEntity(new Prop(this.game, 109 * 32, 70 * 32, "smallrock3"));

    this.game.addEntity(new Prop(this.game, 53 * 32, 16 * 32, "smallrock3"));
    this.game.addEntity(new Prop(this.game, 49 * 32, 60 * 32, "smallrock1"));
    this.game.addEntity(new Prop(this.game, 15 * 32, 86 * 32, "smallrock1"));
    this.game.addEntity(new Prop(this.game, 19 * 32, 12 * 32, "smallrock4"));
    this.game.addEntity(new Prop(this.game, 63 * 32, 24 * 32, "smallrock4"));

    this.game.addEntity(new Prop(this.game, 17 * 32, 52 * 32, "smallrock4"));
    this.game.addEntity(new Prop(this.game, 11 * 32, 62 * 32, "smallrock3"));
    this.game.addEntity(new Prop(this.game, 23 * 32, 64 * 32, "smallrock6"));
    this.game.addEntity(new Prop(this.game, 47 * 32, 62 * 32, "smallrock6"));
    this.game.addEntity(new Prop(this.game, 37 * 32, 66 * 32, "smallrock3"));
    this.game.addEntity(new Prop(this.game, 49 * 32, 68 * 32, "smallrock4"));
    this.game.addEntity(new Prop(this.game, 35 * 32, 72 * 32, "smallrock3"));
    this.game.addEntity(new Prop(this.game, 185 * 32, 58 * 32, "smallrock3"));

    this.game.addEntity(new Prop(this.game, 55 * 32, 66 * 32, "smallrock5"));
    this.game.addEntity(new Prop(this.game, 91 * 32, 94 * 32, "smallrock5"));
    this.game.addEntity(new Prop(this.game, 191 * 32, 60 * 32, "smallrock5"));

    this.game.addEntity(new Prop(this.game, 21 * 32, 82 * 32, "smallrock6"));
    this.game.addEntity(new Prop(this.game, 75 * 32, 56 * 32, "smallrock6"));
    this.game.addEntity(new Prop(this.game, 187 * 32, 64 * 32, "smallrock6"));

    this.game.addEntity(new Prop(this.game, 21 * 32, 88 * 32, "smallrock4"));
    this.game.addEntity(new Prop(this.game, 97 * 32, 82 * 32, "smallrock4"));

    this.game.addEntity(new Prop(this.game, 109 * 32, 80 * 32, "smallrock2"));

    this.game.addEntity(new Prop(this.game, 27 * 32, 10 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 103 * 32, 66 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 135 * 32, 60 * 32, "bigrock"));

    this.game.addEntity(new Prop(this.game, 11 * 32, 54 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 17 * 32, 84 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 51 * 32, 62 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 11 * 32, 18 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 119 * 32, 44 * 32, "bigrock"));

    this.game.addEntity(new Prop(this.game, 103 * 32, 84 * 32, "bigrock"));

    this.game.addEntity(new Prop(this.game, 79 * 32, 58 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 45 * 32, 18 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 79 * 32, 94 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 91 * 32, 86 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 155 * 32, 76 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 147 * 32, 76 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 189 * 32, 62 * 32, "bigrock"));
    this.game.addEntity(new Prop(this.game, 173 * 32, 8 * 32, "bigrock"));

    this.game.addEntity(new Prop(this.game, 67 * 32, 78 * 32, "bigrock"));

    // add misc props
    this.game.addEntity(new Prop(this.game, 33 * 32, 8 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 127 * 32, 60 * 32, "barrel"));

    this.game.addEntity(new Prop(this.game, 15 * 32, 38 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 57 * 32, 82 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 57 * 32, 74 * 32, "barrel"));

    this.game.addEntity(new Prop(this.game, 161 * 32, 66 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 177 * 32, 64 * 32, "barrel"));

    this.game.addEntity(new Prop(this.game, 63 * 32, 70 * 32, "barrel"));

    this.game.addEntity(new Prop(this.game, 65 * 32, 84 * 32, "barrel"));

    this.game.addEntity(new Prop(this.game, 35 * 32, 66 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 45 * 32, 90 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 59 * 32, 64 * 32, "barrel"));
    this.game.addEntity(new Prop(this.game, 17 * 32, 38 * 32, "vase1"));
    this.game.addEntity(new Prop(this.game, 67 * 32, 86 * 32, "vase2"));
    this.game.addEntity(new Prop(this.game, 81 * 32, 86 * 32, "vase2"));

    this.game.addEntity(new Prop(this.game, 15 * 32, 42 * 32, "vase2"));
    this.game.addEntity(new Prop(this.game, 181 * 32, 68 * 32, "vase2"));

    this.game.addEntity(new Prop(this.game, 35 * 32, 10 * 32, "box"));
    this.game.addEntity(new Prop(this.game, 121 * 32, 60 * 32, "box"));

    this.game.addEntity(new Prop(this.game, 55 * 32, 10 * 32, "box"));
    this.game.addEntity(new Prop(this.game, 83 * 32, 84 * 32, "box"));

    this.game.addEntity(new Prop(this.game, 23 * 32, 70 * 32, "box"));
    this.game.addEntity(new Prop(this.game, 35 * 32, 78 * 32, "box"));

    // add trees
    this.game.addEntity(new Foilage(this.game, 9 * 32, 8 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 143 * 32, 42 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 131 * 32, 40 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 145 * 32, 22 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 151 * 32, 18 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 159 * 32, 20 * 32, "bigtree"));

    this.game.addEntity(new Foilage(this.game, 189 * 32, 50 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 81 * 32, 14 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 95 * 32, 12 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 113 * 32, 20 * 32, "bigtree"));

    this.game.addEntity(new Foilage(this.game, 43 * 32, 28 * 32, "bigtree"));

    this.game.addEntity(new Foilage(this.game, 185 * 32, 28 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 181 * 32, 18 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 181 * 32, 22 * 32, "medtree"));

    this.game.addEntity(new Foilage(this.game, 33 * 32, 10 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 13 * 32, 14 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 5 * 32, 56 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 45 * 32, 10 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 49 * 32, 6 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 117 * 32, 76 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 163 * 32, 90 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 167 * 32, 90 * 32, "bigtree"));

    this.game.addEntity(new Foilage(this.game, 61 * 32, 12 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 59 * 32, 30 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 175 * 32, 86 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 177 * 32, 80 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 173 * 32, 82 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 153 * 32, 68 * 32, "bigtree"));

    this.game.addEntity(new Foilage(this.game, 57 * 32, 36 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 59 * 32, 44 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 187 * 32, 40 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 121 * 32, 56 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 139 * 32, 58 * 32, "bigtree"));

    this.game.addEntity(new Prop(this.game, 69 * 32, 50 * 32, "grave"));
    this.game.addEntity(new Prop(this.game, 73 * 32, 52 * 32, "grave"));

    this.game.addEntity(new Prop(this.game, 125 * 32, 66 * 32, "tombstone1"));
    this.game.addEntity(new Prop(this.game, 139 * 32, 64 * 32, "tombstone3"));

    this.game.addEntity(new Prop(this.game, 79 * 32, 62 * 32, "tombstone2"));
    this.game.addEntity(new Prop(this.game, 191 * 32, 36 * 32, "tombstone2"));

    this.game.addEntity(new Prop(this.game, 109 * 32, 64 * 32, "tombstone2"));
    this.game.addEntity(new Prop(this.game, 181 * 32, 30 * 32, "tombstone2"));

    this.game.addEntity(new Prop(this.game, 153 * 32, 26 * 32, "tombstone2"));
    this.game.addEntity(new Prop(this.game, 159 * 32, 28 * 32, "tombstone2"));

    this.game.addEntity(new Prop(this.game, 87 * 32, 66 * 32, "tombstone2"));
    this.game.addEntity(new Prop(this.game, 95 * 32, 64 * 32, "tombstone2"));
    this.game.addEntity(new Prop(this.game, 101 * 32, 68 * 32, "tombstone2"));

    this.game.addEntity(new Foilage(this.game, 59 * 32, 8 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 177 * 32, 12 * 32, "medtree"));

    this.game.addEntity(new Foilage(this.game, 119 * 32, 52 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 121 * 32, 60 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 137 * 32, 54 * 32, "medtree"));

    this.game.addEntity(new Foilage(this.game, 21 * 32, 72 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 173 * 32, 88 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 179 * 32, 54 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 193 * 32, 44 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 93 * 32, 10 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 111 * 32, 16 * 32, "medtree"));

    //here
    this.game.addEntity(new Foilage(this.game, 137 * 32, 44 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 139 * 32, 36 * 32, "medtree"));

    this.game.addEntity(new Foilage(this.game, 79 * 32, 38 * 32, "medtree"));

    this.game.addEntity(new Foilage(this.game, 41 * 32, 44 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 151 * 32, 72 * 32, "medtree"));

    this.game.addEntity(new Foilage(this.game, 133 * 32, 74 * 32, "medtree"));

    this.game.addEntity(new Foilage(this.game, 49 * 32, 48 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 107 * 32, 88 * 32, "medtree"));

    this.game.addEntity(new Foilage(this.game, 79 * 32, 86 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 87 * 32, 86 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 143 * 32, 20 * 32, "medtree"));

    this.game.addEntity(new Foilage(this.game, 17 * 32, 66 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 141 * 32, 24 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 177 * 32, 4 * 32, "smalltree"));

    this.game.addEntity(new Foilage(this.game, 159 * 32, 14 * 32, "smalltree"));

    this.game.addEntity(new Foilage(this.game, 109 * 32, 80 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 171 * 32, 84 * 32, "smalltree"));

    this.game.addEntity(new Foilage(this.game, 83 * 32, 84 * 32, "smalltree"));

    this.game.addEntity(new Foilage(this.game, 39 * 32, 62 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 91 * 32, 84 * 32, "smalltree"));

    this.game.addEntity(new Foilage(this.game, 43 * 32, 34 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 35 * 32, 68 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 11 * 32, 38 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 19 * 32, 44 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 27 * 32, 32 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 37 * 32, 30 * 32, "medtree"));

    // x = (index * 2) + 1, y = index * 2
    this.game.addEntity(new Foilage(this.game, 23 * 32, 58 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 55 * 32, 68 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 57 * 32, 72 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 79 * 32, 34 * 32, "bigtree"));

    this.game.addEntity(new Foilage(this.game, 79 * 32, 52 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 87 * 32, 58 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 91 * 32, 56 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 95 * 32, 60 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 101 * 32, 58 * 32, "bigtree"));

    this.game.addEntity(new Foilage(this.game, 81 * 32, 90 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 159 * 32, 2 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 173 * 32, 0 * 32, "bigtree"));

    this.game.addEntity(new Foilage(this.game, 83 * 32, 80 * 32, "bigtree"));
    this.game.addEntity(new Foilage(this.game, 99 * 32, 26 * 32, "bigtree"));

    this.game.addEntity(new Foilage(this.game, 81 * 32, 58 * 32, "smalltree"));
    this.game.addEntity(new Foilage(this.game, 85 * 32, 36 * 32, "smalltree"));

    this.game.addEntity(new Foilage(this.game, 63 * 32, 70 * 32, "smalltree"));

    this.game.addEntity(new Foilage(this.game, 85 * 32, 56 * 32, "medtree"));
    this.game.addEntity(new Foilage(this.game, 53 * 32, 76 * 32, "medtree"));

    // add shops
    this.game.addEntity(new Shop(this.game, 55 * 32, 10 * 32));
    this.game.addEntity(new Shop(this.game, 129 * 32, 56 * 32));

    //add enemies
    this.game.addEntity(new Skeleton(this.game, 400, 650));
    this.game.addEntity(new Skeleton(this.game, 350, 690));
    this.game.addEntity(new Skeleton(this.game, 290, 640));

    this.game.addEntity(new Skeleton(this.game, 400 + 200, 650 + 700));
    this.game.addEntity(new Skeleton(this.game, 350 + 200, 690 + 700));
    this.game.addEntity(new Skeleton(this.game, 290 + 200, 640 + 700));

    this.game.addEntity(new Skeleton(this.game, 400 + 1330, 650 + 1480));
    this.game.addEntity(new Skeleton(this.game, 350 + 1330, 690 + 1480));
    this.game.addEntity(new Skeleton(this.game, 290 + 1330, 640 + 1480));
  }

  // load via json probably
  loadBoundingBoxes() {
    this.bounding_boxes = [];

    this.bounding_boxes.push(new BoundingBox(this.x + 544, this.y + 193, 14, 7 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1042, this.y + 193, 14, 7 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 736, this.y + 192 + 256 + 32 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 736 + 116, this.y + 192 + 256 + 32 * 2, 14, 3 * 64));

    this.bounding_boxes.push(new BoundingBox(this.x + 544, this.y + 193, 8 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 544, this.y + 512, 3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 544, this.y + 512 + 115, 3 * 64, 14));

    this.bounding_boxes.push(new BoundingBox(this.x + 544 + 5 * 64, this.y + 512, 3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 544 + 5 * 64, this.y + 512 + 115, 3 * 64, 14));

    this.bounding_boxes.push(new BoundingBox(this.x + 544 - 4 * 64, this.y + 512, 14, 11 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 544 - 3 * 64, this.y + 512 - 3 * 64, 14, 3 * 64));

    // Alex Bounding Boxes
    // Vertical Platform
    this.bounding_boxes.push(new BoundingBox(this.x + 1170, this.y + 512 - 3 * 64, 14, 2.5 * 64));

    this.bounding_boxes.push(new BoundingBox(this.x + 1232, this.y + 477, 14, 1.8 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1377, this.y + 515, 14, 1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1559, this.y + 396, 14, 2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2066, this.y + 396, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2194, this.y + 569, 14, 1.3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1424 * 2, this.y + 225 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1705 * 2, this.y + 225 * 2, 14, 2.15 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1833 * 2, this.y + 288 * 2, 14, 3.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1929 * 2, this.y + 384 * 2, 14, 2.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1993 * 2, this.y + 450 * 2, 14, 1.15 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2121 * 2, this.y + 480 * 2, 14, 1.15 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2225 * 2, this.y + 450 * 2, 14, 2.11 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2310 * 2, this.y + 405 * 2, 14, 1.57 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2416 * 2, this.y + 350 * 2, 14, 1.9 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2481 * 2, this.y + 257 * 2, 14, 3.1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2512 * 2, this.y + 192 * 2, 14, 2.15 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2545 * 2, this.y + 128 * 2, 14, 9.9 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2577 * 2, this.y + 96 * 2, 14, 5.9 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2888 * 2, this.y + 96 * 2, 14, 5.9 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2704 * 2, this.y + 225 * 2, 14, 2.95 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2761 * 2, this.y + 225 * 2, 14, 2.95 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2921 * 2, this.y + 128 * 2, 14, 9.9 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2704 * 2, this.y + 385 * 2, 14, 2.95 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2761 * 2, this.y + 385 * 2, 14, 2.95 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2952 * 2, this.y + 192 * 2, 14, 6.5 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2985 * 2, this.y + 396 * 2, 14, 2.8 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 3048 * 2, this.y + 481 * 2, 14, 3.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 3080 * 2, this.y + 577 * 2, 14, 2.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 3113 * 2, this.y + 641 * 2, 14, 4.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 3144 * 2, this.y + 772 * 2, 14, 5 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 3113 * 2, this.y + 929 * 2, 14, 6.8 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2960 * 2, this.y + 1025 * 2, 14, 3.92 * 64));

    this.bounding_boxes.push(new BoundingBox(this.x + 2985 * 2, this.y + 1150 * 2, 14, 4.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2952 * 2, this.y + 1283 * 2, 14, 5 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2888 * 2, this.y + 1440 * 2, 14, 4.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2792 * 2, this.y + 1568 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1937 * 2, this.y + 1568 * 2, 14, 1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1712 * 2, this.y + 1503 * 2, 14, 2.1 * 64));

    this.bounding_boxes.push(new BoundingBox(this.x + 1769 * 2, this.y + 1281 * 2, 14, 1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1737 * 2, this.y + 1313 * 2, 14, 5.85 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1808 * 2, this.y + 1281 * 2, 14, 2.9 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1865 * 2, this.y + 1281 * 2, 14, 2.9 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1773 * 2, this.y + 1336 * 2, 14, 1.22 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1927 * 2, this.y + 1248 * 2, 14, 2.9 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2192 * 2, this.y + 1248 * 2, 14, 5 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2441 * 2, this.y + 1216 * 2, 14, 5.95 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2408 * 2, this.y + 1154 * 2, 14, 2.1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2473 * 2, this.y + 1121 * 2, 14, 3.19 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2536 * 2, this.y + 1057 * 2, 14, 3.65 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2569 * 2, this.y + 1025 * 2, 14, 2.95 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2600 * 2, this.y + 993 * 2, 14, 2.95 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2704 * 2, this.y + 993 * 2, 14, 2.95 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2762 * 2, this.y + 992 * 2, 14, 2.95 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2865 * 2, this.y + 992 * 2, 14, 2.95 * 64));

    this.bounding_boxes.push(new BoundingBox(this.x + 2481 * 2, this.y + 897 * 2, 14, 3.15 * 64)); // Middle Inaccessible Area, starting on the right side.
    this.bounding_boxes.push(new BoundingBox(this.x + 2385 * 2, this.y + 833 * 2, 14, 2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2385 * 2, this.y + 994 * 2, 14, 1.11 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2301 * 2, this.y + 994 * 2, 14, 1.11 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2216 * 2, this.y + 962 * 2, 14, 1.11 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2184 * 2, this.y + 928 * 2, 14, 1.11 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2011 * 2, this.y + 928 * 2, 14, 1.11 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1904 * 2, this.y + 962 * 2, 14, 3.3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1936 * 2, this.y + 1057 * 2, 14, 3.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1833 * 2, this.y + 1121 * 2, 14, 1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1800 * 2, this.y + 1057 * 2, 14, 2.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1704 * 2, this.y + 992 * 2, 14, 2.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1405 * 2, this.y + 928 * 2, 14, 2.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1256 * 2, this.y + 865 * 2, 14, 2.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1225 * 2, this.y + 832 * 2, 14, 1.1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1072 * 2, this.y + 832 * 2, 14, 1.1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1000 * 2, this.y + 832 * 2, 14, 1.1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 968 * 2, this.y + 736 * 2, 14, 3.23 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1032 * 2, this.y + 576 * 2, 14, 5.5 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1096 * 2, this.y + 512 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1221 * 2, this.y + 481 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1296 * 2, this.y + 481 * 2, 14, 4 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1264 * 2, this.y + 608 * 2, 14, 5.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1353 * 2, this.y + 737 * 2, 14, 1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1425 * 2, this.y + 737 * 2, 14, 3.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1745 * 2, this.y + 832 * 2, 14, 2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1992 * 2, this.y + 672 * 2, 14, 7 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2195 * 2, this.y + 672 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 2320 * 2, this.y + 737 * 2, 14, 3 * 64));

    this.bounding_boxes.push(new BoundingBox(this.x + 1544 * 2, this.y + 1408 * 2, 14, 1 * 64)); // Bottom middle of the map going left, near the big group of trees.
    this.bounding_boxes.push(new BoundingBox(this.x + 1617 * 2, this.y + 1408 * 2, 14, 1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1512 * 2, this.y + 1441 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1416 * 2, this.y + 1536 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1264 * 2, this.y + 1471 * 2, 14, 3.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1329 * 2, this.y + 1568 * 2, 14, 2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1360 * 2, this.y + 1313 * 2, 14, 5.1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1160 * 2, this.y + 1536 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 848 * 2, this.y + 1568 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 528 * 2, this.y + 1472 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 240 * 2, this.y + 1248 * 2, 14, 7 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 208 * 2, this.y + 1217 * 2, 14, 1 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 144 * 2, this.y + 1120 * 2, 14, 3.05 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 112 * 2, this.y + 996 * 2, 14, 4 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 144 * 2, this.y + 832 * 2, 14, 5.35 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 208 * 2, this.y + 662 * 2, 14, 5.5 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 232 * 2, this.y + 576 * 2, 14, 2.7 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 457 * 2, this.y + 545 * 2, 14, 2.92* 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 528 * 2, this.y + 545 * 2, 14, 2.92* 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 585 * 2, this.y + 545 * 2, 14, 2.92* 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 616 * 2, this.y + 513 * 2, 14, 2.93 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 688 * 2, this.y + 513 * 2, 14, 5.95 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 720 * 2, this.y + 641 * 2, 14, 3.93 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 785 * 2, this.y + 704 * 2, 14, 5.95 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 816 * 2, this.y + 832 * 2, 14, 5 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 880 * 2, this.y + 928 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 912 * 2, this.y + 961 * 2, 14, 2.95 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 976 * 2, this.y + 992 * 2, 14, 5.2 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 880 * 2, this.y + 1152 * 2, 14, 6 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 944 * 2, this.y + 1280 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1168 * 2, this.y + 1312 * 2, 14, 3 * 64));
    this.bounding_boxes.push(new BoundingBox(this.x + 1225 * 2, this.y + 1312 * 2, 14, 3 * 64));
    // Horizontal Boxes
    this.bounding_boxes.push(new BoundingBox(this.x + 285, this.y + 510, 1.25 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 360, this.y + 320, 3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1055, this.y + 320, 2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1170, this.y + 479, 1.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1233, this.y + 578, 2.45 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1373, this.y + 510, 3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1560, this.y + 385, 8 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2066, this.y + 577, 2.25 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1100 + 1095, this.y + 330 + 310, 10.4 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1423 * 2, this.y + 225 * 2, 9 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1705 * 2, this.y + 288 * 2, 4.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1833 * 2, this.y + 386 * 2, 3.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1929 * 2, this.y + 448 * 2, 2.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1993 * 2, this.y + 480 * 2, 4.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2121 * 2, this.y + 511 * 2, 3.4 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2225 * 2, this.y + 449 * 2, 2.7 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2310 * 2, this.y + 405 * 2, 3.5 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2416 * 2, this.y + 350 * 2, 2.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2481 * 2, this.y + 257 * 2, 1.18 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2512 * 2, this.y + 192 * 2, 1.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2545 * 2, this.y + 128 * 2, 1.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2577 * 2, this.y + 96 * 2, 10 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2577 * 2, this.y + 225 * 2, 4.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2761 * 2, this.y + 225 * 2, 4.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2579 * 2, this.y + 280 * 2, 4 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2767 * 2, this.y + 280 * 2, 4 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2546 * 2, this.y + 384 * 2, 5.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2761 * 2, this.y + 384 * 2, 5.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2890 * 2, this.y + 128 * 2, 1.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2546 * 2, this.y + 439 * 2, 5 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2767 * 2, this.y + 439 * 2, 5 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2928 * 2, this.y + 192 * 2, 1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2952 * 2, this.y + 396 * 2, 1.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2985 * 2, this.y + 481 * 2, 2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 3048 * 2, this.y + 577 * 2, 1.3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 3081 * 2, this.y + 641 * 2, 1.3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 3113 * 2, this.y + 772 * 2, 1.3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 3113 * 2, this.y + 929 * 2, 1.3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2961 * 2, this.y + 1089 * 2, 5 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2963 * 2, this.y + 1144 * 2, 5 * 64, 14));

    this.bounding_boxes.push(new BoundingBox(this.x + 2952 * 2, this.y + 1280 * 2, 1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2888 * 2, this.y + 1440 * 2, 2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2792 * 2, this.y + 1568 * 2, 3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1938 * 2, this.y + 1600 * 2, 28 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1712 * 2, this.y + 1568 * 2, 7.23 * 64, 14));

    this.bounding_boxes.push(new BoundingBox(this.x + 1769 * 2, this.y + 1281 * 2, 1.43 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1737 * 2, this.y + 1313 * 2, 1.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1617 * 2, this.y + 1440 * 2, 3.9 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1737 * 2, this.y + 1368 * 2, 1.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1769 * 2, this.y + 1336 * 2, 1.43 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1712 * 2, this.y + 1495 * 2, 1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1866 * 2, this.y + 1281 * 2, 2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1866 * 2, this.y + 1281 * 2, 2.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1866 * 2, this.y + 1336 * 2, 2.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1927 * 2, this.y + 1248 * 2, 8.4 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1927 * 2, this.y + 1304 * 2, 8.4 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2192 * 2, this.y + 1344 * 2, 8 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2192 * 2, this.y + 1401 * 2, 7.9 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2409 * 2, this.y + 1216 * 2, 2.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2408 * 2, this.y + 1152 * 2, 2.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2473 * 2, this.y + 1121 * 2, 2.15 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2569 * 2, this.y + 1025 * 2, 1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2600 * 2, this.y + 993 * 2, 3.465 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2536 * 2, this.y + 1113 * 2, 1.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2572 * 2, this.y + 1081 * 2, 1.05 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2536 * 2, this.y + 1057 * 2, 1.05 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2472 * 2, this.y + 1167 * 2, 2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2604 * 2, this.y + 1048 * 2, 3.15 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2767 * 2, this.y + 1048 * 2, 3.15 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2767 * 2, this.y + 992 * 2, 3.24 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2866 * 2, this.y + 1024 * 2, 3.13 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2866 * 2, this.y + 1080 * 2, 3.13 * 64, 14));

    this.bounding_boxes.push(new BoundingBox(this.x + 2385 * 2, this.y + 896 * 2, 3.195 * 64, 14)); // Middle Inaccessible Area, starting on the right side.
    this.bounding_boxes.push(new BoundingBox(this.x + 2385 * 2, this.y + 993 * 2, 3.195 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2301 * 2, this.y + 1024 * 2, 2.8 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2217 * 2, this.y + 993 * 2, 2.8 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2185 * 2, this.y + 961 * 2, 1.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1904 * 2, this.y + 961 * 2, 3.555 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2010 * 2, this.y + 929 * 2, 5.5 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1904 * 2, this.y + 1056 * 2, 1.23 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1833 * 2, this.y + 1153 * 2, 3.25 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1800 * 2, this.y + 1121 * 2, 1.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1704 * 2, this.y + 1056 * 2, 3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1405 * 2, this.y + 992 * 2, 9 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1257 * 2, this.y + 928 * 2, 6 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1225 * 2, this.y + 865 * 2, 1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1072 * 2, this.y + 832 * 2, 5 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1000 * 2, this.y + 864 * 2, 2.47 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 969 * 2, this.y + 833 * 2, 0.95 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 969 * 2, this.y + 736 * 2, 2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1032 * 2, this.y + 576 * 2, 2.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1096 * 2, this.y + 512 * 2, 4.3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1221 * 2, this.y + 481 * 2, 2.4 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1264 * 2, this.y + 609 * 2, 1.22 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1264 * 2, this.y + 769 * 2, 3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1353 * 2, this.y + 737 * 2, 2.45 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1425 * 2, this.y + 832 * 2, 10.18 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1745 * 2, this.y + 865 * 2, 8 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1992 * 2, this.y + 672 * 2, 6.5 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2195 * 2, this.y + 737 * 2, 4 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 2320 * 2, this.y + 832 * 2, 2.1 * 64, 14));

    this.bounding_boxes.push(new BoundingBox(this.x + 1544 * 2, this.y + 1408 * 2, 2.5 * 64, 14)); // Bottom middle of the map going left, near the big group of trees.
    this.bounding_boxes.push(new BoundingBox(this.x + 1512 * 2, this.y + 1441 * 2, 1.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1416 * 2, this.y + 1536 * 2, 3.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1264 * 2, this.y + 1471 * 2, 3.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1270 * 2, this.y + 1568 * 2, 2.05 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1329 * 2, this.y + 1601* 2, 2.75 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1160 * 2, this.y + 1536* 2, 3.3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 848 * 2, this.y + 1600* 2, 10 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 528 * 2, this.y + 1568* 2, 10 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 240 * 2, this.y + 1472* 2, 9 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 208 * 2, this.y + 1248* 2, 1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 144 * 2, this.y + 1217* 2, 2.1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 112 * 2, this.y + 1120* 2, 1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 112 * 2, this.y + 996* 2, 1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 144 * 2, this.y + 832 * 2, 2.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 208 * 2, this.y + 662 * 2, 1 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 144 * 2, this.y + 609 * 2, 3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 232 * 2, this.y + 576 * 2, 7 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 232 * 2, this.y + 632 * 2, 7.2 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 457 * 2, this.y + 545 * 2, 2.43 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 457 * 2, this.y + 600 * 2, 2.3 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 593 * 2, this.y + 600 * 2, 0.9 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 593 * 2, this.y + 545 * 2, 0.9 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 616 * 2, this.y + 513 * 2, 2.46 * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 616 * 2, this.y + 567 * 2, 2.3   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 688 * 2, this.y + 641 * 2, 1   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 688 * 2, this.y + 696 * 2, 1   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 721 * 2, this.y + 704 * 2, 2.2   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 722 * 2, this.y + 761 * 2, 2.1   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 785 * 2, this.y + 832 * 2, 1   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 785 * 2, this.y + 888 * 2, 1   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 816 * 2, this.y + 928 * 2, 2.22   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 816 * 2, this.y + 985 * 2, 2.22   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 880 * 2, this.y + 961 * 2, 1.22   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 880 * 2, this.y + 1017 * 2, 1.22   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 912 * 2, this.y + 992 * 2, 2   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 912 * 2, this.y + 1049 * 2, 2   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 880 * 2, this.y + 1152 * 2, 3.2   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 880 * 2, this.y + 1280 * 2, 2.15   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 880 * 2, this.y + 1337 * 2, 2.15   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 944 * 2, this.y + 1312 * 2, 7.22   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 944 * 2, this.y + 1369 * 2, 7   * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1225 * 2, this.y + 1312 * 2, 4.4  * 64, 14));
    this.bounding_boxes.push(new BoundingBox(this.x + 1225 * 2, this.y + 1369 * 2, 4.4  * 64, 14));
  }

  update() {}

  draw(ctx) {
    ctx.drawImage(this.spritesheet, 0, 0, 3216, 1760, this.x - this.game.camera.x, this.y - this.game.camera.y, 3216 * 2, 1760 * 2);

    if (params.DEBUG) {
      ctx.save();
      ctx.fillStyle = "#008ab7";
      ctx.globalAlpha = 0.9;
      ctx.fillRect(0, 0, 4000, 4000);
      ctx.restore();
      ctx.drawImage(this.spritesheet, 0, 0, 3216, 1760, this.x - this.game.camera.x, this.y - this.game.camera.y, 3216 * 2, 1760 * 2);
      this.bounding_boxes.forEach((box) => {
        drawBoundingBox(box, ctx, this.game, "red");
      });
    }
  }
}

class Map2 {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/bossroom.png");
    this.bounding_boxes = [];
  }

  update() {}

  draw(ctx) {
    ctx.drawImage(this.spritesheet, 0, 0, 800, 1312, this.x - this.game.camera.x, this.y - this.game.camera.y, 1600, 2624);
  }
}
