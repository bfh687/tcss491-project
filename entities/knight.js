class Knight {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.swordslash = ASSET_MANAGER.getAsset("./sfx/sword_slash.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knight.png");
        this.dash_spritesheet = ASSET_MANAGER.getAsset("./sprites/knight_dash.png");
        this.animations = [];
        this.loadAnimations();

        // bounding box for collisions
        this.boundingBox = new BoundingBox(this.x + 28, this.y + 48, 32, 64);
        this.attackBoundingBox = null;

        // states: idle (0), running (1), attack (2), damaged (3), crouch walking (4), dashing (5)
        this.state = 0;

        // information about player stats
        this.attackDamage = 10;
        this.health = 100;

        // directions: left (0), right (1), up (2), down (3)
        this.direction = 3;

        // information about dashing
        this.dashCooldown = 5;
        this.maxDashDistance = 500;

        // information about sliding
        this.isSliding = false;
        this.slideDirection = { x: 0, y: 0 };
        this.slideLength = 200;
        this.slideCooldown = 1.5;

        // information about attacking
        this.isAttacking = false;
        this.attackCooldown = 0.25;

        // information about player movement
        this.maxSpeed = 250;
        this.speedAccel = 350;
        this.minSpeed = 100;
        this.currSpeed = this.minSpeed;
    }

    loadAnimations() {
        // push state arrays
        this.animations.push([], [], [], [], [], []);

        // idle animations: left, right, up, down
        this.animations[0].push(
            new Animator(this.spritesheet, 0, 128, 64, 64, 3, 0.16, 15, 15, false, true)
        );
        this.animations[0].push(
            new Animator(this.spritesheet, 0, 64, 64, 64, 3, 0.16, 15, 15, false, true)
        );
        this.animations[0].push(
            new Animator(this.spritesheet, 0, 192, 64, 64, 3, 0.16, 15, 15, false, true)
        );
        this.animations[0].push(
            new Animator(this.spritesheet, 0, 0, 64, 64, 3, 0.16, 15, 15, false, true)
        );

        // running animations: left, right, up, down
        this.animations[1].push(
            new Animator(this.spritesheet, 64, 320, 64, 64, 10, 0.08, 15, 15, false, true)
        );
        this.animations[1].push(
            new Animator(this.spritesheet, 64, 256, 64, 64, 10, 0.08, 15, 15, false, true)
        );
        this.animations[1].push(
            new Animator(this.spritesheet, 64, 448, 64, 64, 7, 0.08, 15, 15, false, true)
        );
        this.animations[1].push(
            new Animator(this.spritesheet, 64, 384, 64, 64, 8, 0.08, 15, 15, false, true)
        );

        // attack animations: left, right, up, down
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 576, 64, 64, 7, 0.06, 15, 15, false, false)
        );
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 512, 64, 64, 7, 0.06, 15, 15, false, false)
        );
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 704, 64, 64, 7, 0.06, 15, 15, false, false)
        );
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 640, 64, 64, 7, 0.06, 15, 15, false, false)
        );

        // damaged animations: left, right, up, down
        this.animations[3].push(
            new Animator(this.spritesheet, 0, 832, 64, 64, 2, 0.1, 0, 0, false, true)
        );
        this.animations[3].push(
            new Animator(this.spritesheet, 0, 768, 64, 64, 2, 0.1, 0, 0, false, true)
        );
        this.animations[3].push(
            new Animator(this.spritesheet, 0, 832, 64, 64, 2, 0.1, 0, 0, false, true)
        );
        this.animations[3].push(
            new Animator(this.spritesheet, 0, 768, 64, 64, 2, 0.1, 0, 0, false, true)
        );

        // death animations: left, right, up, down
        this.animations[4].push(
            new Animator(this.spritesheet, 0, 960, 64, 64, 8, 0.16, 0, 0, false, true)
        );
        this.animations[4].push(
            new Animator(this.spritesheet, 0, 896, 64, 64, 8, 0.16, 0, 0, false, true)
        );
        this.animations[4].push(
            new Animator(this.spritesheet, 0, 960, 64, 64, 8, 0.16, 0, 0, false, true)
        );
        this.animations[4].push(
            new Animator(this.spritesheet, 0, 896, 64, 64, 8, 0.16, 0, 0, false, true)
        );

        // dash animations: front-left, front-right, back-left, back-right
        this.animations[5].push(
            new Animator(this.dash_spritesheet, 0, 0, 64, 64, 9, 0.03, 15, 15, false, false)
        );
        this.animations[5].push(
            new Animator(this.dash_spritesheet, 0, 64, 64, 64, 9, 0.03, 15, 15, false, false)
        );
        this.animations[5].push(
            new Animator(this.dash_spritesheet, 0, 128, 64, 64, 9, 0.03, 15, 15, false, false)
        );
        this.animations[5].push(
            new Animator(this.dash_spritesheet, 0, 196, 64, 64, 9, 0.03, 15, 15, false, false)
        );
    }

    update() {
        // don't update if cursor isnt locked
        if (!this.game.locked) {
            this.state = 0;
            return;
        }

        // update cooldowns
        if (this.dashCooldown > 0) this.dashCooldown -= this.game.clockTick;
        if (this.slideCooldown > 0) this.slideCooldown -= this.game.clockTick;
        if (this.attackCooldown > 0) this.attackCooldown -= this.game.clockTick;

        // reset for debugging
        if (this.game.keys.r && params.DEBUG) {
            this.x = this.game.ctx.canvas.width / 2;
            this.y = this.game.ctx.canvas.height / 2;
        }

        // handle animation cancelling of sliding
        if (
            this.isSliding &&
            !this.animations[this.state][this.direction].isDone() &&
            this.animations[this.state][this.direction].currentFrame() > 5 &&
            this.game.keys.q
        ) {
            ASSET_MANAGER.setVolume(0.25);
            ASSET_MANAGER.playAudio("./sfx/sword_slash.mp3");
            this.isAttacking = true;
            this.attackCooldown = 0.25;
            this.isSliding = false;
            this.animations[this.state][this.direction].reset();
            this.state = 2;
            this.calculateAttackDir();
        }

        // if sliding, update sliding position
        if (this.isSliding && !this.animations[this.state][this.direction].isDone()) {
            var current_frame = this.animations[this.state][this.direction].currentFrame();
            if (this.slideDirection.x != 0 && this.slideDirection.y != 0) {
                this.x += (8 - current_frame) * 177 * this.game.clockTick * this.slideDirection.x;
                this.y += (8 - current_frame) * 177 * this.game.clockTick * this.slideDirection.y;
            } else {
                this.x += (8 - current_frame) * 250 * this.game.clockTick * this.slideDirection.x;
                this.y += (8 - current_frame) * 250 * this.game.clockTick * this.slideDirection.y;
            }
            this.updateBoundingBox();
            return;

            // if done sliding, reset sliding animation
        } else if (this.isSliding && this.animations[this.state][this.direction].isDone()) {
            this.isSliding = false;
            this.animations[this.state][this.direction].reset();
            this.currSpeed = this.maxSpeed;
        }

        // if attacking, dont allow other input
        if (this.isAttacking && !this.animations[this.state][this.direction].isDone()) {
            var curr_frame = this.animations[this.state][this.direction].currentFrame();
            if (curr_frame == 6) return;
            if (this.direction == 0) {
                this.x -= Math.pow(3 - (curr_frame % 3), 2) * this.game.clockTick * 8;
            } else if (this.direction == 1) {
                this.x += Math.pow(3 - (curr_frame % 3), 2) * this.game.clockTick * 8;
            } else if (this.direction == 2) {
                this.y -= Math.pow(3 - (curr_frame % 3), 2) * this.game.clockTick * 5;
            } else {
                this.y += Math.pow(3 - (curr_frame % 3), 2) * this.game.clockTick * 5;
            }
            this.updateBoundingBox();
            this.updateAttackBoundingBox(curr_frame);
            return;
        } else if (this.isAttacking && this.animations[this.state][this.direction].isDone()) {
            this.isAttacking = false;
            this.animations[this.state][this.direction].reset();
            this.state = 0;
            this.attackBoundingBox = null;
        }

        // capture input booleans
        var left = this.game.keys.a;
        var right = this.game.keys.d;
        var up = this.game.keys.w;
        var down = this.game.keys.s;

        var dash = this.game.keys.e;
        var slide = this.game.keys[" "];

        var attack = this.game.keys.q;
        var sprint = this.game.keys.Shift;

        // set direction (priority based on direction pressed);
        if (left) this.direction = 0;
        else if (right) this.direction = 1;
        else if (up) this.direction = 2;
        else if (down) this.direction = 3;

        // handle velocity + acceleration updates
        if (left || right || up || down) {
            this.currSpeed = Math.min(
                this.maxSpeed,
                this.currSpeed + this.speedAccel * this.game.clockTick
            );
        } else {
            this.currSpeed = Math.max(
                this.minSpeed,
                this.currSpeed - this.speedAccel * this.game.clockTick
            );
        }

        // if able to slide, slide
        if (slide && this.slideCooldown <= 0 && (left || right || up || down)) {
            this.calculateSlideDir(left, right, up, down);
            this.state = 5;
            this.isSliding = true;
            this.slideCooldown = 1.5;
        }
        // if able to dash, dash
        else if (dash && this.dashCooldown <= 0) {
            var dist = Math.sqrt(
                Math.pow(this.x - this.game.mouse.x, 2) + Math.pow(this.y - this.game.mouse.y, 2)
            );

            if (dist < this.maxDashDistance) {
                this.x =
                    this.game.mouse.x -
                    (this.animations[this.state][this.direction].getWidth() * 3) / 2;
                this.y =
                    this.game.mouse.y -
                    (this.animations[this.state][this.direction].getHeight() * 3) / 2;
                this.dashCooldown = 5;
            }
        }
        // if able to attack, attack
        else if (attack && this.attackCooldown <= 0) {
            ASSET_MANAGER.setVolume(0.25);
            ASSET_MANAGER.playAudio("./sfx/sword_slash.mp3");
            this.state = 2;
            this.isAttacking = true;
            this.attackCooldown = 0.25;
            this.calculateAttackDir();
        }
        // if movement input, move
        else if (left || right || up || down) {
            this.state = 1;

            var prev_x = this.x;
            var prev_y = this.y;

            // horizontal movement
            if (left && !right) this.x -= this.currSpeed * this.game.clockTick;
            else if (right && !left) this.x += this.currSpeed * this.game.clockTick;

            // vertical movement
            if (up && !down) this.y -= this.currSpeed * 0.75 * this.game.clockTick;
            else if (!up && down) this.y += this.currSpeed * 0.75 * this.game.clockTick;
            this.updateBoundingBox();
        }
        // otherwise, player is idle
        else {
            this.state = 0;
        }
    }

    draw(ctx) {
        // TODO: handle pause menu

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

        this.animations[this.state][this.direction].drawFrame(
            this.game.clockTick,
            ctx,
            this.x,
            this.y,
            2.5
        );

        // draw hurt box
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.rect(
            this.boundingBox.x,
            this.boundingBox.y,
            this.boundingBox.width,
            this.boundingBox.height
        );
        ctx.stroke();

        // draw hit box
        if (this.attackBoundingBox) {
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.rect(
                this.attackBoundingBox.x,
                this.attackBoundingBox.y,
                this.attackBoundingBox.width,
                this.attackBoundingBox.height
            );
            ctx.stroke();
        }
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.fillText("Knight", this.x + 28, this.y + 29, 48);

        ctx.fillStyle = "black";
        ctx.fillRect(this.x + 29, this.y + 35, 32, 5);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x + 28, this.y + 34, 32, 5);
        ctx.fillStyle = "#32CD32";
        ctx.fillRect(this.x + 28, this.y + 34, (this.health / 100) * 32, 5);
        ctx.restore();
    }

    updateAttackBoundingBox(current_frame) {
        if (true) {
            if (this.direction == 0) {
                this.attackBoundingBox = new BoundingBox(this.x + 0, this.y + 40, 48, 64);
            } else if (this.direction == 1) {
                this.attackBoundingBox = new BoundingBox(this.x + 48, this.y + 40, 48, 64);
            } else if (this.direction == 2) {
                this.attackBoundingBox = new BoundingBox(this.x + 10, this.y + 32, 64, 48);
            } else {
                this.attackBoundingBox = new BoundingBox(this.x + 14, this.y + 76, 68, 58);
            }
        } else {
            this.attackBoundingBox = null;
        }
    }

    updateBoundingBox() {
        this.boundingBox = new BoundingBox(this.x + 28, this.y + 48, 32, 64);
    }

    calculateAttackDir() {
        var player_x = this.x + (64 * 3) / 2;
        var player_y = this.y + (64 * 3) / 2;

        var mouse_x = this.game.mouse.x;
        var mouse_y = this.game.mouse.y;

        var x_diff = player_x - mouse_x;
        var y_diff = player_y - mouse_y;

        if (Math.abs(x_diff) != Math.abs(y_diff)) {
            if (x_diff > 0 && Math.abs(x_diff) > Math.abs(y_diff)) {
                this.direction = 0;
                return;
            }
            if (x_diff < 0 && Math.abs(x_diff) > Math.abs(y_diff)) {
                this.direction = 1;
                return;
            } else if (y_diff > 0 && Math.abs(x_diff) < Math.abs(y_diff)) {
                this.direction = 2;
                return;
            } else {
                this.direction = 3;
                return;
            }
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
            this.direction = 2; // replace with up dash
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
}
