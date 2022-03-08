class Prop {
  constructor(game, x, y, code) {
    Object.assign(this, { game, x, y, code });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/props.png");
    this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/map/main_props_2.png");
    this.spritesheet3 = ASSET_MANAGER.getAsset("./sprites/map/decorative_props_2.png");
    this.shadow_spritesheet = ASSET_MANAGER.getAsset("./sprites/map/prop_shadows.png");
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
      case "bigrock":
        this.sprite_x = 0;
        this.sprite_y = 13 * 32;
        this.sprite_width = 64;
        this.sprite_height = 64;
        this.boundingBox = new BoundingBox(this.x + 4, this.y + 48, 120, 64);
        break;
      case "smallrock1":
        this.sprite_x = 0;
        this.sprite_y = 15 * 32;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 20, this.y + 36, 20, 8);
        break;
      case "smallrock2":
        this.sprite_x = 32;
        this.sprite_y = 15 * 32;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 16, this.y + 30, 32, 18);
        break;
      case "smallrock3":
        this.sprite_x = 32 * 2;
        this.sprite_y = 15 * 32;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 8, this.y + 26, 48, 26);
        break;
      case "smallrock4":
        this.sprite_x = 32 * 3;
        this.sprite_y = 15 * 32;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 8, this.y + 30, 46, 22);
        break;
      case "smallrock5":
        this.sprite_x = 32 * 4;
        this.sprite_y = 15 * 32;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 4, this.y + 24, 54, 28);
        break;
      case "smallrock6":
        this.sprite_x = 32 * 5;
        this.sprite_y = 15 * 32;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 4, this.y + 20, 56, 40);
        break;
      case "pillar1":
        this.sprite_x = 32 * 11;
        this.sprite_y = 32 * 5;
        this.sprite_width = 32;
        this.sprite_height = 96;
        this.boundingBox = new BoundingBox(this.x, this.y + 128, 64, 54);
        break;
      case "pillar2":
        this.sprite_x = 32 * 13;
        this.sprite_y = 6 * 32;
        this.sprite_width = 32;
        this.sprite_height = 64;
        this.boundingBox = new BoundingBox(this.x, this.y + 64, 64, 54);
        break;
      case "grave":
        this.sprite_x = 32 * 9;
        this.sprite_y = 4 * 32;
        this.sprite_width = 32;
        this.sprite_height = 96;
        this.boundingBox = new BoundingBox(this.x, this.y + 80, 64, 96);
        break;
      case "box":
        this.sprite_x = 32 * 5;
        this.sprite_y = 0;
        this.sprite_width = 32;
        this.sprite_height = 64;
        this.boundingBox = new BoundingBox(this.x, this.y + 54, 64, 72);
        break;
      case "barrel":
        this.sprite_x = 32 * 5;
        this.sprite_y = 4 * 32;
        this.sprite_width = 32;
        this.sprite_height = 64;
        this.boundingBox = new BoundingBox(this.x, this.y + 80, 64, 44);
        break;
      case "eastsign":
        this.sprite_x = 32 * 3;
        this.sprite_y = 5 * 32;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 6, this.y + 50, 48, 12);
        break;
      case "westsign":
        this.sprite_x = 32 * 3;
        this.sprite_y = 7 * 32;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 6, this.y + 50, 48, 12);
        break;
      case "vase1":
        this.sprite_x = 32 * 5;
        this.sprite_y = 6 * 32;
        this.sprite_width = 32;
        this.sprite_height = 64;
        this.boundingBox = new BoundingBox(this.x + 11, this.y + 88, 42, 32);
        break;
      case "vase2":
        this.sprite_x = 32 * 5;
        this.sprite_y = 9 * 32;
        this.sprite_width = 32;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 8, this.y + 24, 50, 32);
        break;
      case "vase3":
        this.sprite_x = 32 * 5;
        this.sprite_y = 10 * 32;
        this.sprite_width = 32;
        this.sprite_height = 64;
        this.boundingBox = new BoundingBox(this.x + 10, this.y + 88, 44, 32);
        break;
      case "tombstone1":
        this.sprite_x = 32 * 7;
        this.sprite_y = 7 * 32;
        this.sprite_width = 32;
        this.sprite_height = 64;
        this.boundingBox = new BoundingBox(this.x, this.y + 78, 64, 32);
        break;
      case "tombstone2":
        this.sprite_x = 32 * 7;
        this.sprite_y = 9 * 32;
        this.sprite_width = 32;
        this.sprite_height = 96;
        this.boundingBox = new BoundingBox(this.x + 16, this.y + 78, 32, 32);
        break;
      case "tombstone3":
        this.sprite_x = 32 * 9;
        this.sprite_y = 7 * 32;
        this.sprite_width = 32;
        this.sprite_height = 64;
        this.boundingBox = new BoundingBox(this.x, this.y + 74, 64, 36);
        break;
      case "well":
        this.sprite_x = 32 * 13;
        this.sprite_y = 11 * 32;
        this.sprite_width = 64;
        this.sprite_height = 64;
        this.boundingBox = new BoundingBox(this.x + 7, this.y + 22, 110, 86);
        break;
      case "horizontaltomb1":
        this.spritesheet = this.spritesheet3;
        this.sprite_x = 0;
        this.sprite_y = 32 * 2;
        this.sprite_width = 48;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 12, this.y + 22, 72, 38);
        break;
      case "horizontaltomb2":
        this.spritesheet = this.spritesheet3;
        this.sprite_x = 0;
        this.sprite_y = 32 * 3;
        this.sprite_width = 48;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 12, this.y + 22, 72, 38);
        break;
      case "horizontaltomb3":
        this.spritesheet = this.spritesheet3;
        this.sprite_x = 0;
        this.sprite_y = 32 * 4;
        this.sprite_width = 48;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 12, this.y + 22, 72, 38);
        break;
      case "horizontaltomb4":
        this.spritesheet = this.spritesheet3;
        this.sprite_x = 0;
        this.sprite_y = 32 * 5;
        this.sprite_width = 48;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 12, this.y + 22, 72, 38);
        break;
      case "horizontaltomb5":
        this.spritesheet = this.spritesheet3;
        this.sprite_x = 0;
        this.sprite_y = 32 * 7;
        this.sprite_width = 48;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 12, this.y + 22, 72, 38);
        break;
      case "stonepillar1":
        this.spritesheet = this.spritesheet2;
        this.sprite_x = 32 * 21;
        this.sprite_y = 32 * 4;
        this.sprite_width = 32;
        this.sprite_height = 128;
        this.boundingBox = new BoundingBox(this.x + 2, this.y + 86, 30, 38);
        break;
      case "stonepillar2":
        this.spritesheet = this.spritesheet2;
        this.sprite_x = 32 * 22;
        this.sprite_y = 32 * 4;
        this.sprite_width = 32;
        this.sprite_height = 128;
        this.boundingBox = new BoundingBox(this.x + 2, this.y + 86, 62, 38);
        break;
      case "pole":
          this.spritesheet = this.spritesheet2;
          this.sprite_x = 0;
          this.sprite_y = 0;
          this.sprite_width = 0;
          this.sprite_height = 0;
          this.boundingBox = new BoundingBox(this.x, this.y, 18, 20);
          break;
        case "fence":
          this.spritesheet = this.spritesheet2;
          this.sprite_x = 32 * 16;
          this.sprite_y = 32 * 1;
          this.sprite_width = 64;
          this.sprite_height = 84;
          this.boundingBox = new BoundingBox(this.x, this.y + 120, 126, 20);
          break;
      case "verticaltomb1":
          this.spritesheet = this.spritesheet3;
          this.sprite_x = 32 * 1.5;
          this.sprite_y = 32 * 2;
          this.sprite_width = 32;
          this.sprite_height = 48;
          this.boundingBox = new BoundingBox(this.x + 14, this.y + 26, 34, 70);
          break;
      case "verticaltomb2":
          this.spritesheet = this.spritesheet3;
          this.sprite_x = 32 * 2.5;
          this.sprite_y = 32 * 2;
          this.sprite_width = 32;
          this.sprite_height = 48;
          this.boundingBox = new BoundingBox(this.x + 14, this.y + 26, 34, 70);
          break;
      case "verticaltomb3":
          this.spritesheet = this.spritesheet3;
          this.sprite_x = 32 * 2.5;
          this.sprite_y = 32 * 3.5;
          this.sprite_width = 32;
          this.sprite_height = 48;
          this.boundingBox = new BoundingBox(this.x + 14, this.y + 26, 34, 70);
          break;
      case "crate1":
          this.spritesheet = this.spritesheet3;
          this.sprite_x = 32 * 4;
          this.sprite_y = 32 * 2;
          this.sprite_width = 16;
          this.sprite_height = 32;
          this.boundingBox = new BoundingBox(this.x + 4, this.y + 36, 24, 28);
          break;
      case "crate2":
          this.spritesheet = this.spritesheet3;
          this.sprite_x = 32 * 6;
          this.sprite_y = 32 * 2;
          this.sprite_width = 32;
          this.sprite_height = 32;
          this.boundingBox = new BoundingBox(this.x + 16, this.y + 36, 32, 28);
          break;
      case "crate3":
          this.spritesheet = this.spritesheet3;
          this.sprite_x = 32 * 6;
          this.sprite_y = 32 * 3;
          this.sprite_width = 32;
          this.sprite_height = 32;
          this.boundingBox = new BoundingBox(this.x + 16, this.y + 16, 32, 18);
          break;
      case "crate4":
          this.spritesheet = this.spritesheet3;
          this.sprite_x = 32 * 5;
          this.sprite_y = 32 * 3;
          this.sprite_width = 32;
          this.sprite_height = 32;
          this.boundingBox = new BoundingBox(this.x + 20, this.y + 20, 24, 14);
          break;
      case "purplepot1":
          this.spritesheet = this.spritesheet3;
          this.sprite_x = 32 * 4;
          this.sprite_y = 32 * 3.5;
          this.sprite_width = 32;
          this.sprite_height = 32;
          this.boundingBox = new BoundingBox(this.x + 36, this.y + 42, 24, 20);
          break;
      case "purplepot2":
          this.spritesheet = this.spritesheet3;
          this.sprite_x = 32 * 5;
          this.sprite_y = 32 * 3.5;
          this.sprite_width = 16;
          this.sprite_height = 32;
          this.boundingBox = new BoundingBox(this.x + 8, this.y + 42, 16, 20);
          break;
      case "greenpot1":
          this.spritesheet = this.spritesheet3;
          this.sprite_x = 32 * 4;
          this.sprite_y = 32 * 5;
          this.sprite_width = 32;
          this.sprite_height = 32;
          this.boundingBox = new BoundingBox(this.x + 36, this.y + 42, 24, 20);
          break;
      case "greenpot2":
        this.spritesheet = this.spritesheet3;
        this.sprite_x = 32 * 5;
        this.sprite_y = 32 * 5;
        this.sprite_width = 16;
        this.sprite_height = 32;
        this.boundingBox = new BoundingBox(this.x + 8, this.y + 42, 16, 20);
          break;
      default:
        console.log("invalid prop code");
    }
  }
}
