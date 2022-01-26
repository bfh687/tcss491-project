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

// tileset downloads
ASSET_MANAGER.queueDownload("./sprites/map/grass_tileset.png");
ASSET_MANAGER.queueDownload("./sprites/map/ground_tileset.png");
ASSET_MANAGER.queueDownload("./sprites/map/wall_tileset.png");
ASSET_MANAGER.queueDownload("./sprites/map/plant_shadows.png");
ASSET_MANAGER.queueDownload("./sprites/map/plants.png");
ASSET_MANAGER.queueDownload("./sprites/map/props.png");
ASSET_MANAGER.queueDownload("./sprites/map/structures.png");
ASSET_MANAGER.queueDownload("./sprites/map/0000-Level_0.png");
ASSET_MANAGER.queueDownload("./sprites/hub.png");

ASSET_MANAGER.downloadAll(() => {
  const canvas = document.getElementById("gameWorld");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // initialize and start engine
  engine.init(ctx);

  params.BLOCKWIDTH = params.BITWIDTH * params.SCALE;

  params.CANVAS_WIDTH = canvas.width;
  params.CANVAS_HEIGHT = canvas.height;

  // initialize scene manager
  new SceneManager(engine);

  engine.start();
});
