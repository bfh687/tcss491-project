class HUD {
  constructor(game, knight) {
    Object.assign(this, { game, knight });
    this.priority = Number.MAX_VALUE - 1;
    this.items = ASSET_MANAGER.getAsset("./sprites/items/items.png");
  }

  update() {}

  draw(ctx) {
    // get time
    var minutes = Math.floor(this.game.timer.gameTime / 60);
    var seconds = Math.floor(this.game.timer.gameTime % 60);
    var time = minutes + ":";
    if (seconds < 10) time += "0";
    time += seconds;

    // fps counter
    // ctx.fillText("FPS: " + Math.round(1.0 / this.game.clockTick), 20, 150);
    // ctx.restore();

    // xp bar
    var width = 250;
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.font = "14px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("LVL " + this.knight.xpSystem.currLevel, 27 + 20, 712 - 20 + 33, 100);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText("LVL " + this.knight.xpSystem.currLevel, 25 + 20, 710 - 20 + 33, 100);
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "black";
    ctx.fillText("LVL " + this.knight.xpSystem.currLevel, 27 + 20, 712 - 20 + 33, 100);
    ctx.fillRect(125 + 1 + 20, 720 - 20 - 17 + 33, width, 4);
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "black";
    ctx.fillRect(125 + 20, 720 - 16 - 20 + 33, width, 4);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#91fdeb";
    ctx.fillRect(125 + 20, 720 - 16 - 20 + 33, Math.max(0, this.knight.xpSystem.currXP / this.knight.xpSystem.xpNeeded) * width, 4);
    ctx.restore();

    // health bar width
    var width = 350;

    // draw health bar
    ctx.save();
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(25 + 20, 694 - 20, width, 15);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#e84142";
    ctx.fillRect(25 + 20, 694 - 20, (this.knight.health / this.knight.maxHealth) * width, 15);
    ctx.restore();

    // draw divider
    ctx.save();
    ctx.globalAlpha = 0.33;
    ctx.fillStyle = "white";
    ctx.fillRect(25 + 20, 695 + 25 - 20, width, 1);
    ctx.restore();

    // draw health text shadows
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.font = "34px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(Math.round(this.knight.health), 25 + 20, 717 - 20 - 30);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#e84142";
    ctx.fillText(Math.round(this.knight.health), 23 + 20, 715 - 20 - 30, width);

    // draw health text foreground
    var healthWidth = ctx.measureText(Math.round(this.knight.health)).width + 5;
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "black";
    ctx.font = "22px Arial";
    ctx.fillText("/ " + this.knight.maxHealth, 25 + 20 + healthWidth, 717 - 20 - 30);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.font = "22px Arial";
    ctx.fillText("/ " + this.knight.maxHealth, 23 + 20 + healthWidth, 715 - 20 - 30, width);

    ctx.restore();

    // draw items
    var x_offset = 154;
    var count = 0;

    // create bounding box for the cursor
    var mouseBox = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);

    // draw item hud and show description on cursor hover
    this.knight.items.forEach((obj) => {
      if (obj.count > 0) {
        // draw item and make bounding box for the current item
        ctx.drawImage(this.items, obj.item.x, obj.item.y, 32, 32, x_offset, ctx.canvas.height - 126, 29, 29);
        var itemBox = new BoundingBox(x_offset, ctx.canvas.height - 126, 29, 29);

        ctx.fillStyle = "black";
        ctx.fillText("x" + obj.count, x_offset + 17, ctx.canvas.height - 117);
        ctx.fillStyle = "white";
        ctx.fillText("x" + obj.count, x_offset + 16, ctx.canvas.height - 118);

        // // set hover color
        if (mouseBox.collide(itemBox)) {
          // outline hovered item
          ctx.save();

          // "draw item description"
          var desc = obj.item.desc;

          ctx.globalAlpha = 1;
          ctx.fillStyle = "white";

          var lineheight = 15;
          var lines = desc.split("\n");
          var y_offset = lines.length * 15;

          if (lines.length > 1) {
            for (var i = 0; i < lines.length; i++) {
              var y_offset = ctx.canvas.height - 134 - (lines.length - 1 - i) * lineheight;

              ctx.fillStyle = "black";
              ctx.fillText(lines[i], 158, y_offset + 1);
              ctx.fillStyle = "white";
              ctx.fillText(lines[i], 158, y_offset);
            }
          } else {
            ctx.fillStyle = "black";
            ctx.fillText(desc, 158, ctx.canvas.height - 134);
            ctx.fillStyle = "white";
            ctx.fillText(desc, 158, ctx.canvas.height - 135);
          }

          ctx.restore();
        }

        count++;
        x_offset += 30;
      }
    });
  }
}
