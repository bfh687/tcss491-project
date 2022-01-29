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
      ctx.fillText("ATTACK", 20, 30);
      ctx.fillRect(20, 40, 100 - attack_cooldown, 10);
    }

    if (slide_cooldown) {
      ctx.fillText("SLIDE", 20, 70);
      ctx.fillRect(20, 80, 100 - slide_cooldown, 10);
    }

    var minutes = Math.floor(this.game.timer.gameTime / 60);
    var seconds = Math.floor(this.game.timer.gameTime % 60);
    var time = minutes + ":";
    if (seconds < 10) time += "0";
    time += seconds;

    ctx.fillText("TIME: " + time, 20, 110);
    ctx.fillText("KILL COUNT: " + this.knight.kills, 20, 130);

    // fps counter
    ctx.fillText("FPS: " + Math.round(1.0 / this.game.clockTick), 20, 150);

    ctx.restore();

    const items = ASSET_MANAGER.getAsset("./sprites/items.png");

    var y_offset = 176;
    var count = 0;
    this.knight.items.forEach((obj) => {
      ctx.drawImage(items, obj.item.x, obj.item.y, 32, 32, 15 + Math.floor(count / 5) * 48, y_offset, 32, 32);
      ctx.fillStyle = "white";
      ctx.fillText("x" + obj.count, 39 + Math.floor(count / 5) * 48, y_offset);
      count++;
      if (count == 5) y_offset = 108;
      y_offset += 48;
    });
  }
}
