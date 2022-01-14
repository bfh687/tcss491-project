const engine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// queue knight-related downloads
ASSET_MANAGER.queueDownload("./sprites/knight.png");
ASSET_MANAGER.queueDownload("./sprites/knight_dash.png");

// queue tileset downloads
ASSET_MANAGER.queueDownload("./sprites/map/grass_tileset.png");
ASSET_MANAGER.queueDownload("./sprites/map/ground_tileset.png");
ASSET_MANAGER.queueDownload("./sprites/map/wall_tileset.png");
ASSET_MANAGER.queueDownload("./sprites/map/plant_shadows.png");
ASSET_MANAGER.queueDownload("./sprites/map/plants.png");
ASSET_MANAGER.queueDownload("./sprites/map/props.png");
ASSET_MANAGER.queueDownload("./sprites/map/structures.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    // add entities here
    const knight = new Knight(engine, ctx.canvas.width / 2, ctx.canvas.height / 2);
    engine.addEntity(new HUD(engine, knight));
    engine.addEntity(new Cursor(engine));
    engine.addEntity(knight);
    engine.addEntity(new Map(engine));

    // initialize and start engine
    engine.init(ctx);
    engine.start();
});
