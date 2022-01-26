/**
 * Draws bounding box to the screen in the given color
 */
const drawBoundingBox = (boundingBox, ctx, game, color) => {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.rect(boundingBox.x - game.camera.x, boundingBox.y - game.camera.y, boundingBox.width, boundingBox.height);
  ctx.stroke();
  ctx.restore();
};
