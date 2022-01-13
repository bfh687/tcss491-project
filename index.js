const engine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// queue downloads here
ASSET_MANAGER.queueDownload("./sprites/knight.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    // add entities here
    const knight = new Knight(engine, ctx.canvas.height / 2, ctx.canvas.height / 2);
    engine.addEntity(new HUD(engine, knight));
    engine.addEntity(new Cursor(engine));
    engine.addEntity(knight);

    // initialize and start engine
    engine.init(ctx);
    engine.start();
});
