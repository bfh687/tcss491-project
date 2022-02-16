const engine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// sfx downloads
ASSET_MANAGER.queueDownload("./sfx/sword_slash.mp3");
ASSET_MANAGER.queueDownload("./sfx/thunderfx0.mp3");
ASSET_MANAGER.queueDownload("./sfx/thunderfx1.mp3");
ASSET_MANAGER.queueDownload("./sfx/thunderfx2.mp3");
ASSET_MANAGER.queueDownload("./sfx/thunderfx3.mp3");

// knight-related downloads
ASSET_MANAGER.queueDownload("./sprites/entities/knight.png");
ASSET_MANAGER.queueDownload("./sprites/entities/knight_dash.png");

// enemy-related downloads
ASSET_MANAGER.queueDownload("./sprites/entities/skeleton.png");
ASSET_MANAGER.queueDownload("./sprites/entities/eyeball.png");
ASSET_MANAGER.queueDownload("./sprites/entities/minotaur.png");
ASSET_MANAGER.queueDownload("./sprites/entities/thunder_spell.png");

// cursor downloads
ASSET_MANAGER.queueDownload("./sprites/hud/cursor.png");
ASSET_MANAGER.queueDownload("./sprites/hud/icons.png");

// misc asset downloads
ASSET_MANAGER.queueDownload("./sprites/items/items.png");
ASSET_MANAGER.queueDownload("./sprites/items/shield.png");
ASSET_MANAGER.queueDownload("./sprites/items/shopitems.png");
ASSET_MANAGER.queueDownload("./sprites/items/goggles.png");

// level downloads
ASSET_MANAGER.queueDownload("./sprites/map/prototype_hub.png");
ASSET_MANAGER.queueDownload("./sprites/map/alt_hub.png");
ASSET_MANAGER.queueDownload("./sprites/map/shop.png");
ASSET_MANAGER.queueDownload("./sprites/map/bossroom.png");

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
