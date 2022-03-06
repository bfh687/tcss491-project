class Minion {
  constructor(game, cluster, x, y) {
    Object.assign(this, { game, cluster, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/entities/minion.png");

    this.spawnfx = ASSET_MANAGER.getAsset("./sprites/entities/spawnvfx.png");
    this.spawnAnimation = new Animator(this.spawnfx, 0, 0, 64, 64, 12, 0.06, 0, 0, false, false);

    this.healthAlpha = 1;

    this.scale = this.cluster.scale;

    // eyeball spawn point
    this.originX = this.x;
    this.originY = this.y;

    // init + load animations
    this.textAnimations = [];
    this.animations = [];
    this.loadAnimations();

    // remove from world
    this.removeFromWorld = false;

    // states: idle (0), walking (1), attack (2), roll (3), damaged (4), dying (5)
    this.state = 0;

    // directions: left (0), right (1)
    this.direction = 1;

    // init bounding boxes
    this.updateBoundingBox();

    // information about stats + attacking;
    this.health = 500 * this.scale;
    this.maxHealth = 500 * this.scale;
    this.attackDamage = 15 * this.scale;
    this.attackCooldown = 2;
    this.damageCooldown = 0.5;

    this.isBleeding = false;
    this.bleedingCooldown = 1;

    this.isStaggerable = true;
    this.staggerCooldown = 3;
    this.staggerDuration = 0.5;

    // information about eyeball movement
    this.aggroDist = 500;
    this.minSpeed = 150 + Math.random() * 70;
    this.currSpeed = this.minSpeed;

    // misc
    this.alpha = 1;
    this.xpDropped = 320 * this.scale;
  }

  loadAnimations() {
    this.animations.push([], [], [], [], [], []);

    // idle animations: left, right
    this.animations[0].push(new Animator(this.spritesheet, 0, 110, 177, 22, 5, 0.1, 0, 0, false, true));
    this.animations[0].push(new Animator(this.spritesheet, 0, 0, 177, 22, 5, 0.1, 0, 0, false, true));

    // walking animations: left, right
    this.animations[1].push(new Animator(this.spritesheet, 0, 132, 177, 22, 8, 0.08, 0, 0, false, true));
    this.animations[1].push(new Animator(this.spritesheet, 0, 22, 177, 22, 8, 0.08, 0, 0, false, true));

    // attack animations: left, right CHANGE TO FALSE REPEAT
    this.animations[2].push(new Animator(this.spritesheet, 0, 154, 177, 22, 11, 0.1, 0, 0, false, false));
    this.animations[2].push(new Animator(this.spritesheet, 0, 44, 177, 22, 11, 0.1, 0, 0, false, false));

    // damaged animations: left, right
    this.animations[4].push(new Animator(this.spritesheet, 0, 172, 177, 22, 2, 0.1, 0, 0, false, false));
    this.animations[4].push(new Animator(this.spritesheet, 0, 66, 177, 22, 2, 0.1, 0, 0, false, false));

    // death animations: left, right
    this.animations[5].push(new Animator(this.spritesheet, 0, 194, 177, 22, 5, 0.1, 0, 0, false, false));
    this.animations[5].push(new Animator(this.spritesheet, 0, 88, 177, 22, 5, 0.1, 0, 0, false, false));
  }

  update() {
    // update healthbar alpha if eyeball is dead
    if (this.state == 5) {
      this.healthAlpha -= this.game.clockTick * 3;
      this.healthAlpha = Math.max(0, this.healthAlpha);
    }

    // decrement cooldowns
    if (this.state != 2) {
      this.attackCooldown -= this.game.clockTick;
    }

    if (this.bleedingCooldown > 0) this.bleedingCooldown -= this.game.clockTick;
    if (this.damageCooldown > 0) this.damageCooldown -= this.game.clockTick;

    if (!this.isStaggerable) {
      this.staggerDuration -= this.game.clockTick;
      this.staggerCooldown -= this.game.clockTick;
    }

    if (this.staggerCooldown <= 0) {
      this.isStaggerable = true;
      this.staggerCooldown = 3;
    }

    if (this.isBleeding) {
      if (this.bleedingCooldown <= 0) {
        this.bleed();
        this.bleedingCooldown = 1;
      }
    }

    // if dead, remove from world
    if (this.health <= 0) {
      this.state = 5;
    }

    // handle attacking state + animations
    if (this.state == 2 && !this.animations[this.state][this.direction].isDone()) {
      this.updateBoundingBox();
      return;
    } else if (this.state == 2 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.state = 0;
    }

    // handle damaged state + animations
    else if (this.state == 4 && !this.animations[this.state][this.direction].isDone()) {
      this.updateBoundingBox();
      if (this.staggerDuration > 0) {
        return;
      } else {
        this.staggerDuration = 0.5;
      }
    } else if (this.state == 4 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.state = 0;
    }

    // handle death state + animations
    else if (this.state == 5 && !this.animations[this.state][this.direction].isDone()) {
      return;
    } else if (this.state == 5 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.removeFromWorld = true;
      this.state = 0;

      var center_x = this.boundingBox.left + Math.abs(this.boundingBox.right - this.boundingBox.left) / 2;
      var center_y = this.boundingBox.top + Math.abs(this.boundingBox.top - this.boundingBox.bottom) / 2;

      // drop item on death
      if (Math.floor(Math.random() * 5) === 1) {
        const item = new Item(this.game, center_x, center_y);
        this.game.addEntity(item);
      }

      this.game.knight.xpSystem.incrementXP(this.xpDropped);
      this.game.knight.kills += 1;
      this.cluster.aliveMobs--;
    }

    const knightBB = this.game.knight.boundingBox;
    const x1 = knightBB.left + (knightBB.right - knightBB.left) / 2;
    const y1 = knightBB.bottom + (knightBB.top - knightBB.bottom) / 2;

    // calculate eyeball center
    const minionBB = this.boundingBox;
    const x2 = minionBB.left + (minionBB.right - minionBB.left) / 2;
    const y2 = minionBB.bottom + (minionBB.top - minionBB.bottom) / 2;

    var flag = false;
    this.game.entities.forEach((entity) => {
      if (entity instanceof Map) {
        entity.bounding_boxes.forEach((box) => {
          // check for line collision
          if (box.collideLine(x1, y1, x2, y2)) flag = true;
        });
      } else if (entity instanceof Foilage || entity instanceof Prop) {
        const box = entity.boundingBox;
        if (box.collideLine(x1, y1, x2, y2)) flag = true;
      }
    });

    //if line collides, pathfind
    if (flag && getDistance(x1, y1, x2, y2) <= this.aggroDist) {
      const bb = this.boundingBox;
      const x = bb.left - 32 + (bb.right - bb.left) / 2;
      const y = bb.top + (bb.bottom - bb.top) / 2;
      this.pathfind(x, y);
    }
    // else do basic AI.
    else {
      this.basicAI();
    }
    this.updateBoundingBox();
  }

  pathfind(x, y) {
    if (this.game.grid) {
      const grid = this.game.grid.grid;

      const location = getCurrentLocation(x, y, grid);
      const dirs = aStar(location, grid);
      const dir = dirs[0];
      this.game.grid.init(true);

      if (!dir) this.state = 0;
      else this.state = 1;

      if (dir == "West") {
        this.direction = 0;
        this.x -= this.currSpeed * engine.clockTick;
      } else if (dir == "North") {
        this.y -= this.currSpeed * engine.clockTick;
      } else if (dir == "East") {
        this.direction = 1;
        this.x += this.currSpeed * engine.clockTick;
      } else if (dir == "South") {
        this.y += this.currSpeed * engine.clockTick;
      }
    }
  }

  basicAI() {
    var knight = this.game.knight;

    if (knight) {
      const knightBB = this.game.knight.boundingBox;
      const x1 = knightBB.left + (knightBB.right - knightBB.left) / 2;
      const y1 = knightBB.bottom + (knightBB.top - knightBB.bottom) / 2;

      // calculate eyeball center
      const minionBB = this.boundingBox;
      const x2 = minionBB.left + (minionBB.right - minionBB.left) / 2;
      const y2 = minionBB.bottom + (minionBB.top - minionBB.bottom) / 2;

      // calculate distance towards knight

      var dist = getDistance(x1, y1, x2, y2);

      if (dist < this.aggroDist && this.game.knight.state != 4) {
        var xVector = (x1 - x2) / dist;
        var yVector = (y1 - y2) / dist;

        // set direction based on player location
        if (this.hurtBox.left >= knight.hurtBox.right) {
          this.direction = 0;
        } else if (this.hurtBox.right <= knight.hurtBox.left) {
          this.direction = 1;
        }

        // set state based on vectors towards players
        if (xVector != 0 || yVector != 0) {
          this.state = 1;
        } else {
          this.state = 0;
        }

        // set distance away from the player that the eyeball must be to begin attacking
        var attackDist = 75;
        //if (xVector < 0) attackDist *= -1;

        // get bounding boxes of NEXT tick (assuming no major changes in fps)
        var horizontalBox = new BoundingBox(
          this.x + xVector * this.currSpeed * this.game.clockTick + attackDist,
          this.y + 15,
          177 * 3 - Math.abs(2 * attackDist),
          66 - 30
        );

        // check collisions and attack if there would be on on the horizontal axis
        if (horizontalBox.collide(knight.hurtBox) && this.game.knight.state != 4) {
          xVector = 0;
          if (this.attackCooldown <= 0) {
            this.state = 2;
            this.attackCooldown = 1;
          } else if (Math.abs(yVector) <= 0.03) {
            this.state = 0;
          }
        }

        // if not moving, set state to idle
        if (xVector == 0 && yVector == 0) this.state = 0;

        if (this.state == 2) {
          var path = "./sfx/swish2.mp3";
          var volume = document.getElementById("volume").value;
          ASSET_MANAGER.setVolume(path, (volumes.KNIGHT_ATTACK / 1.6) * volume);
          setTimeout(() => {
            ASSET_MANAGER.playAudio(path);
          }, 320);
          setTimeout(() => {
            ASSET_MANAGER.playAudio(path);
          }, 730);
        }
      }

      // path towards origin/spawn point
      else {
        // calculate distance to spawn point
        var dist = getDistance(this.originX, this.originY, this.x, this.y);

        // calculate vector towards spawn point
        var xVector = (this.originX - this.x) / dist;
        var yVector = (this.originY - this.y) / dist;

        // set direction based on location
        if (xVector >= 0) this.direction = 1;
        else this.direction = 0;

        // set state based on vectors towards spawn point
        if (xVector != 0 || yVector != 0) {
          this.state = 1;
        } else {
          this.state = 0;
        }

        // set idle behavior + direction of skeleton
        if (Math.abs(dist) < 1) {
          xVector = yVector = 0;
          this.state = 0;
          if (this.hurtBox.left >= knight.hurtBox.right) {
            this.direction = 0;
          } else if (this.hurtBox.right <= knight.hurtBox.left) {
            this.direction = 1;
          }
        }
      }
    }

    this.x += xVector * this.currSpeed * this.game.clockTick;
    this.y += yVector * this.currSpeed * this.game.clockTick;
  }

  deflected(damage) {
    this.textAnimations.push(new TextAnimator(damage, "cyan", this.game, this));
  }

  bleed() {
    this.health = Math.max(this.health - this.bleedDamage, 0);
    this.textAnimations.push(new TextAnimator(this.bleedDamage, "black", this.game, this));
  }

  updateBoundingBox() {
    var current_frame = this.animations[this.state][this.direction].currentFrame();
    this.boundingBox = new BoundingBox(this.x + (177 * 3) / 2 - 20, this.y + 40, 40, 20);
    this.hurtBox = new BoundingBox(this.x + (177 * 3) / 2 - 20, this.y + 9, 40, 49);
    this.updateHitBox();
  }

  updateHitBox() {
    var current_frame = this.animations[this.state][this.direction].currentFrame();

    if (this.state != 2) {
      this.hitBox = null;
      return;
    }
    if (current_frame > 5 && current_frame < 9) {
      if (this.direction == 0) {
        this.hitBox = new BoundingBox(this.x + (177 * 3) / 2 + 30 - 91 * 3 - 19, this.y + 9, 235, 49);
      } else {
        this.hitBox = new BoundingBox(this.x + (177 * 3) / 2 + 30, this.y + 9, 235, 49);
      }
    } else {
      this.hitBox = null;
    }
  }

  draw(ctx) {
    // draw shadow
    if (this.state != 5) drawShadow(ctx, this.game, this, 0.5);

    this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);

    for (var i = 0; i < this.textAnimations.length; i++) {
      this.textAnimations[i].drawText(ctx);
    }

    this.spawnAnimation.drawFrame(this.game.clockTick, ctx, this.x + 107 - this.game.camera.x, this.y - 7 - this.game.camera.y, 1.25);

    ctx.globalAlpha = this.healthAlpha;
    drawHealthBar(ctx, this.game, this.boundingBox, this.constructor.name, this.health, this.maxHealth, -33);
    ctx.globalAlpha = 1;

    // draw hurt box and bounding box if parameter is on
    if (params.DEBUG) {
      drawBoundingBox(new BoundingBox(this.x, this.y, 177 * 3, 66), ctx, this.game, "pink");
      drawBoundingBox(this.boundingBox, ctx, this.game, "white");
      drawBoundingBox(this.hurtBox, ctx, this.game, "red");
      if (this.hitBox) drawBoundingBox(this.hitBox, ctx, this.game, "blue");
    }
  }
}
