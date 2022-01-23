class Map {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/map/grass_tileset.png");;


    }

    update() {

    };

    draw(ctx) {
        let brickCount = this.w / params.BLOCKWIDTH;
        for (var i = 0; i < brickCount; i++) {
            ctx.drawImage(this.spritesheet,0,0, 16,16, this.x + i * params.BLOCKWIDTH - this.game.camera.x, this.y, params.BLOCKWIDTH, params.BLOCKWIDTH);
            ctx.drawImage(this.spritesheet, 0,0,16,16, this.x + i * params.BLOCKWIDTH - this.game.camera.x, this.y + params.BLOCKWIDTH, params.BLOCKWIDTH, params.BLOCKWIDTH);
        }
    };
    // draw(ctx) {
    //     // draw border
    //     // top-left corner
    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     0,
    //     //     0,
    //     //     64,
    //     //     64,
    //     //     ctx.canvas.width / 2 - 128 - 32 - 8,
    //     //     ctx.canvas.height / 2 - 96 - 8,
    //     //     64,
    //     //     64
    //     // );

    //     // // top-right corner
    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     96,
    //     //     0,
    //     //     32,
    //     //     64,
    //     //     ctx.canvas.width / 2 + 256 - 24,
    //     //     ctx.canvas.height / 2 - 96 - 8,
    //     //     32,
    //     //     64
    //     // );

    //     // // bottom-left corner
    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     128,
    //     //     120,
    //     //     128,
    //     //     64,
    //     //     ctx.canvas.width / 2 - 128 - 32,
    //     //     ctx.canvas.height / 2 + 128 - 8,
    //     //     128,
    //     //     64
    //     // );

    //     // // bottom-right  corner
    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     216,
    //     //     120,
    //     //     60,
    //     //     64,
    //     //     ctx.canvas.width / 2 + 290 - 64 - 8 - 2,
    //     //     ctx.canvas.height / 2 + 128 - 8,
    //     //     60,
    //     //     64
    //     // );

    //     // // vert wall
    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     256 + 32,
    //     //     0,
    //     //     32,
    //     //     128,
    //     //     ctx.canvas.width / 2 - 128 - 8,
    //     //     ctx.canvas.height / 2 - 96,
    //     //     32,
    //     //     128
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     256 + 32,
    //     //     0,
    //     //     32,
    //     //     128,
    //     //     ctx.canvas.width / 2 + 264 - 8,
    //     //     ctx.canvas.height / 2 - 96,
    //     //     32,
    //     //     128
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     256 + 32,
    //     //     0,
    //     //     32,
    //     //     128,
    //     //     ctx.canvas.width / 2 + 264 - 8,
    //     //     ctx.canvas.height / 2,
    //     //     32,
    //     //     128
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     256 + 32,
    //     //     0,
    //     //     32,
    //     //     128,
    //     //     ctx.canvas.width / 2 - 128 - 8,
    //     //     ctx.canvas.height / 2,
    //     //     32,
    //     //     128
    //     // );

    //     // // horiz wall
    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     256 + 128,
    //     //     0,
    //     //     128,
    //     //     64,
    //     //     ctx.canvas.width / 2 - 128,
    //     //     ctx.canvas.height / 2 - 104,
    //     //     128,
    //     //     64
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     256 + 128,
    //     //     0,
    //     //     128,
    //     //     64,
    //     //     ctx.canvas.width / 2 - 128,
    //     //     ctx.canvas.height / 2 + 96,
    //     //     128,
    //     //     64
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     256 + 128,
    //     //     0,
    //     //     128,
    //     //     64,
    //     //     ctx.canvas.width / 2 - 128 + 96,
    //     //     ctx.canvas.height / 2 + 96,
    //     //     128,
    //     //     64
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     256 + 128,
    //     //     0,
    //     //     128,
    //     //     64,
    //     //     ctx.canvas.width / 2 - 128 + 96 * 2,
    //     //     ctx.canvas.height / 2 + 96,
    //     //     128,
    //     //     64
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     256 + 128,
    //     //     0,
    //     //     128,
    //     //     64,
    //     //     ctx.canvas.width / 2 - 128 + 96 * 3,
    //     //     ctx.canvas.height / 2 + 96,
    //     //     128,
    //     //     64
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     256 + 128,
    //     //     0,
    //     //     128,
    //     //     64,
    //     //     ctx.canvas.width / 2 - 128 + 96,
    //     //     ctx.canvas.height / 2 - 104,
    //     //     128,
    //     //     64
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     256 + 128,
    //     //     0,
    //     //     128,
    //     //     64,
    //     //     ctx.canvas.width / 2 - 128 + 96 * 2 + 16,
    //     //     ctx.canvas.height / 2 - 104,
    //     //     128,
    //     //     64
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[2],
    //     //     256 + 128,
    //     //     0,
    //     //     128,
    //     //     64,
    //     //     ctx.canvas.width / 2 - 128 + 96 * 3,
    //     //     ctx.canvas.height / 2 - 104,
    //     //     128,
    //     //     64
    //     // );

    //     // // draw floor tiles
    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 3,
    //     //     32 * 6,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 + 32 * 2,
    //     //     ctx.canvas.height / 2 + 32 * 0,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 0,
    //     //     32 * 3,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 - 32 * 4,
    //     //     ctx.canvas.height / 2 + 32 * 0,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 0,
    //     //     32 * 3,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 - 32 * 4,
    //     //     ctx.canvas.height / 2 + 32 * 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 0,
    //     //     32 * 3,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 + 32 * 6,
    //     //     ctx.canvas.height / 2 + 32 * 0,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 7,
    //     //     32 * 6,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 - 32 * 2,
    //     //     ctx.canvas.height / 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 2,
    //     //     32 * 5,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 - 32 * 2,
    //     //     ctx.canvas.height / 2 + 32 * 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 0,
    //     //     32 * 3,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 + 32 * 4,
    //     //     ctx.canvas.height / 2 + 32 * 0,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 0,
    //     //     32 * 0,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 + 32 * 4,
    //     //     ctx.canvas.height / 2 - 32 * 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 3,
    //     //     32 * 1,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 + 32 * 2,
    //     //     ctx.canvas.height / 2 - 32 * 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 0,
    //     //     32 * 0,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 - 32 * 2,
    //     //     ctx.canvas.height / 2 - 32 * 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 3,
    //     //     32 * 1,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 + 32 * 0,
    //     //     ctx.canvas.height / 2 - 32 * 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 7,
    //     //     32 * 3,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 - 32 * 4,
    //     //     ctx.canvas.height / 2 - 32 * 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 5,
    //     //     32 * 3,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 - 32 * 2,
    //     //     ctx.canvas.height / 2 - 32 * 1,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 4,
    //     //     32 * 7,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 + 32 * 0,
    //     //     ctx.canvas.height / 2 + 32 * 0,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 0,
    //     //     32 * 4,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 + 32 * 2,
    //     //     ctx.canvas.height / 2 + 32 * 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 5,
    //     //     32 * 5,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 + 32 * 6,
    //     //     ctx.canvas.height / 2 - 32 * 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 0,
    //     //     32 * 4,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 + 32 * 0,
    //     //     ctx.canvas.height / 2 + 32 * 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 0,
    //     //     32 * 4,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 + 32 * 4,
    //     //     ctx.canvas.height / 2 + 32 * 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // ctx.drawImage(
    //     //     this.spritesheet[0],
    //     //     32 * 5,
    //     //     32 * 4,
    //     //     32,
    //     //     32,
    //     //     ctx.canvas.width / 2 + 32 * 6,
    //     //     ctx.canvas.height / 2 + 32 * 2,
    //     //     32 * 2,
    //     //     32 * 2
    //     // );

    //     // // draw tree + shadows

    //     // ctx.save();
    //     // ctx.globalAlpha = 0.35;
    //     // ctx.drawImage(
    //     //     this.spritesheet[3],
    //     //     128 + 32,
    //     //     0,
    //     //     128,
    //     //     256 - 96,
    //     //     ctx.canvas.width / 2 - 16,
    //     //     ctx.canvas.height / 2 - 224,
    //     //     32 * 6,
    //     //     32 * 7
    //     // );
    //     // ctx.restore();

    //     // ctx.drawImage(
    //     //     this.spritesheet[4],
    //     //     128 + 32,
    //     //     0,
    //     //     128,
    //     //     256 - 96,
    //     //     ctx.canvas.width / 2 - 16,
    //     //     ctx.canvas.height / 2 - 224,
    //     //     32 * 6,
    //     //     32 * 7
    //     // );

    //     // // draw bush

    //     // ctx.save();
    //     // ctx.globalAlpha = 0.45;

    //     // ctx.drawImage(
    //     //     this.spritesheet[3],
    //     //     0 + 64 * 2,
    //     //     160,
    //     //     86,
    //     //     86,
    //     //     ctx.canvas.width / 2 + 120,
    //     //     ctx.canvas.height / 2 - 100,
    //     //     86 * 1.3,
    //     //     86 * 1.3
    //     // );
    //     // ctx.restore();
    //     // ctx.drawImage(
    //     //     this.spritesheet[4],
    //     //     0 + 64 * 2,
    //     //     160,
    //     //     86,
    //     //     86,
    //     //     ctx.canvas.width / 2 + 120,
    //     //     ctx.canvas.height / 2 - 100,
    //     //     86 * 1.3,
    //     //     86 * 1.3
    //     // );
    // }
}
