class Target {
  constructor(x, y, color) {
    Object.assign(this, { x, y, color });
    this.radius = 15;
    this.speed = 300;
  }

  update() {
    if (engine.keys.a) {
      this.x -= this.speed * engine.clockTick;
    } else if (engine.keys.w) {
      this.y -= this.speed * engine.clockTick;
    } else if (engine.keys.d) {
      this.x += this.speed * engine.clockTick;
    } else if (engine.keys.s) {
      this.y += this.speed * engine.clockTick;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
