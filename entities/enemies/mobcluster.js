class MobCluster {
  constructor(game, x, y, amount, type) {
    Object.assign(this, { game, x, y, amount, type });

    this.scale = 1;
    this.makeCluster(x, y, amount, type);
    this.aliveMobs = amount;
    this.respawnCountdown = 10;
  }

  makeCluster(x, y, amount, type) {
    let radius = 100;
    if (type == "skeleton") {
      for (let i = 0, theta = 0; i < amount; i++, theta += (2 * Math.PI) / amount) {
        let r1 = radius * Math.max(Math.random() * 1.5, 0.5);
        let xRand = x + r1 * Math.cos(theta);
        let yRand = y + r1 * Math.sin(theta);
        this.game.addEntity(new Skeleton(this.game, this, xRand, yRand));
      }
    } else if (type == "eyeball") {
      for (let i = 0, theta = 0; i < amount; i++, theta += (2 * Math.PI) / amount) {
        let r1 = radius * Math.max(Math.random() * 1.5, 0.5);
        let xRand = x + r1 * Math.cos(theta);
        let yRand = y + r1 * Math.sin(theta);
        this.game.addEntity(new Eyeball(this.game, this, xRand - 64, yRand - 64));
      }
    } else {
      for (let i = 0, theta = 0; i < amount; i++, theta += (2 * Math.PI) / amount) {
        const rand = this.randomNumber(0, 12);
        let r1 = radius * Math.max(Math.random() * 1.5, 0.5);
        let xRand = x + r1 * Math.cos(theta);
        let yRand = y + r1 * Math.sin(theta);
        if (rand <= 7) {
          this.game.addEntity(new Skeleton(this.game, this, xRand, yRand));
        } else {
          this.game.addEntity(new Eyeball(this.game, this, xRand - 64, yRand - 64));
        }
      }
    }
  }

  randomNumber(min, max) {
    const r = Math.random() * (max - min) + min;
    return Math.floor(r);
  }

  update() {
    if (this.aliveMobs <= 0) this.respawnCountdown -= this.game.clockTick;
    if (this.respawnCountdown <= 0) {
      this.scale *= 1.1;
      this.makeCluster(this.x, this.y, this.amount, this.type);
      this.respawnCountdown = 10;
      this.aliveMobs = this.amount;
    }
  }

  draw(ctx) {}
}
