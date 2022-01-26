class Skeleton {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/skeleton.png");
    this.animations = [];
    this.loadAnimations();

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

    // information about stats
    this.maxHealth = 100;
    this.health = 100;
    this.attackDamage = 0;

    // information about attacking
    this.isAttacking = false;
    this.attackCooldown = 1;

    // information about skeleton movement
    this.aggroDist = 250;
    this.minSpeed = 125 + 25 * Math.random();
    this.currSpeed = this.minSpeed;

    // misc
    this.alpha = 1;
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
    // decrement cooldowns
    if (this.state != 2) {
      this.attackCooldown -= this.game.clockTick;
    }

    // enraged !
    if (this.health <= 40) {
      this.currSpeed = 175;
    }

    // if dead, remove from world
    if (this.health <= 0) {
      this.state = 4;
    }

    // if death animation is playing, let it play out, otherwise remove entity from world
    if (this.state == 4 && !this.animations[this.state][this.direction].isDone()) {
      return;
    } else if (this.state == 4 && this.animations[this.state][this.direction].isDone()) {
      // drop item on death

      // calculate player center
      var center_x = this.boundingBox.left + Math.abs(this.boundingBox.right - this.boundingBox.left) / 2;
      var center_y = this.boundingBox.top + Math.abs(this.boundingBox.top - this.boundingBox.bottom) / 2;

      if (Math.floor(Math.random()) + 1 === 1) {
        const item = new Item(this.game, center_x, center_y);
        this.game.addEntity(item);
      }

      this.removeFromWorld = true;
      return;
    }

    // if damaged animation is playing, let it play out, otherwise go back to idle
    else if (this.state == 3 && !this.animations[this.state][this.direction].isDone()) {
      return;
    } else if (this.state == 3 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.state = 0;
    }

    // if attacking animation is playing, let it play out, otherwise go back to idle
    else if (this.state == 2 && !this.animations[this.state][this.direction].isDone()) {
      var curr_frame = this.animations[this.state][this.direction].currentFrame();
      this.updateHitBox(curr_frame);
      return;
    } else if (this.state == 2 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.state = 0;
    }

    // attraction towards knight (player)
    var knight;
    for (var i = 0; i < this.game.entities.length; i++) {
      if (this.game.entities[i] instanceof Knight) {
        knight = this.game.entities[i];
        break;
      }
    }

    // should always be a player, double check just in case
    if (knight) {
      // calculate unit vector towards knight
      var dist = getDistance(knight.x, knight.y, this.x, this.y);
      // aggro distance
      if (knight && dist < this.aggroDist) {
        var xVector = (knight.x - this.x) / dist;
        var yVector = (knight.y - this.y) / dist;

        if (xVector >= 0) this.direction = 1;
        else this.direction = 0;

        if (xVector != 0 || yVector != 0) {
          this.state = 1;
        } else {
          this.state = 0;
        }

        var attackDist = 30;
        if (xVector < 0) attackDist *= -1;

        var horizontalBox = new BoundingBox(this.x + 54 + xVector * this.currSpeed * this.game.clockTick + attackDist, this.y + 80, 32, 24);

        var verticalBox = new BoundingBox(this.x + 54, this.y + 80 + yVector * this.currSpeed * this.game.clockTick, 32, 24);

        if (verticalBox.collide(knight.hurtBox)) {
          yVector = 0;
          if (this.attackCooldown <= 0) {
            this.state = 2;
            this.attackCooldown = 1;
          }
        }
        if (horizontalBox.collide(knight.hurtBox)) {
          xVector = 0;
          if (this.attackCooldown <= 0) {
            this.state = 2;
            this.attackCooldown = 1;
          }
        }
      } else {
        var dist = getDistance(this.originX, this.originY, this.x, this.y);
        var xVector = (this.originX - this.x) / dist;
        var yVector = (this.originY - this.y) / dist;

        if (xVector >= 0) this.direction = 1;
        else this.direction = 0;

        if (xVector != 0 || yVector != 0) {
          this.state = 1;
        } else {
          this.state = 0;
        }
        if (Math.abs(dist) < 1) {
          xVector = yVector = 0;
          this.state = 0;
          this.direction = 0;
        }
      }
    }
    // will refactor this at some point :D
    else {
      var dist = getDistance(this.originX, this.originY, this.x, this.y);
      var xVector = (this.originX - this.x) / dist;
      var yVector = (this.originY - this.y) / dist;

      if (xVector >= 0) this.direction = 1;
      else this.direction = 0;

      if (xVector != 0 || yVector != 0) {
        this.state = 1;
      } else {
        this.state = 0;
      }
      if (Math.abs(dist) < 1) {
        xVector = yVector = 0;
        this.state = 0;
        this.direction = 0;
      }
    }
    this.x += xVector * this.currSpeed * this.game.clockTick;
    this.y += yVector * this.currSpeed * this.game.clockTick;
    this.updateBoundingBox();
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
  }

  updateHitBox(current_frame) {
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
  }

  draw(ctx) {
    // draw shadows if not dying
    if (this.state != 4) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.ellipse(
        this.x + (this.animations[this.state][this.direction].getWidth() * 2.5) / 2 - 12 - this.game.camera.x,
        this.y + (this.animations[this.state][this.direction].getHeight() * 2.5) / 2 - 4 - this.game.camera.y,
        25 / 2,
        50 / 2,
        Math.PI / 4,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.restore();
    }

    this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);

    // draw hurt box and bounding box if parameter is on
    if (params.DEBUG) {
      drawBoundingBox(this.boundingBox, ctx, this.game, "white");
      drawBoundingBox(this.hurtBox, ctx, this.game, "red");
      if (this.hitBox) drawBoundingBox(this.hitBox, ctx, this.game, "blue");
    }

    // loop through and print all damage animations
    for (var i = 0; i < this.textAnimations.length; i++) {
      this.textAnimations[i].drawText(this.game.clockTick, ctx);
    }

    drawHealthBar(ctx, this.game, this.hurtBox, this.constructor.name, this.health, this.maxHealth);
  }
}
