class TextAnimator {
  constructor(amount, color, game, entity, scale) {
    Object.assign(this, {
      scale,
      amount,
      color,
      game,
      entity,
    });
    this.width = 48;

    // max capacity for current text animator
    this.max = 25 + Math.floor(Math.random() * 10);

    // calculate random x offset value for the tex
    this.x_rand = Math.random() * 40 - 20;

    // init y-offset
    this.y_offset = 0;

    // text alpha/opacity value
    this.alpha = 1;
  }

  drawText(ctx) {
    this.alpha -= this.game.clockTick;
    if (this.isDone()) return;

    ctx.save();

    // set opacity and y-offset values
    ctx.globalAlpha = this.alpha;
    this.y_offset -= 20 * this.game.clockTick;

    // calculate x_center of entity
    var x_center = this.entity.boundingBox.left + (this.entity.boundingBox.right - this.entity.boundingBox.left) / 2;

    // calculate values based on whether input is a number or text
    var amount = this.amount;
    if (typeof this.amount == "number") {
      amount = Math.round(this.amount);
      x_center += this.x_rand;
    } else {
      x_center -= ctx.measureText(amount).width / 2;
    }

    // set font of text
    ctx.font = "15px bitpap";
    if (this.scale) {
      ctx.font = this.scale + "px bitpap";
    }
    // draw text background
    ctx.fillStyle = "black";
    ctx.fillText(amount, x_center - this.game.camera.x + 1, this.entity.y + this.y_offset - this.game.camera.y + 1);

    // draw text foreground
    ctx.fillStyle = this.color;
    ctx.fillText(amount, x_center - this.game.camera.x, this.entity.y + this.y_offset - this.game.camera.y);

    ctx.restore();
  }

  // check if animation is done
  isDone() {
    return this.alpha <= 0;
  }

  // check if animation is at max capacity
  isFull() {
    return this.amount >= this.max;
  }

  // increment the amount by the given amount
  increment(amount) {
    this.amount += amount;
  }
}
