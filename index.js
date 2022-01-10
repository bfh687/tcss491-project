const engine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// queue downloads here

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    // add entities here

    // initialize and start engine
    engine.init(ctx);
    engine.start();
});
