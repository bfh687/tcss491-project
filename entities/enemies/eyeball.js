class Eyeball {
  constructor(game, cluster, x, y) {
    Object.assign(this, { game, cluster, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/entities/eyeball.png");

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
    this.health = 100 * this.scale;
    this.maxHealth = 100 * this.scale;
    this.attackDamage = 15 * this.scale;
    this.attackCooldown = 2;
    this.damageCooldown = 0.05;

    this.isBleeding = false;
    this.bleedingCooldown = 1;

    this.isStaggerable = true;
    this.staggerCooldown = 3;
    this.staggerDuration = 0.5;

    // information about eyeball movement
    this.aggroDist = 500;
    this.minSpeed = 100 + Math.random() * 50;
    this.currSpeed = this.minSpeed;

    // misc
    this.alpha = 1;
    this.xpDropped = 320 * this.scale;
  }

  loadAnimations() {
    this.animations.push([], [], [], [], [], []);

    // idle animations: left, right
    this.animations[0].push(new Animator(this.spritesheet, 0, 0, 195, 48, 8, 0.12, 0, 0, false, true));
    this.animations[0].push(new Animator(this.spritesheet, 0, 288, 195, 48, 8, 0.12, 0, 0, false, true));

    // walking animations: left, right
    this.animations[1].push(new Animator(this.spritesheet, 0, 48, 195, 48, 8, 0.16, 0, 0, false, true));
    this.animations[1].push(new Animator(this.spritesheet, 0, 336, 195, 48, 8, 0.16, 0, 0, false, true));

    // attack animations: left, right
    this.animations[2].push(new Animator(this.spritesheet, 0, 96, 195, 48, 18, 0.05, 0, 0, false, false));
    this.animations[2].push(new Animator(this.spritesheet, 0, 384, 195, 48, 18, 0.05, 0, 0, false, false));

    // roll animations: left, right
    this.animations[3].push(new Animator(this.spritesheet, 0, 144, 195, 48, 11, 0.1, 0, 0, false, true));
    this.animations[3].push(new Animator(this.spritesheet, 0, 432, 195, 48, 11, 0.1, 0, 0, false, true));

    // damaged animations: left, right
    this.animations[4].push(new Animator(this.spritesheet, 0, 192, 195, 48, 4, 0.1, 0, 0, false, false));
    this.animations[4].push(new Animator(this.spritesheet, 0, 480, 195, 48, 4, 0.1, 0, 0, false, false));

    // death animations: left, right
    this.animations[5].push(new Animator(this.spritesheet, 0, 240, 195, 48, 8, 0.1, 0, 0, false, false));
    this.animations[5].push(new Animator(this.spritesheet, 0, 528, 195, 48, 8, 0.1, 0, 0, false, false));
  }

  update() {
    // update healthbar alpha if eyeball is dead
    if (this.state == 5) {
      this.healthAlpha -= this.game.clockTick * 1.5;
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
    const eyeBB = this.boundingBox;
    const x2 = eyeBB.left + (eyeBB.right - eyeBB.left) / 2;
    const y2 = eyeBB.bottom + (eyeBB.top - eyeBB.bottom) / 2;

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

  deflected(damage) {
    this.textAnimations.push(new TextAnimator(damage, "cyan", this.game, this));
  }

  bleed() {
    this.health = Math.max(this.health - this.bleedDamage, 0);
    this.textAnimations.push(new TextAnimator(this.bleedDamage, "black", this.game, this));
  }

  pathfind(x, y) {
    if (this.game.grid) {
      const grid = this.game.grid.grid;

      const location = getCurrentLocation(x, y, grid);
      const dir = aStar(location, grid)[0];
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
      // calculate center position of knight
      var knight_x = knight.hurtBox.left + (knight.hurtBox.right - knight.hurtBox.left) / 2;
      var knight_y = knight.hurtBox.top + (knight.hurtBox.bottom - knight.hurtBox.top) / 2;

      // calculate center position of eyeball
      var eyeball_x = this.hurtBox.left + (this.hurtBox.right - this.hurtBox.left) / 2;
      var eyeball_y = this.hurtBox.top + (this.hurtBox.bottom - this.hurtBox.top) / 2;

      // calculate distance between eyeball and knight
      var dist = getDistance(knight_x, knight_y, eyeball_x, eyeball_y);

      // path towards player
      if (dist < this.aggroDist) {
        // calculate vector towards player
        var xVector = (knight_x - eyeball_x - 50) / dist;

        var yVector = (knight_y - eyeball_y) / dist;

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
        var attackDist = -50;
        if (xVector < 0) attackDist *= -1;

        // get bounding boxes of NEXT tick (assuming no major changes in fps)
        var horizontalBox = new BoundingBox(this.x + xVector * this.currSpeed * this.game.clockTick + attackDist, this.y, 195 * 1.5, 48);
        var verticalBox = new BoundingBox(this.hurtBox.left, this.hurtBox.top + yVector * this.currSpeed * this.game.clockTick, 20, 23);

        // check collisions and attack if there would be on on the horizontal axis
        if (verticalBox.collide(knight.boundingBox) && this.boundingBox.top > knight.hurtBox.top && this.hurtBox.bottom < knight.hurtBox.bottom) {
          yVector = 0;
        } else if (horizontalBox.collide(knight.hurtBox) && this.boundingBox.top > knight.hurtBox.top) {
          if (this.attackCooldown <= 0) {
            this.attackCooldown = 2;
            this.state = 2;
          }
          xVector = 0;
        }

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

        // set idle behavior + direction of eyeball
        if (Math.abs(dist) < 1) {
          xVector = yVector = 0;
          this.state = 0;
          this.direction = 1;
        }
      }
    }
    this.x += xVector * this.currSpeed * this.game.clockTick;
    this.y += yVector * this.currSpeed * this.game.clockTick;
  }

  updateBoundingBox() {
    var current_frame = this.animations[this.state][this.direction].currentFrame();
    if (this.state == 0) {
      this.hurtBox = new BoundingBox(this.x + 137, this.y + 27, 20, 22);
    } else if (this.state == 1) {
      this.hurtBox = new BoundingBox(this.x + 195 - 58, this.y + 25, 20, 23);
    } else if (this.state == 2) {
      if (this.direction == 0) {
        if (current_frame < 9) {
          this.hurtBox = new BoundingBox(this.x - 34 + 195 - 24, this.y + 26, 20, 22);
        } else if (current_frame == 9) {
          this.hurtBox = new BoundingBox(this.x - 32 + 195 - 24, this.y + 24, 20, 22);
        } else if (current_frame == 10) {
          this.hurtBox = new BoundingBox(this.x - 23 + 195 - 24, this.y + 26, 20, 22);
        } else if (current_frame == 11) {
          this.hurtBox = new BoundingBox(this.x - 16 + 195 - 24, this.y + 26, 20, 22);
        } else if (current_frame == 12) {
          this.hurtBox = new BoundingBox(this.x - 14 + 195 - 24, this.y + 26, 20, 22);
        } else if (current_frame == 13) {
          this.hurtBox = new BoundingBox(this.x - 13 + 195 - 24, this.y + 26, 20, 22);
        } else if (current_frame == 14) {
          this.hurtBox = new BoundingBox(this.x - 13 + 195 - 24, this.y + 26, 20, 22);
        } else if (current_frame == 15) {
          this.hurtBox = new BoundingBox(this.x - 20 + 195 - 24, this.y + 26, 20, 22);
        } else if (current_frame == 16) {
          this.hurtBox = new BoundingBox(this.x - 26 + 195 - 24, this.y + 26, 20, 22);
        } else if (current_frame == 17) {
          this.hurtBox = new BoundingBox(this.x - 30 + 195 - 24, this.y + 26, 20, 22);
        }
      } else {
        if (current_frame < 9) {
          this.hurtBox = new BoundingBox(this.x + 34 + 100, this.y + 26, 24, 24);
        } else if (current_frame == 9) {
          this.hurtBox = new BoundingBox(this.x + 32 + 100, this.y + 24, 24, 26);
        } else if (current_frame == 10) {
          this.hurtBox = new BoundingBox(this.x + 23 + 100, this.y + 26, 24, 24);
        } else if (current_frame == 11) {
          this.hurtBox = new BoundingBox(this.x + 16 + 100, this.y + 26, 24, 24);
        } else if (current_frame == 12) {
          this.hurtBox = new BoundingBox(this.x + 14 + 100, this.y + 26, 24, 24);
        } else if (current_frame == 13) {
          this.hurtBox = new BoundingBox(this.x + 13 + 100, this.y + 26, 24, 24);
        } else if (current_frame == 14) {
          this.hurtBox = new BoundingBox(this.x + 13 + 100, this.y + 26, 24, 24);
        } else if (current_frame == 15) {
          this.hurtBox = new BoundingBox(this.x + 20 + 100, this.y + 26, 24, 24);
        } else if (current_frame == 16) {
          this.hurtBox = new BoundingBox(this.x + 26 + 100, this.y + 26, 24, 24);
        } else if (current_frame == 17) {
          this.hurtBox = new BoundingBox(this.x + 30 + 100, this.y + 26, 24, 24);
        }
      }
    } else if (this.state == 3) {
      this.hurtBox = new BoundingBox(this.x + 135, this.y + 26, 24, 24);
    } else if (this.state == 4) {
      this.hurtBox = new BoundingBox(this.x + 137, this.y + 26, 20, 22);
    } else if (this.state == 5) {
      this.hurtBox = null;
      this.boundingBox = null;
    }

    // update bounding box if not attacking
    if (this.hurtBox && this.state != 2) {
      this.boundingBox = new BoundingBox(this.hurtBox.left, this.hurtBox.top + 10, 20, 23);
    }
    this.updateHitBox();
  }

  updateHitBox() {
    var current_frame = this.animations[this.state][this.direction].currentFrame();
    if (this.state == 2 && current_frame >= 9 && current_frame <= 13) {
      if (this.direction == 0) {
        if (current_frame == 9) {
          this.hitBox = new BoundingBox(this.x - 45 + 195 - 50, this.y + 13, 48, 36);
        } else if (current_frame == 10) {
          this.hitBox = new BoundingBox(this.x - 47 + 195 - 110, this.y + 8, 110, 40);
        } else if (current_frame == 11) {
          this.hitBox = new BoundingBox(this.x - 52 + 195 - 110, this.y + 8, 90, 40);
        } else if (current_frame == 12) {
          this.hitBox = new BoundingBox(this.x - 52 + 195 - 110, this.y + 8, 40, 40);
        } else if (current_frame == 13) {
          this.hitBox = new BoundingBox(this.x - 54 + 195 - 110, this.y + 8, 20, 40);
        }
      } else if (this.direction == 1) {
        if (current_frame == 9) {
          this.hitBox = new BoundingBox(this.x + 45 + 50 + 50, this.y + 13, 48, 36);
        } else if (current_frame == 10) {
          this.hitBox = new BoundingBox(this.x + 45 + 50 + 50, this.y + 8, 110, 40);
        } else if (current_frame == 11) {
          this.hitBox = new BoundingBox(this.x + 45 + 50 + 72, this.y + 8, 90, 40);
        } else if (current_frame == 12) {
          this.hitBox = new BoundingBox(this.x + 45 + 50 + 125, this.y + 8, 40, 40);
        } else if (current_frame == 13) {
          this.hitBox = new BoundingBox(this.x + 45 + 50 + 145, this.y + 8, 20, 40);
        }
      }
    } else {
      this.hitBox = null;
    }
  }

  draw(ctx) {
    // draw shadow
    if (this.state != 5) drawShadow(ctx, this.game, this, 0.5);

    this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.5);

    if (params.DEBUG) {
      if (this.hitBox) drawBoundingBox(this.hitBox, ctx, this.game, "blue");
      drawBoundingBox(this.boundingBox, ctx, this.game, "white");
      drawBoundingBox(this.hurtBox, ctx, this.game, "red");

      const knightBB = this.game.knight.boundingBox;
      const knightX = knightBB.left + (knightBB.right - knightBB.left) / 2;
      const knightY = knightBB.bottom + (knightBB.top - knightBB.bottom) / 2;

      // calculate skeleton center
      const eyballBB = this.boundingBox;
      const eyeballX = eyballBB.left + (eyballBB.right - eyballBB.left) / 2;
      const eyeballY = eyballBB.bottom + (eyballBB.top - eyballBB.bottom) / 2;

      if (getDistance(knightX, knightY, eyeballX, eyeballY) < this.aggroDist) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.globalAlpha = 0.2;
        ctx.moveTo(eyeballX - this.game.camera.x, eyeballY - this.game.camera.y);
        ctx.lineTo(knightX - this.game.camera.x, knightY - this.game.camera.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();
      }
    }

    for (var i = 0; i < this.textAnimations.length; i++) {
      this.textAnimations[i].drawText(ctx);
    }

    this.spawnAnimation.drawFrame(this.game.clockTick, ctx, this.x + 107 - this.game.camera.x, this.y - 7 - this.game.camera.y, 1.25);

    ctx.globalAlpha = this.healthAlpha;
    drawHealthBar(ctx, this.game, this.boundingBox, this.constructor.name, this.health, this.maxHealth);
    ctx.globalAlpha = 1;
  }
}
