class Mob {
  constructor(x, y, color, grid, target) {
    Object.assign(this, { x, y, color, grid, target });
    this.radius = 15;
    this.viewDistance = 600;
    this.currentDirection = null;
    this.attackDistance = 50;
    this.canAttack = false;
    this.speed = 100;
  }

  update() {
    if (Math.abs(getDistance(this.x, this.target.x, this.y, this.target.y)) <= this.attackDistance) {
      this.canAttack = true;
      return;
    } else {
      this.canAttack = false;
    }
    const location = getCurrentLocation(this.x, this.y, this.grid.grid);
    this.grid.init(location, getCurrentLocation(this.target.x, this.target.y, this.grid.grid));

    // get center of current grid location
    var centerX = location[1] * this.grid.nodeSize + this.grid.nodeSize / 2;
    var centerY = location[0] * this.grid.nodeSize + this.grid.nodeSize / 2;

    const direction = aStar(location, this.grid.grid);
    if (!this.currentDirection) this.currentDirection = direction[0];
    else if (
      this.currentDirection != direction[0] &&
      Math.abs(getDistance(this.x, centerX, this.y, centerY)) <= this.grid.nodeSize / 2 - this.radius
    ) {
      this.currentDirection = direction[0];
    }

    const distance = direction.length * this.grid.nodeSize;
    if (distance > this.viewDistance) return;

    if (this.currentDirection == "West") {
      this.x -= this.speed * engine.clockTick;
    } else if (this.currentDirection == "North") {
      this.y -= this.speed * engine.clockTick;
    } else if (this.currentDirection == "East") {
      this.x += this.speed * engine.clockTick;
    } else if (this.currentDirection == "South") {
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

    if (this.canAttack) {
      ctx.save();
      ctx.fillStyle = "cyan";
      ctx.font = "20px Arial";
      const width = ctx.measureText("ATTACKING").width / 2;
      ctx.fillText("ATTACKING", this.x - width, this.y - 15);
      ctx.restore();
    }
  }
}
