class TextAnimator {
  constructor(xStart, yStart, amount, duration) {
    Object.assign(this, {
      xStart,
      yStart,
      amount,
      duration,
    });

    this.x = xStart + (Math.random() * 30 - 30);
    this.y = yStart;

    this.alpha = 1;
  }

  drawText(tick, ctx) {
    this.alpha -= tick;
    if (this.isDone()) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;

    ctx.fillStyle = "red";
    ctx.font = "15px Arial";

    this.y -= 20 * tick;
    ctx.fillText(this.amount, this.x, this.y, 48);

    ctx.restore();
  }

  isDone() {
    return this.alpha <= 0;
  }
}
