class Knight {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knight.png");
        this.animations = [];
        this.loadAnimations();

        // states: idle (0), running (1), attack (2), damaged (3), crouch walking (4), sliding (5)
        this.state = 4;

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
            new Animator(this.spritesheet, 64, 320, 64, 64, 10, 0.16, 0, 0, false, true)
        );
        this.animations[1].push(
            new Animator(this.spritesheet, 64, 256, 64, 64, 10, 0.16, 0, 0, false, true)
        );
        this.animations[1].push(
            new Animator(this.spritesheet, 64, 448, 64, 64, 7, 0.16, 0, 0, false, true)
        );
        this.animations[1].push(
            new Animator(this.spritesheet, 64, 384, 64, 64, 8, 0.16, 0, 0, false, true)
        );

        // attack animations: left, right, up, down
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 576, 64, 64, 7, 0.16, 0, 0, false, true)
        );
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 512, 64, 64, 7, 0.16, 0, 0, false, true)
        );
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 704, 64, 64, 7, 0.16, 0, 0, false, true)
        );
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 640, 64, 64, 7, 0.16, 0, 0, false, true)
        );

        // damaged animations: left, right, up, down
        this.animations[3].push(
            new Animator(this.spritesheet, 0, 832, 64, 64, 2, 0.08, 0, 0, false, true)
        );
        this.animations[3].push(
            new Animator(this.spritesheet, 0, 768, 64, 64, 2, 0.08, 0, 0, false, true)
        );
        this.animations[3].push(
            new Animator(this.spritesheet, 0, 832, 64, 64, 2, 0.08, 0, 0, false, true)
        );
        this.animations[3].push(
            new Animator(this.spritesheet, 0, 768, 64, 64, 2, 0.08, 0, 0, false, true)
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
        const speed = 225;

        var left = this.game.keys.a;
        var right = this.game.keys.d;
        var up = this.game.keys.w;
        var down = this.game.keys.s;
        var attack = this.game.keys.q;

        if (left) this.direction = 0;
        if (right) this.direction = 1;
        if (up) this.direction = 2;
        if (down) this.direction = 3;
    }

    draw(ctx) {
        for (var i = 0; i < this.animations.length; i++) {
            this.animations[i][this.direction].drawFrame(
                this.game.clockTick,
                ctx,
                ctx.canvas.width / 2 - (64 * 5 * 3) / 2 + 64 * 3 * i,
                this.y - (64 * 3) / 2,
                3
            );
        }

        var state_text = "";
        if (this.direction == 0) state_text = "LEFT";
        else if (this.direction == 1) state_text = "RIGHT";
        else if (this.direction == 2) state_text = "UP";
        else state_text = "DOWN";

        ctx.fillStyle = "white";
        ctx.font = "normal 20px Arial";
        ctx.fillText(
            state_text,
            ctx.canvas.width / 2 - ctx.measureText(state_text).width / 2,
            ctx.canvas.height / 2 + 64
        );
        ctx.fillText(
            "Animation and User Input Demo",
            ctx.canvas.width / 2 - ctx.measureText("Animation and User Input Demo").width / 2,
            ctx.canvas.height / 2 + 96
        );
    }
}
