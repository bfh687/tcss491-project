class HUD {
    constructor(game, knight) {
        Object.assign(this, { game, knight });
    }

    update() {}

    draw(ctx) {
        ctx.save();

        var dash_cooldown = (this.knight.dashCooldown / 5) * 100;
        var attack_cooldown = (this.knight.attackCooldown / 0.25) * 100;

        ctx.fillStyle = "white";

        if (dash_cooldown) {
            ctx.fillText("DASH", 20, 10);
            ctx.fillRect(20, 20, 100 - dash_cooldown, 10);
        }

        if (attack_cooldown) {
            ctx.fillText("ATTACK", 20, 50);
            ctx.fillRect(20, 60, 100 - attack_cooldown, 10);
        }

        ctx.restore();
    }
}
