// draws bounding box to the screen
const drawBoundingBox = (boundingBox, ctx, game, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.25;
  ctx.fillRect(boundingBox.x - game.camera.x, boundingBox.y - game.camera.y, boundingBox.width, boundingBox.height);
  ctx.restore();
};

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
const drawShadow = (ctx, game, entity) => {
  ctx.save();

  ctx.globalAlpha = 0.125;
  ctx.fillStyle = "black";

  var x_center = entity.boundingBox.right;
  var y_center = entity.boundingBox.top;

  ctx.beginPath();
  ctx.ellipse(x_center - game.camera.x, y_center - game.camera.y, 25 / 2, 50 / 2, Math.PI / 4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
};
