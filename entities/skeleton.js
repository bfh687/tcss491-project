class Skeleton {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/skeleton.png");
        this.animations = [];
        this.loadAnimations();

        // bounding box for collisions
        this.updateBoundingBox();

        // remove from world
        this.removeFromWorld = false;

        // states: idle (0), walking (1), attack (2), damaged (3), dying (4)
        this.state = 0;

        // directions: left (0), right (1)
        this.direction = 1;

        // information about stats
        this.health = 100;

        // information about attacking
        this.isAttacking = false;
        this.attackCooldown = 1;

        // information about stuns
        this.isStunned = false;
        this.stunDuration = 1;

        // information about skeleton movement
        this.maxSpeed = 100;
        this.speedAccel = 350;
        this.minSpeed = 75;
        this.currSpeed = this.minSpeed;
    }

    loadAnimations() {
        this.animations.push([], [], [], [], []);

        // idle animations: left, right
        this.animations[0].push(
            new Animator(this.spritesheet, 0, 0, 64, 64, 4, 0.16, 0, 0, false, true)
        );
        this.animations[0].push(
            new Animator(this.spritesheet, 0, 320, 64, 64, 4, 0.16, 0, 0, false, true)
        );

        // walking animations: left, right
        this.animations[1].push(
            new Animator(this.spritesheet, 0, 192, 64, 64, 12, 0.13, 0, 0, false, true)
        );
        this.animations[1].push(
            new Animator(this.spritesheet, 0, 512, 64, 64, 12, 0.13, 0, 0, false, true)
        );

        // attack animations: left, right
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 64, 64, 64, 13, 0.09, 0, 0, false, true)
        );
        this.animations[2].push(
            new Animator(this.spritesheet, 0, 396, 64, 64, 13, 0.09, 0, 0, false, true)
        );

        // damaged animations: left, right
        this.animations[3].push(
            new Animator(this.spritesheet, 0, 128, 64, 64, 3, 0.08, 0, 0, false, false)
        );
        this.animations[3].push(
            new Animator(this.spritesheet, 0, 448, 64, 64, 3, 0.08, 0, 0, false, false)
        );

        // death animations: left, right
        this.animations[4].push(
            new Animator(this.spritesheet, 0, 256, 64, 64, 12, 0.12, 0, 0, false, false)
        );
        this.animations[4].push(
            new Animator(this.spritesheet, 0, 576, 64, 64, 12, 0.12, 0, 0, false, false)
        );
    }

    update() {
        // if dead, remove from world
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

        // if damaged animation is playing, let it play out, otherwise go back to idle
        if (this.state == 3 && !this.animations[this.state][this.direction].isDone()) {
            return;
        } else {
            this.animations[this.state][this.direction].reset();
            this.state = 0;
        }

        // detect possible collisions
        this.game.entities.forEach((entity) => {
            if (entity.attackBoundingBox) {
                if (this.boundingBox.collide(entity.attackBoundingBox)) {
                    this.state = 3;
                    this.health -= entity.attackDamage;

                    // make enemy look at them
                    if (entity.boundingBox.left > this.boundingBox.left) this.direction = 1;
                    else this.direction = 0;

                    return;
                } else {
                    this.state = 0;
                }
            }
        });
    }

    draw(ctx) {
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
        ctx.restore();

        // draw shadows if not dying
        if (this.state != 4) {
            ctx.save();
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.ellipse(
                this.x + (this.animations[this.state][this.direction].getWidth() * 2.5) / 2 - 12,
                this.y + (this.animations[this.state][this.direction].getHeight() * 2.5) / 2 - 4,
                25 / 2,
                50 / 2,
                Math.PI / 4,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.restore();
        }

        // draw skeleton
        this.animations[this.state][this.direction].drawFrame(
            this.game.clockTick,
            ctx,
            this.x,
            this.y,
            2
        );

        ctx.save();
        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.fillText("Skeleton", this.x + 42, this.y + 12, 46);

        ctx.fillStyle = "black";
        ctx.fillRect(this.x + 43, this.y + 17, 46, 5);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x + 42, this.y + 16, 46, 5);
        ctx.fillStyle = "#32CD32";
        ctx.fillRect(this.x + 42, this.y + 16, (this.health / 100) * 46, 5);
        ctx.restore();
    }

    updateBoundingBox() {
        this.boundingBox = new BoundingBox(this.x + 42, this.y + 64, 46, 32);
    }
}
