class Knight {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.swordslash = ASSET_MANAGER.getAsset("./sfx/sword_slash.png");
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knight.png");
    this.slide_spritesheet = ASSET_MANAGER.getAsset("./sprites/knight_dash.png");
    this.animations = [];
    this.loadAnimations();
    this.damageColor = "red";

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.textAnimations = [];

    // states: idle (0), running (1), attack (2), damaged (3), crouch walking (4), slideing (5)
    this.state = 0;

    // directions: left (0), right (1), up (2), down (3)
    this.direction = 3;

    // bounding box for collisions
    this.updateBoundingBox();

    // information about player stats
    this.attackDamage = 100;
    this.critMultiplier = 1.5;
    this.critChance = 25; // 4% chance
    this.maxHealth = 100;
    this.health = 100;

    // information about sliding
    this.slideDirection = { x: 0, y: 0 };
    this.slideLength = 200;
    this.slideCooldown = 1.5;

    // information about attacking
    this.attackCooldown = 0.25;

    // information about player movement
    this.maxSpeed = 250;
    this.speedAccel = 350;
    this.minSpeed = 100;
  }

  loadAnimations() {
    // push state arrays
    this.animations.push([], [], [], [], [], []);

    // idle animations: left, right, up, down
    this.animations[0].push(new Animator(this.spritesheet, 0, 128, 64, 64, 3, 0.16, 15, 15, false, true));
    this.animations[0].push(new Animator(this.spritesheet, 0, 64, 64, 64, 3, 0.16, 15, 15, false, true));
    this.animations[0].push(new Animator(this.spritesheet, 0, 192, 64, 64, 3, 0.16, 15, 15, false, true));
    this.animations[0].push(new Animator(this.spritesheet, 0, 0, 64, 64, 3, 0.16, 15, 15, false, true));

    // running animations: left, right, up, down
    this.animations[1].push(new Animator(this.spritesheet, 64, 320, 64, 64, 10, 0.08, 15, 15, false, true));
    this.animations[1].push(new Animator(this.spritesheet, 64, 256, 64, 64, 10, 0.08, 15, 15, false, true));
    this.animations[1].push(new Animator(this.spritesheet, 64, 448, 64, 64, 7, 0.08, 15, 15, false, true));
    this.animations[1].push(new Animator(this.spritesheet, 64, 384, 64, 64, 8, 0.08, 15, 15, false, true));

    // attack animations: left, right, up, down .06
    this.animations[2].push(new Animator(this.spritesheet, 0, 576, 64, 64, 7, 0.06, 15, 15, false, false));
    this.animations[2].push(new Animator(this.spritesheet, 0, 512, 64, 64, 7, 0.06, 15, 15, false, false));
    this.animations[2].push(new Animator(this.spritesheet, 0, 704, 64, 64, 7, 0.06, 15, 15, false, false));
    this.animations[2].push(new Animator(this.spritesheet, 0, 640, 64, 64, 7, 0.06, 15, 15, false, false));

    // damaged animations: left, right, up, down
    this.animations[3].push(new Animator(this.spritesheet, 0, 832, 64, 64, 2, 0.04, 15, 15, false, false));
    this.animations[3].push(new Animator(this.spritesheet, 0, 768, 64, 64, 2, 0.04, 15, 15, false, false));
    this.animations[3].push(new Animator(this.spritesheet, 0, 832, 64, 64, 2, 0.04, 15, 15, false, false));
    this.animations[3].push(new Animator(this.spritesheet, 0, 768, 64, 64, 2, 0.04, 15, 15, false, false));

    // death animations: left, right, up, down
    this.animations[4].push(new Animator(this.spritesheet, 0, 960, 64, 64, 8, 0.2, 15, 15, false, false));
    this.animations[4].push(new Animator(this.spritesheet, 0, 896, 64, 64, 8, 0.2, 15, 15, false, false));
    this.animations[4].push(new Animator(this.spritesheet, 0, 960, 64, 64, 8, 0.2, 15, 15, false, false));
    this.animations[4].push(new Animator(this.spritesheet, 0, 896, 64, 64, 8, 0.2, 15, 15, false, false));

    // slide animations: front-left, front-right, back-left, back-right
    this.animations[5].push(new Animator(this.slide_spritesheet, 0, 0, 64, 64, 9, 0.02, 15, 15, false, false));
    this.animations[5].push(new Animator(this.slide_spritesheet, 0, 64, 64, 64, 9, 0.02, 15, 15, false, false));
    this.animations[5].push(new Animator(this.slide_spritesheet, 0, 128, 64, 64, 9, 0.02, 15, 15, false, false));
    this.animations[5].push(new Animator(this.slide_spritesheet, 0, 196, 64, 64, 9, 0.02, 15, 15, false, false));
  }

  update() {
    // don't update if cursor isnt locked
    if (!this.game.locked) {
      this.state = 0;
      return;
    }

    // reset for debugging
    if (this.game.keys.r && params.DEBUG) {
      this.x = this.game.ctx.canvas.width / 2;
      this.y = this.game.ctx.canvas.height / 2;
    }

    // update cooldowns
    if (this.slideCooldown > 0) this.slideCooldown -= this.game.clockTick;
    if (this.attackCooldown > 0) this.attackCooldown -= this.game.clockTick;

    if (this.health <= 0) {
      this.state = 4;
    }

    // if death animation is playing, let it play out, otherwise remove entity from world
    if (this.state == 4 && !this.animations[this.state][this.direction].isDone()) {
      return;
    } else if (this.state == 4 && this.animations[this.state][this.direction].isDone()) {
      this.removeFromWorld = true;
      return;
    }

    // if damaged animation is going, let it playout
    else if (this.state == 3 && !this.animations[this.state][this.direction].isDone()) {
      return;
    } else if (this.state == 3 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.state = 0;
    }

    // if attacking, dont allow other input
    if (this.state == 2 && !this.animations[this.state][this.direction].isDone()) {
      var curr_frame = this.animations[this.state][this.direction].currentFrame();
      this.updateBoundingBox();
      this.checkCollisions();
      return;
    }
    // if done attacking, reset attacking animation and state
    else if (this.state == 2 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.state = 0;
      this.hitBox = null;
    }

    // if sliding, update sliding position
    if (this.state == 5 && !this.animations[this.state][this.direction].isDone()) {
      this.checkCollisions();
      this.x += 6 * this.velocity.x * this.game.clockTick;
      this.y += 6 * this.velocity.y * this.game.clockTick;
      this.updateBoundingBox();
      return;
    }
    // if done sliding, reset sliding animation
    else if (this.state == 5 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.velocity.y = this.maxSpeed;
      this.velocity.x = this.maxSpeed;
    }

    // capture input booleans
    var left = this.game.keys.a;
    var right = this.game.keys.d;
    var up = this.game.keys.w;
    var down = this.game.keys.s;
    var slide = this.game.keys[" "];
    var attack = this.game.keys.q;

    // set direction (priority based on direction pressed);
    if (left) this.direction = 0;
    else if (right) this.direction = 1;
    else if (up) this.direction = 2;
    else if (down) this.direction = 3;

    // if able to slide, slide
    if (slide && this.slideCooldown <= 0 && (left || right || up || down)) {
      this.calculateSlideDir(left, right, up, down);
      this.state = 5;
      this.slideCooldown = 1.5;
    }
    // if able to attack, attack
    else if (attack && this.attackCooldown <= 0) {
      ASSET_MANAGER.setVolume(0.25);
      ASSET_MANAGER.playAudio("./sfx/sword_slash.mp3");
      this.state = 2;
      this.attackCooldown = 0.25;
    }
    // if movement input, move
    else if (left || right || up || down) {
      this.state = 1;

      if (left && !right) {
        this.velocity.x = -this.maxSpeed;
      } else if (!left && right) {
        this.velocity.x = this.maxSpeed;
      } else if (!(left || right)) {
        this.velocity.x = 0;
      }

      if (up && !down) {
        this.velocity.y = -this.maxSpeed;
      } else if (!up && down) {
        this.velocity.y = this.maxSpeed;
      } else if (!(up || down)) {
        this.velocity.y = 0;
      }

      if (left && right) this.velocity.x = 0;
      if (up && down) this.velocity.y = 0;
    }
    // otherwise, player is idle
    else {
      this.state = 0;
      this.velocity.x = this.velocity.y = 0;
    }

    this.checkCollisions();
    console.log(this.damageColor);
    this.x += this.velocity.x * this.game.clockTick;
    this.y += this.velocity.y * 0.85 * this.game.clockTick;
    this.updateBoundingBox();
  }

  checkCollisions() {
    this.game.entities.forEach((entity) => {
      // prevent entity pass through
      if (entity instanceof Skeleton && entity.state != 4) {
        // future collision detection
        var slideMultiplier = 1;
        if (this.state == 5) slideMultiplier = 6;
        var horizontalBox = new BoundingBox(this.x + 28 + this.velocity.x * slideMultiplier * this.game.clockTick, this.y + 94, 29, 24);
        var verticalBox = new BoundingBox(this.x + 28, this.y + 94 + this.velocity.y * slideMultiplier * this.game.clockTick, 29, 24);

        // check collisions
        var flag = false;
        if (verticalBox.collide(entity.boundingBox)) {
          this.velocity.y = 0;
          entity.currSpeed = 0;
          flag = true;
        }
        if (horizontalBox.collide(entity.boundingBox)) {
          this.velocity.x = 0;
          entity.currSpeed = 0;
          flag = true;
        }
        if (!flag) entity.currSpeed = entity.minSpeed;
      }

      if (entity instanceof Skeleton) {
        if (this.hitBox && this.hitBox.collide(entity.hurtBox)) {
          if (entity.state != 2) {
            entity.state = 3;
          }
          let rand = Math.floor(Math.random() * this.critChance);
          console.log("rand: " + rand);
          if (rand === Math.floor(this.critChance / 2)) {
            this.attackDamage = this.attackDamage * this.critMultiplier;
            this.damageColor = "yellow";
            console.log("CRIT!!!");
          }

          entity.health -= this.attackDamage * this.game.clockTick;
          const animator = new TextAnimator(
            entity.hurtBox.left + (entity.hurtBox.right - entity.hurtBox.left) / 2,
            entity.hurtBox.top - 48,
            this.attackDamage * this.game.clockTick,
            1
          );
          animator.criticallyHit(this.damageColor);
          entity.textAnimations.push(
            new TextAnimator(
              entity.hurtBox.left + (entity.hurtBox.right - entity.hurtBox.left) / 2,
              entity.hurtBox.top - 48,
              this.attackDamage * this.game.clockTick,
              1
            )
          );
          console.log(this.attackDamage);
          console.log(this.critChance);
          this.attackDamage = 100;
          this.damageColor = "red";
        }

        if (entity.hitBox && this.hurtBox.collide(entity.hitBox)) {
          if (this.state != 2) {
            this.state = 3;
          }
          this.health -= entity.attackDamage * this.game.clockTick;
          this.textAnimations.push(
            new TextAnimator(
              this.hurtBox.left + (this.hurtBox.right - this.hurtBox.left) / 2,
              this.hurtBox.top,
              entity.attackDamage * this.game.clockTick,
              1
            )
          );
        }
      }

      if (entity instanceof Item) {
        if (this.hurtBox.collide(entity.boundingBox)) {
          entity.removeFromWorld = true;
          this.critChance = 5;
        }
      }
    });
  }

  draw(ctx) {
    // draw shadow
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(
      this.x + (this.animations[this.state][this.direction].getWidth() * 2.5) / 2 + 12,
      this.y + (this.animations[this.state][this.direction].getHeight() * 2.5) / 2 + 12,
      25 / 2,
      50 / 2,
      Math.PI / 4,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.restore();

    this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2.5);

    // draw hurt box, hit box, and bounding box
    if (params.DEBUG) {
      drawBoundingBox(this.hurtBox, ctx, "red");
      drawBoundingBox(this.boundingBox, ctx, "white");
      if (this.hitBox) {
        drawBoundingBox(this.hitBox, ctx, "blue");
      }
    }

    // loop through and print all damage animations
    for (var i = 0; i < this.textAnimations.length; i++) {
      if (!this.textAnimations[i].isDone()) {
        this.textAnimations[i].criticallyHit(this.damageColor);
        this.textAnimations[i].drawText(this.game.clockTick, ctx);
      }
    }

    drawHealthBar(ctx, this.hurtBox, this.constructor.name, this.health, this.maxHealth);
  }

  updateBoundingBox() {
    this.hurtBox = new BoundingBox(this.x + 28, this.y + 50, 29, 62);
    this.boundingBox = new BoundingBox(this.x + 28, this.y + 94, 29, 24);
    this.updateHitBox();
  }

  updateHitBox() {
    var current_frame = this.animations[this.state][this.direction].currentFrame();
    if (this.state == 2) {
      if (current_frame == 0) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 0, this.y + 50, 48, 54);
        } else if (this.direction == 1) {
          this.hitBox = new BoundingBox(this.x + 38, this.y + 50, 54, 56);
        } else if (this.direction == 2) {
          this.hitBox = new BoundingBox(this.x + 10, this.y + 29, 52, 48);
        } else {
          this.hitBox = new BoundingBox(this.x + 14, this.y + 84, 55, 50);
        }
      } else if (current_frame == 1) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 0, this.y + 80, 48, 24);
        } else if (this.direction == 1) {
          this.hitBox = new BoundingBox(this.x + 38, this.y + 80, 48, 24);
        } else if (this.direction == 2) {
          this.hitBox = new BoundingBox(this.x + 10, this.y + 32, 44, 48);
        } else {
          this.hitBox = new BoundingBox(this.x + 14, this.y + 85, 36, 50);
        }
      } else if (current_frame == 4) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 0, this.y + 40, 42, 58);
        } else if (this.direction == 1) {
          this.hitBox = new BoundingBox(this.x + 42, this.y + 40, 56, 58);
        } else if (this.direction == 2) {
          this.hitBox = new BoundingBox(this.x + 17, this.y + 32, 53, 48);
        } else {
          this.hitBox = new BoundingBox(this.x + 20, this.y + 76, 62, 54);
        }
      } else if (current_frame == 5) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 5, this.y + 40, 38, 24);
        } else if (this.direction == 1) {
          this.hitBox = new BoundingBox(this.x + 42, this.y + 40, 38, 24);
        } else if (this.direction == 2) {
          this.hitBox = new BoundingBox(this.x + 54, this.y + 32, 16, 42);
        } else {
          this.hitBox = new BoundingBox(this.x + 54, this.y + 76, 28, 42);
        }
      } else {
        this.hitBox = null;
      }
    } else {
      this.hitBox = null;
    }
  }

  calculateSlideDir(left, right, up, down) {
    if ((right && left) || (up && down)) return;

    const dir = { x: 0, y: 0 };
    if (right) dir.x = 1;
    else if (left) dir.x = -1;
    if (up) dir.y = -1;
    else if (down) dir.y = 1;

    this.slideDirection = dir;

    if (dir.y == -1 && dir.x == 0) {
      this.direction = 2; // replace with up slide
    } else if (dir.y == -1 && dir.x == -1) {
      this.direction = 2;
    } else if (dir.y == -1 && dir.x == 1) {
      this.direction = 3;
    } else if (dir.y == 1 && dir.x == 0) {
      this.direction = 1;
    } else if (dir.y == 1 && dir.x == -1) {
      this.direction = 0;
    } else if (dir.y == 1 && dir.x == 1) {
      this.direction = 1;
    } else if (dir.x == -1 && dir.y == 0) {
      this.direction = 0;
    } else if (dir.x == -1 && dir.y == -1) {
      this.direction = 2;
    } else if (dir.x == -1 && dir.y == 1) {
      this.direction = 0;
    } else if (dir.x == 1 && dir.y == 0) {
      this.direction = 1;
    } else if (dir.x == 1 && dir.y == -1) {
      this.direction = 3;
    } else if (dir.x == 1 && dir.y == 1) {
      this.direction = 1;
    }
  }

  getDamageColor() {
    return this.damageColor;
  }
}
