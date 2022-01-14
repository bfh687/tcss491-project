class Cursor {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cursor.png");
    }

    update() {}

    draw(ctx) {
        if (this.game.locked) {
            ctx.drawImage(
                this.spritesheet,
                0,
                0,
                16,
                16,
                this.game.mouse.x,
                this.game.mouse.y,
                16,
                16
            );

            // ctx.beginPath();
            // ctx.arc(this.game.mouse.x, this.game.mouse.y, 5, 0, 2 * Math.PI, false);
            // ctx.fillStyle = "white";
            // ctx.fill();
        }
    }
}
