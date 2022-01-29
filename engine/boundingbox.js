class BoundingBox {
  constructor(x, y, width, height) {
    Object.assign(this, { x, y, width, height });

    this.left = x;
    this.top = y;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  collide(oth) {
    if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
    return false;
  }
}

// draws bounding box to the screen
const drawBoundingBox = (boundingBox, ctx, game, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.25;
  ctx.fillRect(boundingBox.x - game.camera.x, boundingBox.y - game.camera.y, boundingBox.width, boundingBox.height);
  ctx.restore();
};
