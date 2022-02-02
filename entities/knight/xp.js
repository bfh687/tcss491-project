class XP {
  constructor() {
    this.baseXP = 1000;
    this.currLevel = 1;
    this.currXP = 0;
    this.xpNeeded = this.baseXP;
    this.skillPoints = 0;
  }

  incrementXP(xp) {
    this.currXP += xp;
    if (this.currXP >= this.xpNeeded) {
      this.currXP = this.currXP % this.xpNeeded;
      this.level();
    }
  }

  level() {
    this.currLevel++;
    this.skillPoints++;
    this.xpNeeded = Math.pow(1.1, this.currLevel - 1) * this.baseXP;
  }

  purchaseSkill(levels) {
    this.skillPoints -= levels;
  }
}
