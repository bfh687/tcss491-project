class Grid {
  constructor(game, width, height) {
    Object.assign(this, { game, width, height });
    this.grid = [];
    this.nodeSize = 64;
    this.init();
    this.game.grid = this;

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
      this.grid.push([]);
      for (var j = 0; j < this.height; j++) {
        this.grid[i][j] = "Empty";
      }
    }

    // add obstacle cells
    this.grid[18][7] = "Obstacle";
    this.grid[18][8] = "Obstacle";
    this.grid[18][9] = "Obstacle";
    this.grid[18][10] = "Obstacle";
    this.grid[18][11] = "Obstacle";
    this.grid[18][12] = "Obstacle";
    this.grid[18][13] = "Obstacle";
    this.grid[18][14] = "Obstacle";
    this.grid[17][14] = "Obstacle";
    this.grid[17][15] = "Obstacle";
    this.grid[18][15] = "Obstacle";
    this.grid[19][15] = "Obstacle";

    if (this.targetCell) this.grid[this.targetCell[0]][this.targetCell[1]] = "Goal";
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
