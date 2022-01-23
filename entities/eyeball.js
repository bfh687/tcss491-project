class Eyeball {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/eyeball.png");

        this.animations = [];
        this.loadAnimations();

        // remove from world
        this.removeFromWorld = false;

        this.textAnimations = [];

        this.direction = 1;
        this.state = 0;

        this.updateBoundingBox();

        this.minSpeed = 100 + Math.random() * 50;
        this.currSpeed = this.minSpeed;

        this.health = 100;
        this.maxHealth = 100;

        this.attackDamage = 0;
        this.attackCooldown = 2;
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
        // decrement cooldowns
        if (this.state != 2) {
            this.attackCooldown -= this.game.clockTick;
        }

        // if dead, remove from world
        if (this.health <= 0) {
            this.state = 5;
        }

        if (this.state == 5 && !this.animations[this.state][this.direction].isDone()) {
            return;
        } else if (this.state == 5 && this.animations[this.state][this.direction].isDone()) {
            this.animations[this.state][this.direction].reset();
            this.removeFromWorld = true;
            this.state = 0;
        }

        if (this.state == 2 && !this.animations[this.state][this.direction].isDone()) {
            this.updateBoundingBox();
            return;
        } else if (this.state == 2 && this.animations[this.state][this.direction].isDone()) {
            this.animations[this.state][this.direction].reset();
            this.state = 0;
        }

        if (this.state == 4 && !this.animations[this.state][this.direction].isDone()) {
            this.updateBoundingBox();
            return;
        } else if (this.state == 4 && this.animations[this.state][this.direction].isDone()) {
            this.animations[this.state][this.direction].reset();
            this.state = 0;
        }

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
            var knight_x = knight.hurtBox.left;
            var knight_y = knight.boundingBox.bottom;
            var eyeball_x = this.x + 195 - 58;
            var eyeball_y = this.y + 25;
            var dist = getDistance(knight_x, knight_y, eyeball_x, eyeball_y);

            // aggro distance
            if (knight) {
                //this.hurtBox = new BoundingBox(this.x + 195 - 58, this.y + 25, 20, 23);

                var xVector = (knight_x - eyeball_x) / dist;
                var yVector = (knight_y - eyeball_y) / dist;

                if (xVector >= 0) this.direction = 1;
                else this.direction = 0;

                if (this.hurtBox.left >= knight.hurtBox.right) {
                    this.direction = 0;
                } else if (this.hurtBox.right <= knight.hurtBox.left) {
                    this.direction = 1;
                }

                if (xVector != 0 || yVector != 0) {
                    this.state = 1;
                } else {
                    this.state = 0;
                }

                var attackDist = -50;
                if (xVector < 0) attackDist *= -1;

                var horizontalBox = new BoundingBox(this.x + xVector * this.currSpeed * this.game.clockTick + attackDist, this.y, 195 * 1.5, 48);
                var verticalBox = new BoundingBox(this.hurtBox.left, this.hurtBox.top + yVector * this.currSpeed * this.game.clockTick, 20, 23);

                if (
                    verticalBox.collide(knight.boundingBox) &&
                    this.boundingBox.top > knight.hurtBox.top &&
                    this.hurtBox.bottom < knight.hurtBox.bottom
                ) {
                    yVector = 0;
                } else if (horizontalBox.collide(knight.hurtBox) && this.boundingBox.top > knight.hurtBox.top && this.attackCooldown <= 0) {
                    this.attackCooldown = 2;
                    xVector = 0;
                    this.state = 2;
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

        this.x += xVector * this.currSpeed * this.game.clockTick;
        this.y += yVector * this.currSpeed * this.game.clockTick;
        this.updateBoundingBox();
    }

    updateBoundingBox() {
        var current_frame = this.animations[this.state][this.direction].currentFrame();
        // done, needs fine tuning
        if (this.state == 0) {
            this.hurtBox = new BoundingBox(this.x + 137, this.y + 27, 20, 22);
        }
        // done, needs finetuning
        else if (this.state == 1) {
            this.hurtBox = new BoundingBox(this.x + 195 - 58, this.y + 25, 20, 23);
            console.log("first" + (this.hurtBox.right - this.hurtBox.left));
            console.log("second" + (this.hurtBox.bottom - this.hurtBox.top));
        }
        // done, needs fine tuning
        else if (this.state == 2) {
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
        }
        // done, needs finetuning
        else if (this.state == 3) {
            this.hurtBox = new BoundingBox(this.x + 135, this.y + 26, 24, 24);
        }
        // done
        else if (this.state == 4) {
            this.hurtBox = new BoundingBox(this.x + 137, this.y + 26, 20, 22);
        }
        // done
        else if (this.state == 5) {
            this.hurtBox = null;
            this.boundingBox = null;
        }
        if (this.hurtBox) {
            this.boundingBox = new BoundingBox(this.hurtBox.left, this.hurtBox.top + 10, 20, 23);
        }
        this.updateHitBox();
    }

    updateHitBox() {
        var current_frame = this.animations[this.state][this.direction].currentFrame();
        // 9 13
        if (this.state == 2 && current_frame >= 9 && current_frame <= 13) {
            if (this.direction == 0) {
                // 9 - 13
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
        this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);

        if (params.DEBUG) {
            // drawBoundingBox(this.hurtBox, ctx, "white");
            // ctx.save();
            // ctx.fillStyle = "green";
            // ctx.globalAlpha = 0.25;
            // ctx.fillRect(this.x, this.y, 195 * 1.5, 48 * 1.5);
            // ctx.restore();
            if (this.hitBox) drawBoundingBox(this.hitBox, ctx, "blue");
            for (var i = 0; i < this.textAnimations.length; i++) {
                this.textAnimations[i].drawText(this.game.clockTick, ctx);
            }
            drawBoundingBox(this.boundingBox, ctx, "white");
            drawBoundingBox(this.hurtBox, ctx, "red");
        }

        drawHealthBar(ctx, this.boundingBox, this.constructor.name, this.health, this.maxHealth);
    }
}
