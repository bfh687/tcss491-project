class Eyeball {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/eyeball.png");

        this.animations = [];
        this.loadAnimations();

        // remove from world
        this.removeFromWorld = false;

        this.textAnimations = [];

        this.direction = 0;
        this.state = 0;

        this.updateBoundingBox();

        this.currSpeed = 100;
        this.minSpeed = 100;

        this.health = 100;
        this.maxHealth = 100;

        this.attackDamage = 500;
    }

    loadAnimations() {
        this.animations.push([], [], [], [], [], []);

        // idle animations: left, right
        this.animations[0].push(new Animator(this.spritesheet, 0, 0, 128, 48, 9, 0.16, 0, 0, false, true));

        // walking animations: left, right
        this.animations[1].push(new Animator(this.spritesheet, 0, 48, 128, 48, 8, 0.16, 0, 0, false, true));

        // attack animations: left, right
        this.animations[2].push(new Animator(this.spritesheet, 0, 96, 128, 48, 18, 0.05, 0, 0, false, false));

        // roll animations: left, right
        this.animations[3].push(new Animator(this.spritesheet, 0, 144, 128, 48, 11, 0.1, 0, 0, false, true));

        // damaged animations: left, right
        this.animations[4].push(new Animator(this.spritesheet, 0, 192, 128, 48, 4, 0.1, 0, 0, false, false));

        // death animations: left, right
        this.animations[5].push(new Animator(this.spritesheet, 0, 240, 128, 48, 8, 0.1, 0, 0, false, true));
    }

    update() {
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
            var knight_x = knight.hurtBox.left + Math.abs(knight.hurtBox.right - knight.hurtBox.left) / 2;
            var knight_y = knight.hurtBox.top + Math.abs(knight.hurtBox.top - knight.hurtBox.bottom) / 2;
            var dist = getDistance(knight_x, knight_y, this.x, this.y);

            // aggro distance
            if (knight) {
                var xVector = (knight_x - this.x) / dist;
                var yVector = (knight_y - this.y) / dist;

                if (xVector >= 0) this.direction = 1;
                else this.direction = 0;

                if (xVector != 0 || yVector != 0) {
                    this.state = 1;
                } else {
                    this.state = 0;
                }

                var attackDist = 60;
                if (xVector < 0) attackDist *= -1;

                var horizontalBox = new BoundingBox(this.x + 36 + xVector * this.currSpeed * this.game.clockTick + attackDist, this.y + 27, 50, 50);
                var verticalBox = new BoundingBox(this.x + 36, this.y + 27 + yVector * this.currSpeed * this.game.clockTick, 50, 50);

                // drawBoundingBox(horizontalBox, ctx, "green");
                // drawBoundingBox(verticalBox, ctx, "green");

                if (verticalBox.collide(knight.boundingBox)) {
                    yVector = 0;
                }
                if (horizontalBox.collide(knight.boundingBox)) {
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

        this.direction = 0;
        this.x += xVector * this.currSpeed * this.game.clockTick;
        this.y += yVector * this.currSpeed * this.game.clockTick;
        this.updateBoundingBox();
    }

    updateBoundingBox() {
        this.boundingBox = new BoundingBox(this.x + 36, this.y + 25, 20, 24);

        var current_frame = this.animations[this.state][this.direction].currentFrame();
        if (this.state == 0) {
            this.hurtBox = new BoundingBox(this.x + 36, this.y + 25, 20, 24);
        } else if (this.state == 1) {
            this.hurtBox = new BoundingBox(this.x + 36, this.y + 27, 20, 21);
        } else if (this.state == 2) {
            if (current_frame < 9) {
                this.hurtBox = new BoundingBox(this.x + 34, this.y + 26, 24, 24);
            } else if (current_frame == 9) {
                this.hurtBox = new BoundingBox(this.x + 32, this.y + 24, 24, 26);
            } else if (current_frame == 10) {
                this.hurtBox = new BoundingBox(this.x + 23, this.y + 26, 24, 24);
            } else if (current_frame == 11) {
                this.hurtBox = new BoundingBox(this.x + 16, this.y + 26, 24, 24);
            } else if (current_frame == 12) {
                this.hurtBox = new BoundingBox(this.x + 14, this.y + 26, 24, 24);
            } else if (current_frame == 13) {
                this.hurtBox = new BoundingBox(this.x + 13, this.y + 26, 24, 24);
            } else if (current_frame == 14) {
                this.hurtBox = new BoundingBox(this.x + 13, this.y + 26, 24, 24);
            } else if (current_frame == 15) {
                this.hurtBox = new BoundingBox(this.x + 20, this.y + 26, 24, 24);
            } else if (current_frame == 16) {
                this.hurtBox = new BoundingBox(this.x + 26, this.y + 26, 24, 24);
            } else if (current_frame == 17) {
                this.hurtBox = new BoundingBox(this.x + 30, this.y + 26, 24, 24);
            }
        } else if (this.state == 3) {
            this.hurtBox = new BoundingBox(this.x + 30, this.y + 26, 24, 24);
        } else if (this.state == 4) {
            this.hurtBox = new BoundingBox(this.x + 35, this.y + 26, 20, 22);
        } else if (this.state == 5) {
        }
        this.updateHitBox();
    }

    updateHitBox() {
        var current_frame = this.animations[this.state][this.direction].currentFrame();
        if (this.state == 2) {
            if (current_frame == 9) {
                this.hitBox = new BoundingBox(this.x + 45, this.y + 13, 48, 36);
            } else if (current_frame == 10) {
                this.hitBox = new BoundingBox(this.x + 47, this.y + 8, 110, 40);
            } else if (current_frame == 11) {
                this.hitBox = new BoundingBox(this.x + 70, this.y + 8, 90, 40);
            } else if (current_frame == 12) {
                this.hitBox = new BoundingBox(this.x + 120, this.y + 8, 40, 40);
            } else if (current_frame == 13) {
                this.hitBox = new BoundingBox(this.x + 140, this.y + 8, 20, 40);
            } else {
                this.hitBox = null;
            }
        } else {
            this.hitBox = null;
        }
    }

    draw(ctx) {
        this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
        drawBoundingBox(this.hurtBox, ctx, "red");
        if (this.hitBox) drawBoundingBox(this.hitBox, ctx, "blue");

        for (var i = 0; i < this.textAnimations.length; i++) {
            this.textAnimations[i].drawText(this.game.clockTick, ctx);
        }

        drawHealthBar(ctx, this.hurtBox, this.constructor.name, this.health, this.maxHealth);
    }
}
