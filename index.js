const engine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// sfx downloads
ASSET_MANAGER.queueDownload("./sfx/sword_slash.mp3");

// knight-related downloads
ASSET_MANAGER.queueDownload("./sprites/knight.png");
ASSET_MANAGER.queueDownload("./sprites/knight_dash.png");

// enemy-related downloads
ASSET_MANAGER.queueDownload("./sprites/skeleton.png");

// cursor downloads
ASSET_MANAGER.queueDownload("./sprites/cursor.png");

// misc asset downloads
ASSET_MANAGER.queueDownload("./sprites/items.png");

// tileset downloads
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

  // add entities here, order matters for priority atm
  const knight = new Knight(engine, ctx.canvas.width / 2, ctx.canvas.height / 2);
  //engine.addEntity(new HUD(engine, knight));
  engine.addEntity(new Cursor(engine));
  engine.addEntity(new Skeleton(engine, ctx.canvas.width / 2 + 40, ctx.canvas.height / 2));
  engine.addEntity(new Skeleton(engine, ctx.canvas.width / 2 + 80, ctx.canvas.height / 2));
  engine.addEntity(new Skeleton(engine, ctx.canvas.width / 2 + 120, ctx.canvas.height / 2));
  engine.addEntity(new Skeleton(engine, ctx.canvas.width / 2 + 160, ctx.canvas.height / 2));
  engine.addEntity(knight);
  // engine.addEntity(new Map(engine));
  // engine.addEntity(new Item(engine, ctx.canvas.width / 2, ctx.canvas.height / 2));

  // initialize and start engine
  engine.init(ctx);
  engine.start();
});
