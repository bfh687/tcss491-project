class HUD {
  constructor(game, knight) {
    Object.assign(this, { game, knight });
    this.priority = Number.MAX_VALUE - 1;
    this.items = ASSET_MANAGER.getAsset("./sprites/items/items.png");
    this.armor = ASSET_MANAGER.getAsset("./sprites/items/shield.png");
  }

  update() {}

  draw(ctx) {
    // draw boss health bar
    if (this.game.boss) {
      ctx.save();
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      ctx.globalAlpha = 0.5;
      ctx.fillRect(1366 / 2 - 400, 40, 800, 15);

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#e62224";
      ctx.fillRect(1366 / 2 - 400, 40, (Math.max(this.game.boss.health, 0) / this.game.boss.maxHealth) * 800, 15);

      ctx.fillStyle = "black";
      ctx.font = "22px bitpap";
      ctx.globalAlpha = 0.7;

      ctx.fillText("MINOTAUR", 1366 / 2 - ctx.measureText("MINOTAUR").width / 2 + 2, 30 + 2);
      ctx.globalAlpha = 1;

      ctx.fillStyle = "white";
      ctx.fillText("MINOTAUR", 1366 / 2 - ctx.measureText("MINOTAUR").width / 2, 30);

      ctx.fillStyle = "black";
      ctx.font = "15px bitpap";
      ctx.globalAlpha = 0.7;

      const health = Math.max(Math.floor(this.game.boss.health), 0) + "/" + this.game.boss.maxHealth;
      ctx.fillText(health, 1366 / 2 - ctx.measureText(health).width / 2 + 1, 52 + 1);
      ctx.globalAlpha = 1;

      ctx.fillStyle = "white";
      ctx.fillText(health, 1366 / 2 - ctx.measureText(health).width / 2, 52);

      ctx.restore();
    }

    // get time
    ctx.save();
    var minutes = Math.floor(this.game.timer.gameTime / 60);
    var seconds = Math.floor(this.game.timer.gameTime % 60);
    var time = minutes + ":";
    if (seconds < 10) time += "0";
    time += seconds;

    // fps counter
    ctx.font = "16px bitpap";
    ctx.fillStyle = "white";
    ctx.fillText("FPS: " + Math.round(1.0 / this.game.clockTick), 15, 25);
    ctx.fillText(time, 70, 25);
    ctx.fillText("SP: " + this.game.knight.xpSystem.skillPoints, 15, 45);
    ctx.restore();

    // armor
    ctx.save();
    ctx.drawImage(this.armor, 0, 0, 32, 32, 400, ctx.canvas.height - 130, 56, 56);

    ctx.globalAlpha = 1;
    ctx.font = "22px impact";

    var text = ((1 - this.knight.armor) * 100).toFixed(0);
    ctx.font = "22px impact";
    ctx.fillStyle = "white";
    ctx.fillText(text, 429 - ctx.measureText(text).width / 2, ctx.canvas.height - 125 + 30, 28);

    ctx.fillStyle = "black";
    ctx.fillText(text, 428 - ctx.measureText(text).width / 2, ctx.canvas.height - 125 + 30, 30);
    let x = 5;
    x.toString();
    ctx.restore();

    // xp bar
    var width = 250;
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.font = "14px impact";
    ctx.fillStyle = "black";
    ctx.fillText("L V L   " + this.knight.xpSystem.currLevel, 27 + 20, 712 - 20 + 33, 120);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.font = "14px impact";
    ctx.fillText("L V L   " + this.knight.xpSystem.currLevel, 25 + 20, 710 - 20 + 33, 120);
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "black";
    ctx.fillText("L V L   " + this.knight.xpSystem.currLevel, 27 + 20, 712 - 20 + 33, 120);
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
