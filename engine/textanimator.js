class TextAnimator {
  constructor(xStart, yStart, amount, duration, game, entity) {
    Object.assign(this, {
      xStart,
      yStart,
      amount,
      duration,
      game,
      entity,
    });

    // max amount before going to next text animator
    this.max = 12 + Math.floor(Math.random() * 4);
    this.damageColor = "red";

    this.xRand = Math.random() * 30 - 30;
    this.x = this.entity.x + this.xRand - this.game.camera.x + this.xStart;
    this.y = this.entity.y - this.game.camera.y + this.yStart;
    this.y_offset = 0;
    this.alpha = 2;
  }

  critColor(color) {
    this.damageColor = color;
  }

  drawText(tick, ctx) {
    this.alpha -= tick;
    if (this.isDone()) return;

    ctx.save();

    ctx.globalAlpha = this.alpha;
    this.y_offset -= 20 * tick;

    ctx.font = "15px Arial";
    ctx.fillStyle = "black";

    var amount = this.amount;
    if (typeof this.amount == "number") {
      amount = Math.round(this.amount);
    }

    ctx.fillText(
      amount,
      this.entity.x + this.xRand + this.xStart - this.game.camera.x + 1,
      this.entity.y - this.game.camera.y + 1 + this.y_offset + this.yStart,
      48
    );
    ctx.fillStyle = this.damageColor;
    ctx.fillText(
      amount,
      this.entity.x + this.xRand + this.xStart - this.game.camera.x,
      this.entity.y - this.game.camera.y + this.yStart + this.y_offset,
      48
    );

    ctx.restore();
  }

  isDone() {
    return this.alpha <= 0;
  }

  isFull() {
    return this.amount >= this.max;
  }

  increment(amount) {
    this.amount += amount;
  }
}
