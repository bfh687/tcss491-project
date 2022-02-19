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
    console.log(mobs);
    if (type == "skeleton") {
      for (let i = 0; i < mobs; i++) {
        this.game.addEntity(
          new Skeleton(
            this.game,
            x + i * this.randomNumber(this.minOffset, this.maxOffset),
            y + i * this.randomNumber(this.minOffset, this.maxOffset)
          )
        );
      }
    } else if (type == "eyeball") {
      for (let i = 0; i < mobs; i++) {
        this.game.addEntity(
          new Eyeball(this.game, x + i * this.randomNumber(this.minOffset, this.maxOffset), y + i * this.randomNumber(this.minOffset, this.maxOffset))
        );
      }
    } else {
      for (let i = 0; i < mobs; i++) {
        const rand = this.randomNumber(0, 12);
        if (rand <= 7) {
          this.game.addEntity(
            new Skeleton(
              this.game,
              x + i * this.randomNumber(this.minOffset, this.maxOffset),
              y + i * this.randomNumber(this.minOffset, this.maxOffset)
            )
          );
        } else {
          this.game.addEntity(
            new Eyeball(
              this.game,
              x + i * this.randomNumber(this.minOffset, this.maxOffset),
              y + i * this.randomNumber(this.minOffset, this.maxOffset)
            )
          );
        }
        console.log("mixed");
      }
    }
  }
}
