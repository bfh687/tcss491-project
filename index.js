const engine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// queue downloads here
ASSET_MANAGER.queueDownload("./sprites/adventurer.png");
ASSET_MANAGER.queueDownload("./sprites/adventurer_left.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    // add entities here
    engine.addEntity(new Adventurer(engine, ctx.canvas.width / 2 - 25, ctx.canvas.height / 2 - 75));

    // initialize and start engine
    engine.init(ctx);
    engine.start();
});
