class Grid {
  constructor(game, width, height, map) {
    Object.assign(this, { game, width, height, map });
    this.grid = [];
    this.width *= 4;
    this.height *= 4;
    this.nodeSize = 16;
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

    if (this.targetCell)
      this.grid[this.targetCell[0]][this.targetCell[1]] = "Goal";
    if (!this.hasBeenInit) this.hasBeenInit = true;
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
        [0, this.nodeSize],
        [0, -this.nodeSize],
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
        const tempTile = getCurrentLocation(x_offset, y_offset, this.grid);

        // get unswapped indicies
        const tempTileX = tempTile[1];
        const tempTileY = tempTile[0];

        // check if obstacle
        if (this.grid[tempTileY][tempTileX] != "Obstacle") {
          // if obstacle, compare center of the tile to center of knight
          const tempTileXCenter =
            tempTileX * this.nodeSize + this.nodeSize / 2 + 32;
          const tempTileYCenter = tempTileY * this.nodeSize + this.nodeSize / 2;

          const dist = getDistance(
            knightX,
            knightY,
            tempTileXCenter,
            tempTileYCenter
          );
          if (dist < min_dist) {
            newTarget = getCurrentLocation(
              tempTileXCenter,
              tempTileYCenter,
              this.grid
            );
            min_dist = dist;
          }
        }
      }
    }

    //console.log(newTarget[0] + " " + newTarget[1]);
    //newTarget X AND Y ARE INVERTED

    // if (newTarget != this.targetCell && this.grid[newTarget[0]][newTarget[1]] == "Obstacle") {
    //   if (this.game.knight.velocity.x == 0) {
    //     const leftTile = {
    //       x: (newTarget[1] - 1) * this.nodeSize + this.nodeSize / 2,
    //       y: newTarget[0] * this.nodeSize + this.nodeSize / 2,
    //     };
    //     const rightTile = {
    //       x: (newTarget[1] + 1) * this.nodeSize + this.nodeSize / 2,
    //       y: newTarget[0] * this.nodeSize + this.nodeSize / 2,
    //     };
    //     const getDistanceLeft = getDistance(leftTile.x, leftTile.y, this.targetX, this.targetY);
    //     const getDistanceRight = getDistance(rightTile.x, rightTile.y, this.targetX, this.targetY);
    //     if (getDistanceLeft < getDistanceRight) {
    //       console.log("Distance Left Closer By: " + (getDistanceRight - getDistanceLeft).toFixed(2));
    //       newTarget = getCurrentLocation(leftTile.y, leftTile.x, this.grid);
    //     } else if (getDistanceLeft > getDistanceRight) {
    //       console.log("Distance Right Closer By: " + (getDistanceLeft - getDistanceRight).toFixed(2));
    //       newTarget = getCurrentLocation(rightTile.y, rightTile.x, this.grid);

    //       console.log("RIGHT DISTANCE SMALLER");
    //     } else {
    //       console.log("EQUAL");
    //     }
    //   } else if (this.game.knight.velocity.y == 0) {
    //   }
    // }

    if (
      newTarget != this.targetCell &&
      this.grid[newTarget[0]][newTarget[1]] != "Obstacle"
    ) {
      this.grid[this.targetCell[0]][this.targetCell[1]] = "Empty";
      this.targetCell = newTarget;
      this.grid[this.targetCell[0]][this.targetCell[1]] = "Goal";
    }
  }
  //   var bb = this.game.knight.boundingBox;
  //   this.targetX = bb.left + (bb.right - bb.left) / 2;
  //   this.targetY = bb.top + (bb.bottom - bb.top) / 2;

  //   var newTarget = getCurrentLocation(this.targetX, this.targetY, this.grid);
  //   if (newTarget != this.targetCell && this.grid[newTarget[0]][newTarget[1]] != "Obstacle") {
  //     this.grid[this.targetCell[0]][this.targetCell[1]] = "Empty";
  //     this.targetCell = newTarget;
  //     this.grid[this.targetCell[0]][this.targetCell[1]] = "Goal";
  //   }

  // get the center of the current cell that the knight is in
  // evaluate all cells around it, if a cell ISNT an obstacle, get the center x/y of that cell
  // compare the distance to the knight.
  // pick the cell closest to the knight.

  draw(ctx) {
    if (params.DEBUG) {
      ctx.save();
      ctx.globalAlpha = 0.4;
      for (var i = 0, x_pos = 32; i < this.width; i++, x_pos += this.nodeSize) {
        for (
          var j = 0, y_pos = 0;
          j < this.height;
          j++, y_pos += this.nodeSize
        ) {
          const node = this.grid[j][i];

          if (node == "Start") {
            ctx.fillStyle = "green";
            ctx.fillRect(
              x_pos - this.game.camera.x,
              y_pos - this.game.camera.y,
              this.nodeSize,
              this.nodeSize
            );
          } else if (node == "Goal") {
            ctx.fillStyle = "blue";
            ctx.fillRect(
              x_pos - this.game.camera.x,
              y_pos - this.game.camera.y,
              this.nodeSize,
              this.nodeSize
            );
          } else if (node == "Obstacle") {
            ctx.fillStyle = "black";
            ctx.fillRect(
              x_pos - this.game.camera.x,
              y_pos - this.game.camera.y,
              this.nodeSize,
              this.nodeSize
            );
          } else {
            ctx.strokeStyle = "grey";
            ctx.strokeRect(
              x_pos - this.game.camera.x,
              y_pos - this.game.camera.y,
              this.nodeSize,
              this.nodeSize
            );
          }

          if (j == this.targetCell[0] && i == this.targetCell[1]) {
            ctx.fillStyle = "red";
            ctx.fillRect(
              x_pos - this.game.camera.x,
              y_pos - this.game.camera.y,
              this.nodeSize,
              this.nodeSize
            );
          }
        }
      }
      ctx.restore();
    }
  }
}
