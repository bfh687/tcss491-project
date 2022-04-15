class Grid {
  constructor(game, width, height, map) {
    Object.assign(this, { game, width, height, map });
    this.grid = [];
    this.nodeSize = 32;
    this.init(false);
    this.game.grid = this;
    this.hasBeenInit = false;

    // initialize target cell
    const bb = this.game.knight.boundingBox;
    this.targetX = bb.left + (bb.right - bb.left) / 2;
    this.targetY = bb.top + (bb.bottom - bb.top) / 2;
    this.targetCell = getCurrentLocation(this.targetX, this.targetY, this.grid);
  }

  init(isInit) {
    // create empty array
    for (var i = 0; i < this.width; i++) {
      if (!isInit) {
        this.grid.push([]);
        for (var j = 0; j < this.height; j++) {
          this.grid[i].push("Empty");
        }
      } else {
        for (var j = 0; j < this.height; j++) {
          if (this.grid[i][j] != "Obstacle") this.grid[i][j] = "Empty";
        }
      }
    }

    if (!isInit) {
      for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid[i].length; j++) {
          const width = this.nodeSize;
          const x = (i + 1) * width;
          const y = j * width;

          const bb = new BoundingBox(x, y, width, width);

          this.map.bounding_boxes.forEach((box) => {
            if (bb.collide(box)) {
              const loc = getCurrentLocation(x + 27, y, this.grid);
              this.grid[loc[0]][loc[1]] = "Obstacle";
            }
          });

          this.game.entities.forEach((entity) => {
            if (entity instanceof Shop || entity instanceof Prop || entity instanceof Sign || entity instanceof Foilage) {
              if (bb.collide(entity.boundingBox)) {
                const loc = getCurrentLocation(x + 27, y, this.grid);
                this.grid[loc[0]][loc[1]] = "Obstacle";
              }
            }
          });
        }
      }
    }

    if (this.targetCell) this.grid[this.targetCell[0]][this.targetCell[1]] = "Goal";
  }

  // updates position of target
  update() {
    var bb = this.game.knight.boundingBox;
    this.targetX = bb.left + (bb.right - bb.left) / 2;
    this.targetY = bb.top + (bb.bottom - bb.top) / 2;

    var newTarget = getCurrentLocation(this.targetX, this.targetY, this.grid);

    // get i and j of current tile
    const x = newTarget[1];
    const y = newTarget[0];

    if (this.grid[y][x] == "Obstacle") {
      // calculate center points of the tile
      const tileX = x * this.nodeSize + this.nodeSize / 2;
      const tileY = y * this.nodeSize + this.nodeSize / 2;

      // get directions to add onto x and y
      const dirs = [
        [this.nodeSize, 0],
        [-this.nodeSize, 0],
      ];

      var min_dist = +Infinity;

      // for every direction, explore the tile
      for (var i = 0; i < dirs.length; i++) {
        // capture knight x/y
        const knightX = this.targetX;
        const knightY = this.targetY;

        // capture dir x/y
        const dirX = dirs[i][0];
        const dirY = dirs[i][1];

        const x_offset = tileX + dirX;
        const y_offset = tileY + dirY;

        // create new temp tiles for each direction around the current tile and check if its an obstacle
        const tempTile = getCurrentLocation(x_offset + 32, y_offset, this.grid);

        // get unswapped indicies
        const tempTileX = tempTile[1];
        const tempTileY = tempTile[0];

        // check if obstacle
        if (this.grid[tempTileY][tempTileX] != "Obstacle") {
          // if obstacle, compare center of the tile to center of knight
          const tempTileXCenter = tempTileX * this.nodeSize + this.nodeSize / 2 + 32;
          const tempTileYCenter = tempTileY * this.nodeSize + this.nodeSize / 2;

          const dist = getDistance(knightX, knightY, tempTileXCenter, tempTileYCenter);
          if (dist < min_dist) {
            newTarget = getCurrentLocation(tempTileXCenter, tempTileYCenter, this.grid);
            min_dist = dist;
          }
        }
      }
    }

    if (newTarget != this.targetCell && this.grid[newTarget[0]][newTarget[1]] != "Obstacle") {
      this.grid[this.targetCell[0]][this.targetCell[1]] = "Empty";
      this.targetCell = newTarget;
      this.grid[this.targetCell[0]][this.targetCell[1]] = "Goal";
    }
  }

  draw(ctx) {
    // draw nothing
  }
}
