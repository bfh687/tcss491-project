class Grid {
  constructor(game, width, height, map) {
    Object.assign(this, { game, width, height, map });
    this.grid = [];
    this.width *= 2;
    this.height *= 2;
    this.nodeSize = 32;
    this.init();
    this.game.grid = this;
    this.hasBeenInit = false;

    // initialize target cell
    const bb = this.game.knight.boundingBox;
    this.targetX = bb.left + (bb.right - bb.left) / 2;
    this.targetY = bb.top + (bb.bottom - bb.top) / 2;

    // initialize target cell
    this.targetCell = getCurrentLocation(this.targetX, this.targetY, this.grid);
  }

  init() {
    // create empty array
    for (var i = 0; i < this.width; i++) {
      if (!this.hasBeenInit) this.grid.push([]);
      for (var j = 0; j < this.height; j++) {
        if (this.grid[i][j] != "Obstacle") this.grid[i][j] = "Empty";
      }
    }

    if (!this.hasBeenInit) {
      for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid[i].length; j++) {
          const width = this.nodeSize;
          const x = (i + 1) * width;
          const y = j * width;

          const bb = new BoundingBox(x, y, width, width);
          this.map.bounding_boxes.forEach((box) => {
            if (bb.collide(box)) {
              const loc = getCurrentLocation(x, y, this.grid);
              this.grid[loc[0]][loc[1]] = "Obstacle";
              //console.log("[" + loc[0] + ", " + loc[1] + "]");
            }
          });
        }
      }
    }

    if (this.targetCell) this.grid[this.targetCell[0]][this.targetCell[1]] = "Goal";

    if (!this.hasBeenInit) this.hasBeenInit = true;
  }

  // updates position of target
  update() {
    var bb = this.game.knight.boundingBox;
    this.targetX = bb.left + (bb.right - bb.left) / 2;
    this.targetY = bb.top + (bb.bottom - bb.top) / 2;

    const newTarget = getCurrentLocation(this.targetX, this.targetY, this.grid);
    if (newTarget != this.targetCell && this.grid[newTarget[0]][newTarget[1]] != "Obstacle") {
      this.grid[this.targetCell[0]][this.targetCell[1]] = "Empty";
      this.targetCell = newTarget;
      this.grid[this.targetCell[0]][this.targetCell[1]] = "Goal";
    }
  }

  draw(ctx) {
    if (params.DEBUG) {
      ctx.save();
      ctx.globalAlpha = 0.4;
      for (var i = 0, x_pos = 32; i < this.width; i++, x_pos += this.nodeSize) {
        for (var j = 0, y_pos = 0; j < this.height; j++, y_pos += this.nodeSize) {
          const node = this.grid[j][i];

          if (node == "Start") {
            ctx.fillStyle = "green";
            ctx.fillRect(x_pos - this.game.camera.x, y_pos - this.game.camera.y, this.nodeSize, this.nodeSize);
          } else if (node == "Goal") {
            ctx.fillStyle = "blue";
            ctx.fillRect(x_pos - this.game.camera.x, y_pos - this.game.camera.y, this.nodeSize, this.nodeSize);
          } else if (node == "Obstacle") {
            ctx.fillStyle = "black";
            ctx.fillRect(x_pos - this.game.camera.x, y_pos - this.game.camera.y, this.nodeSize, this.nodeSize);
          } else {
            ctx.strokeStyle = "grey";
            ctx.strokeRect(x_pos - this.game.camera.x, y_pos - this.game.camera.y, this.nodeSize, this.nodeSize);
          }

          if (j == this.targetCell[0] && i == this.targetCell[1]) {
            ctx.fillStyle = "red";
            ctx.fillRect(x_pos - this.game.camera.x, y_pos - this.game.camera.y, this.nodeSize, this.nodeSize);
          }
        }
      }
      ctx.restore();
    }
  }
}
