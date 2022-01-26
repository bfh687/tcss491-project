class TextAnimator {
  constructor(xStart, yStart, amount, duration) {
    Object.assign(this, {
      xStart,
      yStart,
      amount,
      duration,
    });

    this.damageColor = "red";

    this.x = xStart + (Math.random() * 30 - 30);
    this.y = yStart;
    this.alpha = 1;
  }

  critColor(color) {
    this.damageColor = color;
  }

  drawText(tick, ctx) {
    this.alpha -= tick;
    if (this.isDone()) return;

    ctx.save();

    ctx.globalAlpha = this.alpha;
    this.y -= 20 * tick;

    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(this.amount, this.x + 1, this.y + 1, 48);
    ctx.fillStyle = this.damageColor;
    ctx.fillText(this.amount, this.x, this.y, 48);

    ctx.restore();
  }

  isDone() {
    return this.alpha <= 0;
  }
}
