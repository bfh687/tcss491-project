class HUD {
  constructor(game, knight) {
    Object.assign(this, { game, knight });
    this.priority = Number.MAX_VALUE;
  }

  update() {}

  draw(ctx) {
    ctx.save();

    var attack_cooldown = (this.knight.attackCooldown / 0.25) * 100;
    var slide_cooldown = (this.knight.slideCooldown / 1.5) * 100;

    ctx.fillStyle = "white";

    if (attack_cooldown) {
      ctx.fillText("ATTACK", 20, 10);
      ctx.fillRect(20, 20, 100 - attack_cooldown, 10);
    }

    if (slide_cooldown) {
      ctx.fillText("SLIDE", 20, 50);
      ctx.fillRect(20, 60, 100 - slide_cooldown, 10);
    }

    // fps counter
    if (params.DEBUG) {
      ctx.fillText("FPS: " + Math.round(1.0 / this.game.clockTick), 20, 90);
    }

    ctx.restore();

    const items = ASSET_MANAGER.getAsset("./sprites/items.png");

    var y_offset = 128;
    var count = 0;
    this.knight.playerItems.forEach((obj) => {
      ctx.drawImage(items, obj.item.x, obj.item.y, 32, 32, 10 + Math.floor(count / 5) * 48, y_offset, 32, 32);
      ctx.fillStyle = "white";
      ctx.fillText("x" + obj.count, 34 + Math.floor(count / 5) * 48, y_offset);
      count++;
      if (count == 5) y_offset = 80;
      y_offset += 48;
    });
    console.log(this.knight.playerItems);
  }
}
