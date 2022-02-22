class MobCluster {
  constructor(game) {
    Object.assign(this, { game });
    this.minOffset = 13;
    this.maxOffset = 20;
  }

  randomNumber(min, max) {
    const r = Math.random() * (max - min) + min;
    return Math.floor(r);
  }

  makeCluster(x, y, mobs, type) {
    let radius = Math.sqrt(216) * mobs;
    let r1 = radius * Math.random();
    let theta = Math.random() * 2 * Math.PI;
    let xRand = x + r1 * Math.cos(theta);
    let yRand = y + r1 * Math.sin(theta);
    if (type == "skeleton") {
      for (let i = 0; i < mobs; i++) {
        this.game.addEntity(new Skeleton(this.game, xRand, yRand));
      }
    } else if (type == "eyeball") {
      for (let i = 0; i < mobs; i++) {
        this.game.addEntity(new Eyeball(this.game, xRand - 64, yRand));
      }
    } else {
      for (let i = 0; i < mobs; i++) {
        const rand = this.randomNumber(0, 12);

        if (rand <= 7) {
          this.game.addEntity(new Skeleton(this.game, xRand, yRand));
        } else {
          this.game.addEntity(new Eyeball(this.game, xRand - 64, yRand));
        }
      }
    }
  }
}
