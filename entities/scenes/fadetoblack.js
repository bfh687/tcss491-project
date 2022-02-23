class FadeTransition {
  constructor(game, duration, level, boss) {
    Object.assign(this, { game, duration, level, boss });
    this.alpha = 0;
    this.fadeInDuration = duration / 2;
    this.fadeOutDuration = duration / 2;
    this.loaded = false;
  }

  update() {
    if (this.fadeInDuration >= 0) {
      this.alpha += this.game.clockTick / (this.duration / 2);
      this.alpha = Math.min(this.alpha, 1);
      this.fadeInDuration -= this.game.clockTick;
    } else if (this.fadeOutDuration >= 0) {
      if (!this.loaded) {
        this.game.camera.loadLevel(this.level, this.boss);
        this.loaded = true;
      }
      this.alpha -= this.game.clockTick / (this.duration / 2);
      this.alpha = Math.max(this.alpha, 0);
      this.fadeOutDuration -= this.game.clockTick;
    } else {
      this.removeFromWorld = true;
      this.game.camera.transition = null;
    }
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.game.width(), this.game.height());
    ctx.restore();
  }
}
