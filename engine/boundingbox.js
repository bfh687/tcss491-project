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

  collideLine(x1, y1, x2, y2) {
    return this.lineRect(x1, y1, x2, y2, this.left, this.top, this.width, this.height);
  }

  // http://jeffreythompson.org/collision-detection/line-rect.php
  lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
    const left = this.lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
    const right = this.lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
    const top = this.lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
    const bottom = this.lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

    // if any of the above are true, the line has hit the rectangle
    if (left || right || top || bottom) {
      return true;
    }
    return false;
  }

  lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    // calculate the direction of the lines
    const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
      return true;
    }
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
