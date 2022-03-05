class XP {
  constructor(game) {
    this.knight = game.knight;
    this.baseXP = 1000;
    this.currLevel = 1;
    this.currXP = 0;
    this.xpNeeded = this.baseXP;
    this.skillPoints = 0;
  }

  incrementXP(xp) {
    this.currXP += xp;
    while (this.currXP >= this.xpNeeded) {
      this.currXP -= this.xpNeeded;
      this.level();
    }
  }

  level() {
    this.currLevel++;
    this.skillPoints++;
    this.xpNeeded = Math.pow(1.4, this.currLevel - 1) * this.baseXP;

    // testing hp scaling by level
    this.knight.levelUp();
  }

  purchaseSkill(levels) {
    this.skillPoints -= levels;
  }
}
