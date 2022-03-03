class Grid {
  constructor(game, entity, width, height) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.grid = [];
    this.nodeSize = 64;
    this.init();
    this.entity = entity;

    // initialize start cell
    var bb = this.entity.boundingBox;
    this.startX = bb.left + (bb.right - bb.left) / 2;
    this.startY = bb.top + (bb.bottom - bb.top) / 2;

    this.startCell = getCurrentLocation(this.startX, this.startY, this.grid);

    // initialize target cell
    bb = this.game.knight.boundingBox;
    this.targetX = bb.left + (bb.right - bb.left) / 2;
    this.targetY = bb.top + (bb.bottom - bb.top) / 2;

    this.targetCell = getCurrentLocation(this.targetX, this.targetY, this.grid);
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

  update() {
    var bb = this.game.knight.boundingBox;
    this.targetX = bb.left + (bb.right - bb.left) / 2;
    this.targetY = bb.top + (bb.bottom - bb.top) / 2;

    const newTarget = getCurrentLocation(this.targetX, this.targetY, this.grid);
    if (newTarget != this.targetCell && this.grid[this.targetCell[0]][this.targetCell[1]] != "Obstacle")
      this.grid[this.targetCell[0]][this.targetCell[1]] = "Empty";
    this.targetCell = newTarget;

    bb = this.entity.boundingBox;
    this.startX = bb.left + (bb.right - bb.left) / 2;
    this.startY = bb.top + (bb.bottom - bb.top) / 2;

    const newStart = getCurrentLocation(this.startX, this.startY, this.grid);
    if (newStart != this.startCell && this.grid[this.startCell[0]][this.startCell[1]] != "Obstacle")
      this.grid[this.startCell[0]][this.startCell[1]] = "Empty";
    this.startCell = newStart;

    this.init(this.startCell, this.targetCell);

    const dir = aStar(this.startCell, this.grid)[0];
    if (dir == "West") {
      this.entity.direction = 0;
      this.entity.x -= this.entity.currSpeed * engine.clockTick;
    } else if (dir == "North") {
      this.entity.y -= this.entity.currSpeed * engine.clockTick;
    } else if (dir == "East") {
      this.entity.direction = 1;
      this.entity.x += this.entity.currSpeed * engine.clockTick;
    } else if (dir == "South") {
      this.entity.y += this.entity.currSpeed * engine.clockTick;
    }
    this.entity.updateBoundingBox();

    // rebuild grid, eventually change to load from json of grid and just reassign target and start every time
    //this.init(startPosition, this.targetCell);
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
        if (j == this.startCell[0] && i == this.startCell[1]) {
          ctx.fillStyle = "orange";
          ctx.fillRect(x_pos - this.game.camera.x, y_pos - this.game.camera.y, this.nodeSize, this.nodeSize);
        }
      }
    }
    ctx.restore();
  }
}
