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
    }

    loadAnimations() {
        // push state arrays
        this.animations.push([], [], [], [], []);

        // idle animations: left, right, up, down
        this.animations[0].push(
            new Animator(this.spritesheet, 0, 128, 64, 64, 3, 0.16, 0, 0, false, true)
        );
        this.animations[0].push(
            new Animator(this.spritesheet, 0, 64, 64, 64, 3, 0.16, 0, 0, false, true)
        );
        this.animations[0].push(
            new Animator(this.spritesheet, 0, 192, 64, 64, 3, 0.16, 0, 0, false, true)
        );
        this.animations[0].push(
            new Animator(this.spritesheet, 0, 0, 64, 64, 3, 0.16, 0, 0, false, true)
        );

        // running animations: left, right, up, down
        this.animations[1].push(
            new Animator(this.spritesheet, 0, 320, 64, 64, 10, 0.1, 0, 0, false, true)
        );
        this.animations[1].push(
            new Animator(this.spritesheet, 0, 256, 64, 64, 10, 0.1, 0, 0, false, true)
        );
        this.animations[1].push(
            new Animator(this.spritesheet, 64, 448, 64, 64, 7, 0.1, 0, 0, false, true)
        );
        this.animations[1].push(
            new Animator(this.spritesheet, 64, 384, 64, 64, 8, 0.1, 0, 0, false, true)
        );

        // attack animations: left, right, up, down
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 576, 64, 64, 7, 0.08, 0, 0, false, false)
        );
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 512, 64, 64, 7, 0.08, 0, 0, false, false)
        );
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 704, 64, 64, 7, 0.08, 0, 0, false, false)
        );
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 640, 64, 64, 7, 0.08, 0, 0, false, false)
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
        const speed = 300;

        var left = this.game.keys.a;
        var right = this.game.keys.d;
        var up = this.game.keys.w;
        var down = this.game.keys.s;

        var attack = this.game.keys.q;
        var sprint = this.game.keys.Shift;

        if (up) this.direction = 2;
        else if (down) this.direction = 3;
        else if (left) this.direction = 0;
        else if (right) this.direction = 1;

        if (this.game.keys.q) {
            this.state = 2;
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
        // calculate attack direction
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

        //negative positive, positive positive, positive negative, negative negative
    }
}
