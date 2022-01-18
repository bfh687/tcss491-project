class HUD {
    constructor(game, knight) {
        Object.assign(this, { game, knight });
        this.priority = Number.MAX_VALUE;
    }

    update() {}

    draw(ctx) {
        ctx.save();

        var dash_cooldown = (this.knight.dashCooldown / 5) * 100;
        var attack_cooldown = (this.knight.attackCooldown / 0.25) * 100;
        var slide_cooldown = (this.knight.slideCooldown / 1.5) * 100;

        ctx.fillStyle = "white";

        if (dash_cooldown) {
            ctx.fillText("DASH", 20, 10);
            ctx.fillRect(20, 20, 100 - dash_cooldown, 10);
        }

        if (attack_cooldown) {
            ctx.fillText("ATTACK", 20, 50);
            ctx.fillRect(20, 60, 100 - attack_cooldown, 10);
        }

        if (slide_cooldown) {
            ctx.fillText("SLIDE", 20, 90);
            ctx.fillRect(20, 100, 100 - slide_cooldown, 10);
        }

        // fps counter
        if (params.DEBUG) {
            ctx.fillText("FPS: " + Math.round(1.0 / this.game.clockTick), 20, 130);
        }

        ctx.restore();
    }
}
