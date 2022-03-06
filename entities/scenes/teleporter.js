class Teleporter {
  constructor(game, x, y, level, boss) {
    Object.assign(this, { game, x, y, level, boss });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/teleporter.png");
    this.interaction_box = new BoundingBox(this.x + 48, this.y + 48, 96, 96);
    this.boundingBox = new BoundingBox(this.x, this.y - 32, 32 * 8, 32 * 6);
  }

  update() {
    if (!this.level || !this.boss) return;
    const knight = this.game.knight;
    if (this.interaction_box.collide(knight.hurtBox)) {
      // enter shop
      if (this.game.keys.e) {
        this.game.camera.transition = new FadeTransition(this.game, 2.5, this.level, this.boss);
      }
    }
  }

  draw(ctx) {
    ctx.drawImage(this.spritesheet, 0, 0, 32 * 4, 32 * 3, this.x - this.game.camera.x, this.y - this.game.camera.y, 32 * 8, 32 * 6);
    if (params.DEBUG) {
      drawBoundingBox(this.interaction_box, ctx, this.game, "blue");
    }
  }
}
