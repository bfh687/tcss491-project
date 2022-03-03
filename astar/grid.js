class Grid {
  constructor(game, width, height) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.grid = [];
    this.nodeSize = 64;
    this.init();
  }

  init(startPosition, endPosition) {
    for (var i = 0; i < this.width; i++) {
      this.grid.push([]);
      for (var j = 0; j < this.height; j++) {
        this.grid[i][j] = "Empty";
      }
    }

    if (startPosition) {
      this.grid[startPosition[0]][startPosition[1]] = "Start";
    } else {
      this.grid[0][0] = "Start";
    }

    if (endPosition) {
      this.grid[endPosition[0]][endPosition[1]] = "Goal";
    } else {
      this.grid[3][3] = "Goals";
    }

    //this.grid[0][0] = "Obstacle";
    this.grid[14][15] = "Obstacle";
    this.grid[15][15] = "Obstacle";
    this.grid[15][16] = "Obstacle";
    this.grid[14][16] = "Obstacle";
  }

  update() {}

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
      }
    }
    ctx.restore();
  }
}
