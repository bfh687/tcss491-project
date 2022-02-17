class Knight {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    // load knight spritesheets and sounds
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/entities/knight.png");
    this.slide_spritesheet = ASSET_MANAGER.getAsset("./sprites/entities/knight_dash.png");

    this.removeFromWorld = false;

    // load/initialize animations
    this.textAnimations = [];
    this.animations = [];
    this.loadAnimations();
    this.item = new Item();

    // initialize velocity
    this.velocity = {
      x: 0,
      y: 0,
    };

    // states: idle (0), running (1), attack (2), damaged (3), crouch walking (4), sliding (5)
    this.state = 0;

    // directions: left (0), right (1), up (2), down (3)
    this.direction = 3;

    // add knight as variable to engine
    this.game.knight = this;

    // bounding box for collisions
    this.updateBoundingBox();

    // information about player stats
    this.attackDamage = 400;
    this.critMultiplier = 5;
    this.critChance = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.armor = 1.0;
    this.regenRate = 2;
    this.damageCooldown = 0.1;

    // misc
    this.kills = 0;
    this.xpSystem = new XP(this);

    // shop item info
    this.gogglesLevel = 0;
    this.gogglesMultiplier = 1;

    this.armorLevel = 0;
    this.armorDeflect = 1;

    this.potionLevel = 0;
    this.potionRegen = 0.025;
    this.regenCooldown = 1;

    this.daggerLevel = 0;
    this.daggerBleed = 5;
    this.bleedDuration = 5000;

    // init droppable items
    this.items = [];
    this.loadPlayerItems();

    // information about sliding
    this.slideDirection = { x: 0, y: 0 };
    this.slideLength = 200;
    this.slideCooldown = 0.7;

    // information about attacking
    this.attackCooldown = 0.25;

    // information about player movement
    this.speed = 325;
  }

  loadPlayerItems() {
    const uniques = this.item.getUniques();
    for (let i = 0; i < uniques.length; i++) {
      const item = uniques[i];
      const count = 0;
      const newItem = { item: item, count };
      this.items.push(newItem);
    }
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

    // attack animations: left, right, up, down
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
    if (this.state != 4) {
      // update cooldowns
      if (this.slideCooldown > 0 && this.state != 5) this.slideCooldown -= this.game.clockTick;
      if (this.attackCooldown > 0) this.attackCooldown -= this.game.clockTick;
      if (this.damageCooldown > 0) this.damageCooldown -= this.game.clockTick;
      if (this.regenCooldown > 0) this.regenCooldown -= this.game.clockTick;
    }

    // set death state upon losing all health
    if (this.health <= 0) {
      if (this.items[0].count > 0) {
        this.health = this.maxHealth;
        this.items[0].count--;
      } else {
        this.state = 4;
        this.health = 0;
      }
    }

    if (this.regenCooldown <= 0) {
      if (this.potionLevel > 0) {
        this.health = Math.min(this.health + this.game.clockTick * this.maxHealth * ((this.potionLevel + 1) * this.potionRegen), this.maxHealth);
      } else {
        this.health = Math.min(this.health + this.regenRate * this.game.clockTick, this.maxHealth);
      }
    }

    // handle attacking state + animations
    if (this.state == 2 && !this.animations[this.state][this.direction].isDone()) {
      this.updateBoundingBox();
      this.checkCollisions();
      return;
    } else if (this.state == 2 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.state = 0;
      this.hitBox = null;
    }

    // handle damaged state + animations
    else if (this.state == 3 && !this.animations[this.state][this.direction].isDone()) {
      return;
    } else if (this.state == 3 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.state = 0;
    }

    // handle death state + animations
    if (this.state == 4 && !this.animations[this.state][this.direction].isDone()) {
      return;
    } else if (this.state == 4 && this.animations[this.state][this.direction].isDone()) {
      this.removeFromWorld = true;
      return;
    }

    // handle sliding state + animations
    if (this.state == 5 && !this.animations[this.state][this.direction].isDone()) {
      this.checkCollisions();

      var slideMult = 4;
      if (this.velocity.x != 0 && this.velocity.y != 0) {
        slideMult = Math.sqrt(8);
      }

      this.x += slideMult * this.velocity.x * this.game.clockTick;
      this.y += slideMult * this.velocity.y * this.game.clockTick;
      this.updateBoundingBox();
      return;
    } else if (this.state == 5 && this.animations[this.state][this.direction].isDone()) {
      this.animations[this.state][this.direction].reset();
      this.velocity.y = this.speed;
      this.velocity.x = this.speed;
    }

    // capture input booleans
    var left = this.game.keys.a;
    var right = this.game.keys.d;
    var up = this.game.keys.w;
    var down = this.game.keys.s;
    var slide = this.game.keys[" "];
    var attack = this.game.left_click;

    // set direction (priority based on direction pressed);
    if (left) this.direction = 0;
    else if (right) this.direction = 1;
    else if (up) this.direction = 2;
    else if (down) this.direction = 3;

    // handle slide input
    if (slide && this.slideCooldown <= 0 && (left || right || up || down)) {
      this.state = 5;
      this.slideCooldown = 0.7;
    }
    // handle attack input
    else if (attack && this.attackCooldown <= 0) {
      ASSET_MANAGER.setVolume(0.25);
      ASSET_MANAGER.playAudio("./sfx/sword_slash.mp3");
      this.state = 2;
      this.attackCooldown = 0.25;
    }
    // handle movement input
    else if (left || right || up || down) {
      this.state = 1;

      if (left && !right) {
        this.velocity.x = -this.speed;
      } else if (!left && right) {
        this.velocity.x = this.speed;
      } else if (!(left || right)) {
        this.velocity.x = 0;
      }

      if (up && !down) {
        this.velocity.y = -this.speed;
      } else if (!up && down) {
        this.velocity.y = this.speed;
      } else if (!(up || down)) {
        this.velocity.y = 0;
      }

      if (left && right) this.velocity.x = 0;
      if (up && down) this.velocity.y = 0;
    }
    // handle idle player
    else {
      this.state = 0;
      this.velocity.x = this.velocity.y = 0;
    }

    // check collisions then update velocity and bounding boxes
    this.checkCollisions();
    this.x += this.velocity.x * this.game.clockTick;
    this.y += this.velocity.y * 0.85 * this.game.clockTick;
    this.updateBoundingBox();
  }

  draw(ctx) {
    // draw shadow
    drawShadow(ctx, this.game, this);

    // draw sprite
    this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2.5);

    // draw hurt box, hit box, and bounding box
    if (params.DEBUG) {
      drawBoundingBox(this.hurtBox, ctx, this.game, "red");
      drawBoundingBox(this.boundingBox, ctx, this.game, "white");
      if (this.hitBox) {
        drawBoundingBox(this.hitBox, ctx, this.game, "blue");
      }
    }

    // loop through and print all damage animations
    for (var i = 0; i < this.textAnimations.length; i++) {
      this.textAnimations[i].drawText(ctx);
    }

    //drawHealthBar(ctx, this.game, this.hurtBox, this.constructor.name, this.health, this.maxHealth);
  }

  checkCollisions() {
    this.game.entities.forEach((entity) => {
      // prevent entity pass through for alive enemies
      if ((entity instanceof Skeleton || entity instanceof Eyeball || entity instanceof Minotaur) && entity.state != 4 && entity.state != 5) {
        // handle sliding collisions
        var slideMultiplier = 1;
        if (this.state == 5) slideMultiplier = 6;

        // get bounding boxes of NEXT tick (assuming no major changes in fps)
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

      // handle skeleton collisions
      if (entity instanceof Skeleton) {
        // handle case where player attacks the skeleton
        if (this.hitBox && this.hitBox.collide(entity.hurtBox)) {
          if (entity.state != 2) entity.state = 3;
          this.handleAttackCollision(this, entity);
        }

        // handle case where skeleton attacks the player
        if (entity.hitBox && this.hurtBox.collide(entity.hitBox)) {
          if (this.state != 2) this.state = 3;
          this.handleAttackCollision(entity, this);
        }
      }

      // handle eyeball collisions
      else if (entity instanceof Eyeball) {
        // handle case where player attacks the eyeball
        if (this.hitBox && this.hitBox.collide(entity.hurtBox)) {
          if (entity.state != 2) entity.state = 4;
          this.handleAttackCollision(this, entity);
        }

        // handle case where eyeball attcks the player
        if (entity.hitBox && this.hurtBox.collide(entity.hitBox)) {
          if (this.state != 2) this.state = 3;
          this.handleAttackCollision(entity, this);
        }
      }

      // handle minotaur collisions
      else if (entity instanceof Minotaur) {
        // handle case where player attacks the eyeball
        if (this.hitBox && this.hitBox.collide(entity.hurtBox)) {
          if (entity.state != 2 && entity.state != 3 && entity.damageCooldown <= 0) {
            entity.damageCooldown = 1;
            entity.state = 5;
          }

          this.handleAttackCollision(this, entity);
        }

        // handle case where eyeball attcks the player
        if (entity.hitBox && this.hurtBox.collide(entity.hitBox)) {
          if (this.state != 2) this.state = 3;
          this.handleAttackCollision(entity, this);
        }
      }

      // handle lightning spell collisions
      else if (entity instanceof LightningSpell) {
        if (entity.hitBox && this.hurtBox.collide(entity.hitBox)) {
          this.handleAttackCollision(entity, this);
          this.state = 3;
        }
      }

      // handle map collisions
      else if (entity instanceof Map) {
        entity.bounding_boxes.forEach((box) => {
          // handle sliding collisions
          var slideMultiplier = 1;
          if (this.state == 5) slideMultiplier = 4;

          // get bounding boxes of NEXT tick (assuming no major changes in fps)
          var horizontalBox = new BoundingBox(this.x + 28 + this.velocity.x * slideMultiplier * this.game.clockTick, this.y + 94, 29, 24);
          var verticalBox = new BoundingBox(this.x + 28, this.y + 94 + this.velocity.y * slideMultiplier * this.game.clockTick, 29, 24);

          // check for and handle collisions
          if (verticalBox.collide(box)) this.velocity.y = 0;
          if (horizontalBox.collide(box)) this.velocity.x = 0;
        });
      } else if (entity instanceof Shop || entity instanceof Foilage || entity instanceof Prop || entity instanceof Sign) {
        // handle sliding collisions
        var slideMultiplier = 1;
        if (this.state == 5) slideMultiplier = 6;

        // get bounding boxes of NEXT tick (assuming no major changes in fps)
        var horizontalBox = new BoundingBox(this.x + 28 + this.velocity.x * slideMultiplier * this.game.clockTick, this.y + 94, 29, 24);
        var verticalBox = new BoundingBox(this.x + 28, this.y + 94 + this.velocity.y * slideMultiplier * this.game.clockTick, 29, 24);

        // check for and handle collisions
        if (verticalBox.collide(entity.boundingBox)) this.velocity.y = 0;
        if (horizontalBox.collide(entity.boundingBox)) this.velocity.x = 0;
      }

      // handle item collision/pickup
      else if (entity instanceof Item) {
        if (this.hurtBox.collide(entity.boundingBox)) {
          entity.removeFromWorld = true;
          this.addItem(entity.getItem());
        }
      }
    });
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

  handleAttackCollision(attacker, attacked) {
    if (attacked instanceof Knight && attacked.state == 5) return;

    if (attacked.damageCooldown <= 0 || !(attacked instanceof Knight)) {
      // DAMAGE TO BE DEFLECTED
      var deflectPercentage = this.armorDeflect - this.armorLevel * 0.15;
      var damage = attacker.attackDamage * this.game.clockTick;

      // calculate crit chance
      var color = "red";
      if (attacker instanceof Knight) {
        var damageMultiplier = Math.pow(this.gogglesMultiplier, this.gogglesLevel);
        damage *= damageMultiplier;
        if (Math.random() <= this.critChance) {
          damage *= this.critMultiplier;
          color = "yellow";
        }
        if (this.daggerLevel > 0 && !attacked.isBleeding) {
          attacked.isBleeding = true;
          setTimeout(() => {
            attacked.isBleeding = false;
          }, this.bleedDuration);
          attacked.bleedDamage = this.daggerBleed * this.daggerLevel;
        }
      } else if (attacked instanceof Knight && !attacker instanceof LightningSpell) {
        // ARMOR DEFLECTING DAMAGE BACK
        let initDmg = damage;

        damage *= deflectPercentage;
        damage -= this.armor;
        attacker.health -= Math.ceil((this.attackDamage / 3) * (1 - deflectPercentage));
        this.regenCooldown = 1;
      }

      attacked.health -= Math.max(0, damage);
      attacked.damageCooldown = 0.1;

      if (attacked instanceof Minotaur) {
        attacked.damageTaken += damage;
      }

      var flag = true;
      for (var i = 0; i < attacked.textAnimations.length; i++) {
        if (!attacked.textAnimations[i].isFull() && !attacked.textAnimations[i].isDone() && attacked.textAnimations[i].color != "yellow") {
          attacked.textAnimations[i].increment(damage);
          flag = false;
          break;
        }
      }

      if (flag) {
        attacked.textAnimations.push(new TextAnimator(damage, color, this.game, attacked));
      }
    }
  }

  collectSpareHeart() {
    this.health = this.maxHealth;
    this.items[2].count--;
  }

  collectBoneThickener() {
    this.maxHealth += 25;
    this.health += 25;
  }

  collectWing() {
    this.speed = Math.ceil(this.speed * 1.005);
  }

  collectScale() {
    this.armor -= 0.01;
  }

  collectClover1() {
    this.critChance += 0.05;
  }

  collectClover2() {
    this.critChance += 0.1;
  }

  collectClover3() {
    this.critChance += 0.15;
  }

  collectClover4() {
    this.critChance += 0.25;
  }

  addItem(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (item.code === this.items[i].item.code) {
        if (this.items[i].count == 25) {
          break;
        }
        this.items[i].count++;
        if (i === 1) {
          this.collectBoneThickener();
        } else if (i === 2) {
          this.collectSpareHeart();
        } else if (i === 3) {
          this.collectWing();
        } else if (i === 4) {
          this.collectScale();
        } else if (i === 5) {
          this.collectClover1();
        } else if (i === 6) {
          this.collectClover2();
        } else if (i === 7) {
          this.collectClover3();
        } else if (i === 8) {
          this.collectClover4();
        }

        if (i === 5 && this.items[i].count >= 3) {
          // Clover 1 Needs to Upgrade Clover 2
          let increment = Math.floor(this.items[i].count / 3);
          let remainder = this.items[i].count % 3;
          this.items[i].count = remainder;
          this.items[i + 1].count += increment;
          if (this.items[i + 1].count >= 3) {
            let increment = Math.floor(this.items[i + 1].count / 3);
            let remainder = this.items[i + 1].count % 3;
            this.items[i + 1].count = remainder;
            this.items[i + 2].count += increment;
            if (this.items[i + 2].count >= 3) {
              let increment = Math.floor(this.items[i + 2].count / 3);
              let remainder = this.items[i + 2].count % 3;
              this.items[i + 2].count = remainder;
              this.items[i + 3].count += increment;
            }
          }
        } else if (i === 6 && this.items[i].count >= 3) {
          // Clover 2 Needs to Upgrade Clover 3
          let increment = Math.floor(this.items[i].count / 3);
          let remainder = this.items[i].count % 3;
          this.items[i].count = remainder;
          this.items[i + 1].count += increment;
          if (this.items[i + 1].count >= 3) {
            let increment = Math.floor(this.items[i + 1].count / 3);
            let remainder = this.items[i + 1].count % 3;
            this.items[i + 1].count = remainder;
            this.items[i + 2].count += increment;
          }
        } else if (i === 7 && this.items[i].count >= 3) {
          // Clover 3 Needs to Upgrade Clover 4
          let increment = Math.floor(this.items[i].count / 3);
          let remainder = this.items[i].count % 3;
          this.items[i].count = remainder;
          this.items[i + 1].count += increment;
        }
      }
    }
  }
}
