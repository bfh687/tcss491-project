class Cursor {
    constructor(game) {
        Object.assign(this, { game });
    }

    update() {}

    draw(ctx) {
        if (this.game.locked) {
            ctx.beginPath();
            ctx.arc(this.game.mouse.x, this.game.mouse.y, 5, 0, 2 * Math.PI, false);
            ctx.fillStyle = "white";
            ctx.fill();
        }
    }
}
