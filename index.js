const engine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// sfx downloads
ASSET_MANAGER.queueDownload("./sfx/sword_slash.mp3");

// knight-related downloads
ASSET_MANAGER.queueDownload("./sprites/knight.png");
ASSET_MANAGER.queueDownload("./sprites/knight_dash.png");

// enemy-related downloads
ASSET_MANAGER.queueDownload("./sprites/skeleton.png");
ASSET_MANAGER.queueDownload("./sprites/eyeball.png");

// cursor downloads
ASSET_MANAGER.queueDownload("./sprites/cursor.png");

// misc asset downloads
ASSET_MANAGER.queueDownload("./sprites/items.png");
ASSET_MANAGER.queueDownload("./sprites/geronimo's_goggles.png");

// tileset downloads
ASSET_MANAGER.queueDownload("./sprites/map/0000-Level_0.png");
ASSET_MANAGER.queueDownload("./sprites/map/0000-Hub_Level.png");
ASSET_MANAGER.queueDownload("./sprites/hub.png");

ASSET_MANAGER.downloadAll(() => {
  const canvas = document.getElementById("gameWorld");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // initialize and start engine
  engine.init(ctx);

  // setup global variables
  params.BLOCKWIDTH = params.BITWIDTH * params.SCALE;
  params.CANVAS_WIDTH = canvas.width;
  params.CANVAS_HEIGHT = canvas.height;

  // initialize scene manager and start engine
  new SceneManager(engine);
  engine.start();
});
