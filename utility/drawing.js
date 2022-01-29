// draws healthbar to the screen
const drawHealthBar = (ctx, game, hurtBox, name, health, maxHealth) => {
  var width = hurtBox.right - hurtBox.left;
  ctx.save();
  ctx.fillStyle = "white";
  ctx.font = "8px Arial";
  ctx.fillText(name, hurtBox.left - game.camera.x, hurtBox.top - 20 - game.camera.y, width);
  ctx.fillStyle = "black";
  ctx.fillRect(hurtBox.left + 1 - game.camera.x, hurtBox.top - 17 - game.camera.y, width, 3);
  ctx.fillStyle = "red";
  ctx.fillRect(hurtBox.left - game.camera.x, hurtBox.top - 16 - game.camera.y, width, 3);
  ctx.fillStyle = "#32CD32";
  ctx.fillRect(hurtBox.left - game.camera.x, hurtBox.top - 16 - game.camera.y, Math.max(0, health / maxHealth) * width, 3);
  ctx.restore();
};

// draws shadow to the screen
const drawShadow = (ctx, game, entity, scale) => {
  if (!scale) scale = 1;
  ctx.save();

  ctx.globalAlpha = 0.125;
  ctx.fillStyle = "black";

  var x_center = entity.boundingBox.right;
  var y_center = entity.boundingBox.top;
  if (entity instanceof Eyeball) {
    x_center = entity.hurtBox.right;
    y_center = entity.hurtBox.top;
  }

  ctx.beginPath();
  ctx.ellipse(x_center - game.camera.x, y_center - game.camera.y, (25 / 2) * scale, (50 / 2) * scale, Math.PI / 4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
};
