class Adventurer {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet_right = ASSET_MANAGER.getAsset("./sprites/adventurer.png");
        this.spritesheet_left = ASSET_MANAGER.getAsset("./sprites/adventurer_left.png");
        this.animations = [];
        this.loadAnimations();

        // states: idle (0), walking (1), running (2), crouching (3), crouch walking (4), slideing (5)
        this.state = 0;

        // directions: left (0), right (1)
        this.direction = 1;
    }

    loadAnimations() {
        // idle animation
        this.animations.push([]);
        this.animations[0].push(
            new Animator(this.spritesheet_left, 0, 0, 50, 37, 4, 0.16, 15, 12, false, true)
        );
        this.animations[0].push(
            new Animator(this.spritesheet_right, 0, 0, 50, 37, 4, 0.16, 12, 15, false, true)
        );

        // walking animation
        this.animations.push([]);
        this.animations[1].push(
            new Animator(this.spritesheet_left, 7750, 0, 50, 37, 6, 0.16, 10, 17, false, true)
        );
        this.animations[1].push(
            new Animator(this.spritesheet_right, 7750, 0, 50, 37, 6, 0.16, 17, 10, false, true)
        );

        // running animation
        this.animations.push([]);
        this.animations[2].push(
            new Animator(this.spritesheet_left, 400, 0, 50, 37, 6, 0.16, 10, 15, false, true)
        );
        this.animations[2].push(
            new Animator(this.spritesheet_right, 400, 0, 50, 37, 6, 0.16, 15, 10, false, true)
        );

        // crouch animation
        this.animations.push([]);
        this.animations[3].push(
            new Animator(this.spritesheet_left, 200, 0, 50, 37, 4, 0.16, 13, 13, false, true)
        );
        this.animations[3].push(
            new Animator(this.spritesheet_right, 200, 0, 50, 37, 4, 0.16, 13, 13, false, true)
        );

        // crouch walking animation
        this.animations.push([]);
        this.animations[4].push(
            new Animator(this.spritesheet_left, 8050, 0, 50, 37, 6, 0.16, 13, 13, false, true)
        );
        this.animations[4].push(
            new Animator(this.spritesheet_right, 8050, 0, 50, 37, 6, 0.16, 13, 13, false, true)
        );

        // slide animation
        this.animations.push([]);
        this.animations[5].push(
            new Animator(this.spritesheet_left, 1200, 0, 50, 37, 5, 0.16, 10, 5, false, true)
        );
        this.animations[5].push(
            new Animator(this.spritesheet_right, 1200, 0, 50, 37, 5, 0.16, 5, 10, false, true)
        );
    }

    update() {
        const speed = 225;

        var left = this.game.keys.a;
        var right = this.game.keys.d;
        var sprint = this.game.keys.Shift;
        var crouch = this.game.keys.c;
        var slide = this.game.keys[" "];

        if (left) this.direction = 0;
        if (right) this.direction = 1;

        if ((left || right) && sprint && slide) {
            this.state = 5;
            if (left && !right) {
                this.x -= speed * 3 * this.game.clockTick;
            } else if (!left && right) {
                this.x += speed * 3 * this.game.clockTick;
            }
        } else if ((left || right) && sprint) {
            this.state = 2;
            if (left && !right) {
                this.x -= speed * 2 * this.game.clockTick;
            } else if (!left && right) {
                this.x += speed * 2 * this.game.clockTick;
            }
        } else if ((left || right) && crouch) {
            this.state = 4;
            if (left && !right) {
                this.x -= (speed / 2) * this.game.clockTick;
            } else if (!left && right) {
                this.x += (speed / 2) * this.game.clockTick;
            }
        } else if (crouch) {
            this.state = 3;
        } else if (left || right) {
            this.state = 1;
            if (left && !right) {
                this.x -= speed * this.game.clockTick;
            } else if (!left && right) {
                this.x += speed * this.game.clockTick;
            }
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
}
