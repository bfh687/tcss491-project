class Knight {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knight.png");
        this.animations = [];
        this.loadAnimations();

        // states: idle (0), running (1), attack (2), damaged (3), crouch walking (4), sliding (5)
        this.state = 0;

        // directions: left (0), right (1), up (2), down (3)
        this.direction = 3;

        // information about dashing
        this.isDashing = false;
        this.dashCooldown = 5;
        this.maxDashDistance = 300;

        // information about attacking
        this.isAttacking = false;
        this.attackCooldown = 0.25;
    }

    loadAnimations() {
        // push state arrays
        this.animations.push([], [], [], [], []);

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
            new Animator(this.spritesheet, 0, 320, 64, 64, 10, 0.08, 15, 15, false, true)
        );
        this.animations[1].push(
            new Animator(this.spritesheet, 0, 256, 64, 64, 10, 0.08, 15, 15, false, true)
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
    }

    update() {
        // don't update if cursor isnt locked
        if (!this.game.locked) {
            this.state = 0;
            return;
        }

        // if attacking, dont allow other input
        if (this.isAttacking && !this.animations[this.state][this.direction].isDone()) {
            return;
        } else if (this.isAttacking && this.animations[this.state][this.direction].isDone()) {
            this.isAttacking = false;
            this.animations[this.state][this.direction].reset();
            this.state = 0;
        }

        // speed variable
        const speed = 350;

        // capture input booleans
        var left = this.game.keys.a;
        var right = this.game.keys.d;
        var up = this.game.keys.w;
        var down = this.game.keys.s;

        var dash = this.game.keys.e;

        var attack = this.game.left_click;
        var sprint = this.game.keys.Shift;

        // set direction (priority based on direction pressed);
        if (left) this.direction = 0;
        else if (right) this.direction = 1;
        else if (up) this.direction = 2;
        else if (down) this.direction = 3;

        // update cooldowns
        if (this.dashCooldown > 0) this.dashCooldown -= this.game.clockTick;
        if (this.attackCooldown > 0) this.attackCooldown -= this.game.clockTick;

        if (dash && this.dashCooldown <= 0) {
            var dist = Math.sqrt(
                Math.pow(this.x - this.game.mouse.x, 2) + Math.pow(this.y - this.game.mouse.y, 2)
            );

            // or make it go fixed distance along the line?
            if (dist < this.maxDashDistance) {
                this.x =
                    this.game.mouse.x -
                    (this.animations[this.state][this.direction].getWidth() * 3) / 2;
                this.y =
                    this.game.mouse.y -
                    (this.animations[this.state][this.direction].getHeight() * 3) / 2;

                this.dashCooldown = 5;
            }
        } else if (attack && this.attackCooldown <= 0) {
            this.state = 2;
            this.isAttacking = true;
            this.attackCooldown = 0.25;
            this.calculateAttackDir();
        } else if (left || right || up || down) {
            this.state = 1;

            // horizontal movement
            if (left && !right) this.x -= speed * this.game.clockTick;
            else if (right && !left) this.x += speed * this.game.clockTick;

            // vertical movement
            if (up && !down) this.y -= speed * 0.75 * this.game.clockTick;
            else if (!up && down) this.y += speed * 0.75 * this.game.clockTick;
        } else {
            this.state = 0;
        }
    }

    draw(ctx) {
        this.animations[this.state][this.direction].drawFrame(
            this.game.clockTick,
            ctx,
            this.x,
            this.y,
            3
        );
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
}
