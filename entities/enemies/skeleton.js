class Skeleton {
  constructor(game, cluster, x, y) {
    Object.assign(this, { game, cluster, x, y });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/entities/skeleton.png");
    this.animations = [];
    this.loadAnimations();

    this.spawnfx = ASSET_MANAGER.getAsset("./sprites/entities/spawnvfx.png");
    this.spawnAnimation = new Animator(this.spawnfx, 0, 0, 64, 64, 12, 0.06, 0, 0, false, false);

    this.healthAlpha = 1;

    this.scale = this.cluster.scale;

    // skeleton spawn point
    this.originX = this.x;
    this.originY = this.y;

    // states: idle (0), walking (1), attack (2), damaged (3), dying (4)
    this.state = 0;

    // directions: left (0), right (1)
    this.direction = 1;

    // damage number counters
    this.textAnimations = [];

    // bounding box for collisions
    this.updateBoundingBox();
    this.hitBox = null;

    // remove from world
    this.removeFromWorld = false;

    // information about stats + attacking
    this.maxHealth = 400 * this.scale;
    this.health = 400 * this.scale;
    this.attackDamage = 10 * this.scale;

    this.attackCooldown = 1;
    this.damageCooldown = 0.5;

    this.isBleeding = false;
    this.bleedingCooldown = 1;

    this.isStaggerable = true;
    this.staggerCooldown = 3;
    this.staggerDuration = 0.5;

    // information about skeleton movement
    this.aggroDist = 500;
    // 125 + 25 * Math.random()
    this.minSpeed = 125 + 25 * Math.random();
    this.currSpeed = this.minSpeed;

    // misc
    this.alpha = 1;
    this.xpDropped = 270 * this.scale;
  }

  loadAnimations() {
    this.animations.push([], [], [], [], []);

    // idle animations: left, right
    this.animations[0].push(new Animator(this.spritesheet, 0, 0, 64, 64, 4, 0.16, 0, 0, false, true));
    this.animations[0].push(new Animator(this.spritesheet, 0, 320, 64, 64, 4, 0.16, 0, 0, false, true));

    // walking animations: left, right
    this.animations[1].push(new Animator(this.spritesheet, 0, 192, 64, 64, 12, 0.13, 0, 0, false, true));
    this.animations[1].push(new Animator(this.spritesheet, 0, 512, 64, 64, 12, 0.13, 0, 0, false, true));

    // attack animations: left, right
    this.animations[2].push(new Animator(this.spritesheet, 0, 64, 64, 64, 13, 0.09, 0, 0, false, false));
    this.animations[2].push(new Animator(this.spritesheet, 0, 384, 64, 64, 13, 0.09, 0, 0, false, false));

    // damaged animations: left, right
    this.animations[3].push(new Animator(this.spritesheet, 0, 128, 64, 64, 3, 0.08, 0, 0, false, false));
    this.animations[3].push(new Animator(this.spritesheet, 0, 448, 64, 64, 3, 0.08, 0, 0, false, false));

    // death animations: left, right
    this.animations[4].push(new Animator(this.spritesheet, 0, 256, 64, 64, 12, 0.12, 0, 0, false, false));
    this.animations[4].push(new Animator(this.spritesheet, 0, 576, 64, 64, 12, 0.12, 0, 0, false, false));
  }

  update() {
    // update healthbar alpha if skeleton is dead
    if (this.state == 4) {
      this.healthAlpha -= this.game.clockTick;
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

    // enraged !
    if (this.health <= 40) {
      this.currSpeed = 175;
    }

    // if dead, remove from world
    if (this.health <= 0) {
      this.state = 4;
    }

    // handle attacking state + animation
    if (this.state == 2 && !this.animations[this.state][this.direction].isDone()) {
      var curr_frame = this.animations[this.state][this.direction].currentFrame();
      this.updateHitBox();
      return;
    } else if (this.state == 2 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.state = 0;
    }

    // handle damaged state + animation
    else if (this.state == 3 && !this.animations[this.state][this.direction].isDone()) {
      if (this.staggerDuration > 0) {
        return;
      } else {
        this.staggerDuration = 0.5;
      }
    } else if (this.state == 3 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.state = 0;
    }

    // if death animation is playing, let it play out, otherwise remove entity from world
    if (this.state == 4 && !this.animations[this.state][this.direction].isDone()) {
      this.updateHitBox();
      return;
    } else if (this.state == 4 && this.animations[this.state][this.direction].isDone()) {
      // calculate player center
      var center_x = this.boundingBox.left + Math.abs(this.boundingBox.right - this.boundingBox.left) / 2;
      var center_y = this.boundingBox.top + Math.abs(this.boundingBox.top - this.boundingBox.bottom) / 2;

      // drop item on death
      if (Math.floor(Math.random() * 5) === 1) {
        const item = new Item(this.game, center_x, center_y);
        this.game.addEntity(item);
      }

      // increment knight kills on death
      this.game.knight.kills += 1;
      this.game.knight.xpSystem.incrementXP(this.xpDropped);
      this.cluster.aliveMobs--;
      this.removeFromWorld = true;
      return;
    }

    const knightBB = this.game.knight.boundingBox;
    const x1 = knightBB.left + (knightBB.right - knightBB.left) / 2;
    const y1 = knightBB.bottom + (knightBB.top - knightBB.bottom) / 2;

    // calculate skeleton center
    const skeleBB = this.boundingBox;
    const x2 = skeleBB.left + (skeleBB.right - skeleBB.left) / 2;
    const y2 = skeleBB.bottom + (skeleBB.top - skeleBB.bottom) / 2;

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

    // if line collides, pathfind
    if (flag && getDistance(x1, y1, x2, y2) <= this.aggroDist) {
      const bb = this.boundingBox;
      const x = bb.left + (bb.right - bb.left) / 2;
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
      const dir = aStar(location, grid)[0];
      this.game.grid.init();

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
      // calculate distance towards knight
      var dist = getDistance(knight.x, knight.y, this.x, this.y);

      if (dist < this.aggroDist) {
        var xVector = (knight.x - this.x) / dist;
        var yVector = (knight.y - this.y) / dist;

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
        var attackDist = 30;
        if (xVector < 0) attackDist *= -1;

        // get bounding boxes of NEXT tick (assuming no major changes in fps)
        var horizontalBox = new BoundingBox(this.x + 54 + xVector * this.currSpeed * this.game.clockTick + attackDist, this.y + 80, 32, 24);
        var verticalBox = new BoundingBox(this.x + 54, this.y + 80 + yVector * this.currSpeed * this.game.clockTick, 32, 24);

        // check collisions and attack if there would be on on the vertical axis
        if (verticalBox.collide(knight.hurtBox)) {
          yVector = 0;
          if (this.attackCooldown <= 0) {
            this.state = 2;
            this.attackCooldown = 1;
          }
        }

        // check collisions and attack if there would be on on the horizontal axis
        if (horizontalBox.collide(knight.hurtBox)) {
          xVector = 0;
          if (this.attackCooldown <= 0) {
            this.state = 2;
            this.attackCooldown = 1;
          }
        }

        // if not moving, set state to idle
        if (xVector == 0 && yVector == 0) this.state = 0;
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

  bleed() {
    this.health = Math.max(this.health - this.bleedDamage, 0);
    this.textAnimations.push(new TextAnimator(this.bleedDamage, "black", this.game, this));
  }

  deflected(damage) {
    this.textAnimations.push(new TextAnimator(damage, "cyan", this.game, this));
  }

  updateBoundingBox() {
    // looking left
    if (this.direction == 0) {
      this.boundingBox = new BoundingBox(this.x + 54, this.y + 80, 32, 24);
      this.hurtBox = new BoundingBox(this.x + 50, this.y + 32, 32, 66);
    }
    // looking right
    else {
      this.boundingBox = new BoundingBox(this.x + 42, this.y + 80, 32, 24);
      this.hurtBox = new BoundingBox(this.x + 42, this.y + 32, 32, 66);
    }

    this.updateHitBox();
  }

  updateHitBox() {
    var current_frame = this.animations[this.state][this.direction].currentFrame();
    if (this.state == 2) {
      if (current_frame == 4) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x, this.y + 15, 96, 56);
        } else {
          this.hitBox = new BoundingBox(this.x + 32, this.y + 15, 96, 56);
        }
      } else if (current_frame == 5) {
        this.hitBox = new BoundingBox(this.x + 32, this.y + 15, 64, 24);
      } else if (current_frame == 8) {
        this.hitBox = new BoundingBox(this.x, this.y + 32, 128, 48);
      } else if (current_frame == 9) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 64, this.y + 32, 64, 32);
        } else {
          this.hitBox = new BoundingBox(this.x + 4, this.y + 32, 64, 36);
        }
      } else {
        this.hitBox = null;
      }
    } else {
      this.hitBox = null;
    }
  }

  draw(ctx) {
    if (params.DEBUG) {
      // calculate knight center
      const knightBB = this.game.knight.boundingBox;
      const knightX = knightBB.left + (knightBB.right - knightBB.left) / 2;
      const knightY = knightBB.bottom + (knightBB.top - knightBB.bottom) / 2;

      // calculate skeleton center
      const skeleBB = this.boundingBox;
      const skeleX = skeleBB.left + (skeleBB.right - skeleBB.left) / 2;
      const skeleY = skeleBB.bottom + (skeleBB.top - skeleBB.bottom) / 2;

      if (getDistance(knightX, knightY, skeleX, skeleY) < this.aggroDist) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.globalAlpha = 0.2;
        ctx.moveTo(skeleX - this.game.camera.x, skeleY - this.game.camera.y);
        ctx.lineTo(knightX - this.game.camera.x, knightY - this.game.camera.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();
      }
    }

    // draw shadows if not dying
    if (this.state != 4) drawShadow(ctx, this.game, this);

    this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);

    // draw hurt box and bounding box if parameter is on
    if (params.DEBUG) {
      drawBoundingBox(this.boundingBox, ctx, this.game, "white");
      drawBoundingBox(this.hurtBox, ctx, this.game, "red");
      if (this.hitBox) drawBoundingBox(this.hitBox, ctx, this.game, "blue");
    }

    // loop through and print all damage animations
    for (var i = 0; i < this.textAnimations.length; i++) {
      this.textAnimations[i].drawText(ctx);
    }

    this.spawnAnimation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);

    ctx.globalAlpha = this.healthAlpha;
    drawHealthBar(ctx, this.game, this.hurtBox, this.constructor.name, this.health, this.maxHealth);
    ctx.globalAlpha = 1;
  }
}
