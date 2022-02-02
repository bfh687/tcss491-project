class HUD {
  constructor(game, knight) {
    Object.assign(this, { game, knight });
    this.priority = Number.MAX_VALUE - 1;
    this.items = ASSET_MANAGER.getAsset("./sprites/items/items.png");
  }

  update() {}

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = "white";

    // draw attack cooldown bar
    var attack_cooldown = (this.knight.attackCooldown / 0.25) * 100;
    if (attack_cooldown) {
      ctx.fillText("ATTACK", 20, 30);
      ctx.fillRect(20, 40, 100 - attack_cooldown, 10);
    }

    // draw slide cooldown bar
    var slide_cooldown = (this.knight.slideCooldown / 1.5) * 100;
    if (slide_cooldown) {
      ctx.fillText("SLIDE", 20, 70);
      ctx.fillRect(20, 80, 100 - slide_cooldown, 10);
    }

    // draw timer
    var minutes = Math.floor(this.game.timer.gameTime / 60);
    var seconds = Math.floor(this.game.timer.gameTime % 60);
    var time = minutes + ":";
    if (seconds < 10) time += "0";
    time += seconds;

    ctx.fillText("TIME: " + time, 20, 110);
    ctx.fillText("KILL COUNT: " + this.knight.kills, 20, 130);

    // fps counter
    ctx.fillText("FPS: " + Math.round(1.0 / this.game.clockTick), 20, 150);

    // xp bar
    var width = 250;
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.font = "14px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("LVL " + this.knight.xpSystem.currLevel, 52, 712 + 33, 100);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText("LVL " + this.knight.xpSystem.currLevel, 50, 710 + 33, 100);
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "black";
    ctx.fillText("LVL " + this.knight.xpSystem.currLevel, 51, 712 + 33, 100);
    ctx.fillRect(150 + 1, 720 - 17 + 33, width, 4);
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "black";
    ctx.fillRect(150, 720 - 16 + 33, width, 4);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#91fdeb";
    ctx.fillRect(150, 720 - 16 + 33, Math.max(0, this.knight.xpSystem.currXP / this.knight.xpSystem.xpNeeded) * width, 4);
    ctx.restore();

    //health bar
    var width = 350;
    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    // ctx.fillText("Health", 100, 700 - 25, width);
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.1;
    ctx.fillRect(50 + 1, 690 - 17 + 20, width, 15);
    ctx.fillStyle = "red";
    ctx.fillRect(50, 690 - 16 + 20, width, 15);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#fe5253";

    ctx.fillRect(50, 710 - 16, Math.max(0, this.knight.health / this.knight.maxHealth) * width, 15);
    ctx.restore();

    // divider
    ctx.save();
    ctx.globalAlpha = 0.33;
    ctx.fillStyle = "white";
    ctx.fillRect(50, 695 + 25, width, 1);
    ctx.restore();

    //ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.font = "28px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(this.knight.health, 50, 717 - 30, width);
    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.fillText("/ " + this.knight.maxHealth, 102, 717 - 30, width);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#fe5253";
    ctx.font = "28px Arial";
    ctx.fillText(this.knight.health, 48, 715 - 30, width);
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText("/ " + this.knight.maxHealth, 100, 715 - 30, width);
    ctx.globalAlpha = 0.1;

    ctx.restore();

    // draw items
    var y_offset = 176;
    var count = 0;

    // create bounding box for the cursor
    var mouseBox = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);

    // draw item hud and show description on cursor hover
    this.knight.items.forEach((obj) => {
      if (obj.count > 0) {
        // draw item and make bounding box for the current item
        ctx.drawImage(this.items, obj.item.x, obj.item.y, 32, 32, 15, y_offset, 32, 32);
        var itemBox = new BoundingBox(15, y_offset, 32, 32);

        // set hover color
        if (mouseBox.collide(itemBox)) {
          // outline hovered item
          ctx.save();
          ctx.globalAlpha = 0.4;

          ctx.strokeStyle = "black";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.rect(15, y_offset, 32, 32);
          ctx.stroke();

          // "draw item description"
          var desc = obj.item.desc;

          ctx.globalAlpha = 1;
          ctx.fillStyle = "white";

          var lineheight = 15;
          var lines = desc.split("\n");
          if (lines.length > 1) {
            for (var i = 0; i < lines.length; i++) {
              ctx.fillStyle = "black";
              ctx.fillText(lines[i], 65, y_offset + 13 + i * lineheight);
              ctx.fillStyle = "white";
              ctx.fillText(lines[i], 64, y_offset + 12 + i * lineheight);
            }
          } else {
            ctx.fillStyle = "black";
            ctx.fillText(desc, 65, y_offset + 20);
            ctx.fillStyle = "white";
            ctx.fillText(desc, 64, y_offset + 19);
          }

          ctx.restore();
        }

        ctx.fillStyle = "white";
        ctx.fillText("x" + obj.count, 39, y_offset);
        count++;
        y_offset += 48;
      }
    });
  }
}
