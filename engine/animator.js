class Animator {
  constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingLeft, framePaddingRight, reverse, loop) {
    Object.assign(this, {
      spritesheet,
      xStart,
      yStart,
      height,
      width,
      frameCount,
      frameDuration,
      framePaddingLeft,
      framePaddingRight,
      reverse,
      loop,
    });

    this.elapsedTime = 0;
    this.totalTime = this.frameCount * this.frameDuration;
    this.paused = false;
  }

  pause() {
    this.paused = true;
  }

  drawFrame(tick, ctx, x, y, scale) {
    if (!this.paused) {
      this.elapsedTime += tick;

      if (this.isDone()) {
        if (this.loop) {
          this.elapsedTime -= this.totalTime;
        } else {
          return;
        }
      }
    }

    let frame = this.currentFrame();
    if (this.reverse) frame = this.frameCount - frame - 1;

    ctx.drawImage(
      this.spritesheet,
      this.xStart + frame * this.width + this.framePaddingLeft,
      this.yStart,
      this.width - this.framePaddingRight,
      this.height,
      x,
      y,
      (this.width - this.framePaddingRight) * scale,
      this.height * scale
    );
  }

  currentFrame() {
    return Math.floor(this.elapsedTime / this.frameDuration);
  }

  setFrameDuration(duration) {
    this.frameDuration = duration;
  }

  reset() {
    this.elapsedTime = 0;
  }

  getWidth() {
    return this.width - this.framePaddingLeft - this.framePaddingRight;
  }

  getHeight() {
    return this.height;
  }

  isDone() {
    return this.elapsedTime >= this.totalTime;
  }
}
