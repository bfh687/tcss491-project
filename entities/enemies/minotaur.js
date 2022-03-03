class Minotaur {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/entities/minotaur.png");
    this.animations = [];
    this.loadAnimations();

    this.game.boss = this;

    // scale of minotaur
    this.scale = 3;

    // minotaur spawn point, goes here to channel lightning
    this.originX = this.x;
    this.originY = this.y;

    // states: idle (0), walking (1), attack (2), damaged (3), dying (4)
    this.state = 0;

    // spell state info
    this.spellState = false;
    this.spellStateDuration = 5;
    this.damageTaken = 0;
    this.fxcount = 0;

    // directions: left (0), right (1)
    this.direction = 0;

    // damage number counters
    this.textAnimations = [];

    // bounding box for collisions
    this.updateBoundingBox();
    this.hitBox = null;

    // remove from world
    this.removeFromWorld = false;

    // information about stats + attacking
    this.maxHealth = 5000 * (this.game.knight.attackDamage / 25);
    this.health = this.maxHealth;
    this.attackDamage = 20;
    this.attackCooldown = 3;
    this.damageCooldown = 0;
    this.bleedDamage = this.maxHealth * 0.02;

    this.isBleeding = false;
    this.bleedingCooldown = 1;

    this.isStaggerable = true;
    this.staggerCooldown = 3;
    this.staggerDuration = 0.5;

    // information about skeleton movement
    this.aggroDist = 1000;
    this.minSpeed = 200;
    this.currSpeed = this.minSpeed;

    this.bossItemsDropped = 3;

    // misc
    this.alpha = 1;
    this.xpDropped = 250;

    // lightning spell
    this.spellCooldown = 0;
  }

  loadAnimations() {
    // indices of animations in spritesheet
    const idle = 0;
    const walking = 1;
    const attack1 = 3;
    const attack2 = 6;
    const staffSlam = 5;
    const hurt = 8;
    const death = 9;

    // offset between left/right animations in spritesheet
    const offset = 10;

    this.animations.push([], [], [], [], [], [], [], [], []);

    // idle animations: left, right
    this.animations[0].push(new Animator(this.spritesheet, 0, 96 * (idle + offset), 96, 96, 5, 0.16, 0, 0, false, true));
    this.animations[0].push(new Animator(this.spritesheet, 0, 96 * idle, 96, 96, 5, 0.16, 0, 0, false, true));

    // walking animations: left, right
    this.animations[1].push(new Animator(this.spritesheet, 0, 96 * (walking + offset), 96, 96, 8, 0.1, 0, 0, false, true));
    this.animations[1].push(new Animator(this.spritesheet, 0, 96 * walking, 96, 96, 8, 0.1, 0, 0, false, true));

    // attack1 animations: left, right
    this.animations[2].push(new Animator(this.spritesheet, 0, 96 * (attack1 + offset), 96, 96, 9, 0.09, 0, 0, false, false));
    this.animations[2].push(new Animator(this.spritesheet, 0, 96 * attack1, 96, 96, 9, 0.09, 0, 0, false, false));

    // attack2 animations: left, right
    this.animations[3].push(new Animator(this.spritesheet, 0, 96 * (attack2 + offset), 96, 96, 9, 0.09, 0, 0, false, false));
    this.animations[3].push(new Animator(this.spritesheet, 0, 96 * attack2, 96, 96, 9, 0.09, 0, 0, false, false));

    // staff down / lightning channel: left, right
    this.animations[4].push(new Animator(this.spritesheet, 0, 96 * (staffSlam + offset), 96, 96, 6, 0.16, 0, 0, false, false));
    this.animations[4].push(new Animator(this.spritesheet, 0, 96 * staffSlam, 96, 96, 6, 0.16, 0, 0, false, false));

    // damaged animations: left, right
    this.animations[5].push(new Animator(this.spritesheet, 0, 96 * (hurt + offset), 96, 96, 3, 0.08, 0, 0, false, false));
    this.animations[5].push(new Animator(this.spritesheet, 0, 96 * hurt, 96, 96, 3, 0.08, 0, 0, false, false));

    // death animations: left, right
    this.animations[6].push(new Animator(this.spritesheet, 0, 96 * (death + offset), 96, 96, 12, 0.12, 0, 0, false, false));
    this.animations[6].push(new Animator(this.spritesheet, 0, 96 * death, 96, 96, 12, 0.12, 0, 0, false, false));
  }

  update() {
    // update cooldowns
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

    // calculate bleed
    if (this.isBleeding) {
      if (this.bleedingCooldown <= 0) {
        this.bleed();
        this.bleedingCooldown = 1;
      }
    }

    // if dead, remove from world
    if (this.health <= 0) {
      this.state = 6;
      this.spellState = false;
    }

    // decrement attack cooldown if not attacking
    if (this.state != 2 && this.state != 3) {
      this.attackCooldown -= this.game.clockTick;
    }

    // handle attacking state + animation
    if ((this.state == 2 || this.state == 3) && !this.animations[this.state][this.direction].isDone()) {
      this.updateHitBox();
      return;
    } else if ((this.state == 2 || this.state == 3) && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.state = 0;
    }

    // if death animation is playing, let it play out, otherwise remove entity from world
    else if (this.state == 6 && !this.animations[this.state][this.direction].isDone()) {
      return;
    } else if (this.state == 6 && this.animations[this.state][this.direction].isDone()) {
      var center_x = this.boundingBox.left + Math.abs(this.boundingBox.right - this.boundingBox.left) / 2;
      var center_y = this.boundingBox.top + Math.abs(this.boundingBox.top - this.boundingBox.bottom) / 2;
      let temp = this.bossItemsDropped;
      while (temp > 0) {
        const item = new Item(this.game, center_x, center_y);
        this.game.addEntity(item);
        temp--;
      }
      this.game.knight.kills += 1;
      this.game.knight.xpSystem.incrementXP(this.xpDropped);
      this.game.addEntity(new Victory(this.game));
      this.removeFromWorld = true;
      this.game.boss = null;
    }

    // if damaged animation is playing, let it play out, otherwise remove entity from world
    else if (this.state == 5 && !this.animations[this.state][this.direction].isDone()) {
      if (this.staggerDuration > 0) {
        return;
      } else {
        this.staggerDuration = 0.5;
      }
    } else if (this.state == 5 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.state = 0;
    }

    // check if minotaur should enter lightning spell attack state
    if (this.damageTaken >= 200 && this.health >= 0) {
      this.damageTaken = 0;
      this.spellState = true;
      this.spellStateDuration = 5;
    }

    // enter spell state
    if (this.spellState && this.spellStateDuration >= 0) {
      // do stomping animation, then start
      if (this.spellStateDuration == 5) {
        this.state = 4;
      }

      if (this.state == 4 && !this.animations[this.state][this.direction].isDone()) {
        return;
      } else if (this.state == 4 && this.animations[this.state][this.direction].isDone()) {
        this.animations[this.state][this.direction].reset();

        this.state = 0;
      }

      this.spellStateDuration -= this.game.clockTick;
      this.spellCooldown -= this.game.clockTick;
      if (this.spellCooldown <= 0) {
        this.game.addEntity(new LightningSpell(this.game, this.game.knight.x, this.game.knight.y));
        this.spellCooldown = 0.6;

        setTimeout(() => {
          ASSET_MANAGER.setVolume(0.07);
          ASSET_MANAGER.playAudio("./sfx/thunderfx" + this.fxcount + ".mp3");
          this.game.camera.screenshake();
        }, 380);

        this.fxcount = (this.fxcount + 1) % 4;
      }
    }

    // walk toward player
    var knight = this.game.knight;
    var xVector = 0;
    var yVector = 0;

    if (knight) {
      // calculate distance towards knight
      var dist = getDistance(knight.x, knight.y, this.x, this.y);

      if (dist < this.aggroDist) {
        xVector = (knight.x - this.x) / dist;
        yVector = (knight.y - this.y) / dist;

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
            console.log(this.state);
            this.state = Math.round(Math.ceil(Math.random() * 2) + 1);
            this.attackCooldown = 3;
          }
        }

        // check collisions and attack if there would be on on the horizontal axis
        if (horizontalBox.collide(knight.hurtBox)) {
          xVector = 0;
          if (this.attackCooldown <= 0) {
            this.state = Math.round(Math.ceil(Math.random() * 2) + 1);
            console.log(this.state);
            this.attackCooldown = 3;
          }
        }

        // if not moving, set state to idle
        if (xVector == 0 && yVector == 0) this.state = 0;
      }
    }

    this.x += xVector * this.currSpeed * this.game.clockTick;
    this.y += yVector * this.currSpeed * this.game.clockTick;
    this.updateBoundingBox();
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
      this.boundingBox = new BoundingBox(this.x + 112, this.y + 96 * 1.5, 80, 48);
      this.hurtBox = new BoundingBox(this.x + 108, this.y + 64, 90, 96 + 36);
    }

    // looking right
    else {
      this.boundingBox = new BoundingBox(this.x + 96, this.y + 96 * 1.5, 80, 48);
      this.hurtBox = new BoundingBox(this.x + 92, this.y + 64, 90, 96 + 36);
    }

    this.updateHitBox();
  }

  // update hitbox based on attack state
  updateHitBox() {
    var current_frame = this.animations[this.state][this.direction].currentFrame();
    if (this.state == 2) {
      if (current_frame == 1) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 28, this.y + 16, 96, 96 * 2);
        } else {
          this.hitBox = new BoundingBox(this.x + 28 + 138, this.y + 16, 96, 96 * 2);
        }
      } else if (current_frame == 2) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 28, this.y + 16, 96, 96 * 2);
        } else {
          this.hitBox = new BoundingBox(this.x + 28 + 138, this.y + 16, 96, 96 * 2);
        }
      } else if (current_frame == 3) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 28, this.y + 48, 96, 96 * 2 - 32);
        } else {
          this.hitBox = new BoundingBox(this.x + 28 + 138, this.y + 48, 96, 96 * 2 - 32);
        }
      } else if (current_frame == 4) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 28, this.y + 90, 96, 96 * 2 - 74);
        } else {
          this.hitBox = new BoundingBox(this.x + 28 + 138, this.y + 90, 96, 96 * 2 - 74);
        }
      } else if (current_frame == 5) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 28 + 32, this.y + 128 + 32, 64, 80 - 32);
        } else {
          this.hitBox = new BoundingBox(this.x + 28 + 138, this.y + 128 + 32, 64, 80 - 32);
        }
      } else {
        this.hitBox = null;
      }
    } else if (this.state == 3) {
      if (current_frame == 3) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 64, this.y + 96 + 48, 96 * 2, 48);
        } else {
          this.hitBox = new BoundingBox(this.x + 32, this.y + 96 + 48, 96 * 2, 48);
        }
      } else if (current_frame == 4) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 128 + 12, this.y + 96 + 48, 96 * 1.5 + 4, 48);
        } else {
          this.hitBox = new BoundingBox(this.x + 128 + 12 - 136, this.y + 96 + 48, 96 * 1.5 + 4, 48);
        }
      } else if (current_frame == 5) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 12, this.y + 96 + 48 + 12, 96 * 1.5, 54);
        } else {
          this.hitBox = new BoundingBox(this.x + 12 + 128, this.y + 96 + 48 + 12, 96 * 1.5, 54);
        }
      } else if (current_frame == 6) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 32, this.y + 96 + 48 + 12, 96 * 1.5 - 36, 54);
        } else {
          this.hitBox = new BoundingBox(this.x + 32 + 128, this.y + 96 + 48 + 12, 96 * 1.5 - 36, 54);
        }
      } else if (current_frame == 7) {
        if (this.direction == 0) {
          this.hitBox = new BoundingBox(this.x + 56, this.y + 96 + 48 + 12, 96 * 1.5 - 36 - 32, 54);
        } else {
          this.hitBox = new BoundingBox(this.x + 56 + 128 - 24, this.y + 96 + 48 + 12, 96 * 1.5 - 36 - 32, 54);
        }
      } else {
        this.hitBox = null;
      }
    } else {
      this.hitBox = null;
    }
  }

  draw(ctx) {
    // draw shadows if not dying
    if (this.state != 6) {
      drawShadow(ctx, this.game, this, 2);
    }

    this.animations[this.state][this.direction].drawFrame(
      this.game.clockTick,
      ctx,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
      this.scale
    );

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
  }
}

class LightningSpell {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    // load spritesheet
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/entities/thunder_spell.png");
    this.animation = new Animator(this.spritesheet, 0, 0, 64, 64, 12, 0.1, 0, 0, false, false);

    // set bounding box for correct draw order
    this.boundingBox = new BoundingBox(this.x + 24, this.y + 104, 128 - 48, 16);

    // set scale of spell
    this.scale = 2;

    this.attackDamage = 10;
  }

  update() {
    if (this.animation.isDone()) {
      this.removeFromWorld = true;
    }

    // update hitbox of spell
    var current_frame = this.animation.currentFrame();
    if (current_frame == 5) {
      this.hitBox = new BoundingBox(this.x + 24, this.y + 16 + 24, 128 - 48, 124 - 16 - 24);
    } else if (current_frame == 6) {
      this.hitBox = new BoundingBox(this.x + 24, this.y + 12 + 16 + 24, 128 - 48, 112 - 16 - 24);
    } else if (current_frame == 7) {
      this.hitBox = new BoundingBox(this.x + 24, this.y + 12 + 16 + 24, 128 - 48, 104 - 16 - 24);
    } else if (current_frame == 8) {
      this.hitBox = new BoundingBox(this.x + 24, this.y + 12 + 16 + 24, 128 - 48, 104 - 16 - 24);
    } else {
      this.hitBox = null;
    }
  }

  draw(ctx) {
    // draw current animation frame
    this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);

    // draw hurt box and bounding box if debug is on
    if (params.DEBUG) {
      drawBoundingBox(this.boundingBox, ctx, this.game, "white");
      if (this.hitBox) drawBoundingBox(this.hitBox, ctx, this.game, "red");
    }
  }
}
