class Transition {
  constructor(game, flipped) {
    Object.assign(this, { game, flipped });

    if (this.flipped) {
      this.frameIndex = 32;
    } else {
      this.frameIndex = 0;
    }
    this.frameCooldown = 0;
  }

  update() {
    if (this.frameIndex > 32 || this.frameIndex < 0) this.removeFromWorld = true;

    this.frameCooldown -= this.game.clockTick;
    if (this.frameCooldown <= 0) {
      this.frameCooldown = 0.03;
      if (this.flipped) {
        this.frameIndex--;
      } else {
        this.frameIndex++;
      }
    }
  }

  draw(ctx) {
    if (this.frameIndex > 32 || this.frameIndex < 0) return;

    var path = "./sprites/death_transition/death_transition (" + this.frameIndex + ").png";
    var frame = ASSET_MANAGER.getAsset(path);

    if (this.flipped) {
      ctx.save();
      ctx.scale(-1, -1);
      ctx.drawImage(frame, 0 - 1366, 0 - 768 + 4, 1366 + 4, 768 + 4);
      ctx.restore();
    } else {
      ctx.drawImage(frame, 0, 0, 1366 + 4, 768 + 4);
    }
  }
}
