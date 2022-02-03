class XP {
  constructor(knight) {
    this.knight = knight;
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
    this.xpNeeded = Math.pow(1.1, this.currLevel - 1) * this.baseXP;

    // testing hp scaling by level
    this.knight.maxHealth = Math.round(this.knight.maxHealth * 1.1);
  }

  purchaseSkill(levels) {
    this.skillPoints -= levels;
  }
}
