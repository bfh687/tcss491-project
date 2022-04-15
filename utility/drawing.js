// draws healthbar to the screen
const drawHealthBar = (ctx, game, hurtBox, name, health, maxHealth, offset) => {
  const yOffset = offset || 0;
  var width = hurtBox.right - hurtBox.left;
  ctx.save();
  ctx.fillStyle = "white";
  ctx.font = "8px Arial";
  ctx.fillText(name, hurtBox.left - game.camera.x, hurtBox.top - 20 - game.camera.y + yOffset, width);
  ctx.fillStyle = "black";
  ctx.fillRect(hurtBox.left + 1 - game.camera.x, hurtBox.top - 17 - game.camera.y + yOffset, width, 3);
  ctx.fillStyle = "red";
  ctx.fillRect(hurtBox.left - game.camera.x, hurtBox.top - 16 - game.camera.y + yOffset, width, 3);
  ctx.fillStyle = "#32CD32";
  ctx.fillRect(hurtBox.left - game.camera.x, hurtBox.top - 16 - game.camera.y + yOffset, Math.max(0, health / maxHealth) * width, 3);
  ctx.restore();
};

// draws shadow to the screen
const drawShadow = (ctx, game, entity, scale) => {
  if (!scale) scale = 1;
  ctx.save();

  ctx.globalAlpha = 0.125;
  ctx.fillStyle = "black";

  const x_center = entity.boundingBox.right;
  const y_center = entity.boundingBox.top;

  const width = 12.5;
  const height = 25;

  ctx.beginPath();
  ctx.ellipse(x_center - game.camera.x, y_center - game.camera.y, width * scale, height * scale, Math.PI / 4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
};
