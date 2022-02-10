const engine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// sfx downloads
ASSET_MANAGER.queueDownload("./sfx/sword_slash.mp3");
ASSET_MANAGER.queueDownload("./sfx/click.wav");
ASSET_MANAGER.queueDownload("./sfx/text.wav");

// knight-related downloads
ASSET_MANAGER.queueDownload("./sprites/entities/knight.png");
ASSET_MANAGER.queueDownload("./sprites/entities/knight_dash.png");

// enemy-related downloads
ASSET_MANAGER.queueDownload("./sprites/entities/skeleton.png");
ASSET_MANAGER.queueDownload("./sprites/entities/eyeball.png");

// cursor downloads
ASSET_MANAGER.queueDownload("./sprites/hud/cursor.png");
ASSET_MANAGER.queueDownload("./sprites/hud/icons.png");

// misc asset downloads
ASSET_MANAGER.queueDownload("./sprites/items/items.png");
ASSET_MANAGER.queueDownload("./sprites/items/shopitems.png");
ASSET_MANAGER.queueDownload("./sprites/items/goggles.png");

// level downloads
ASSET_MANAGER.queueDownload("./sprites/map/level_1.png");
ASSET_MANAGER.queueDownload("./sprites/map/alt_hub.png");
ASSET_MANAGER.queueDownload("./sprites/map/shop.png");

// foilage + props
ASSET_MANAGER.queueDownload("./sprites/map/foilage.png");
ASSET_MANAGER.queueDownload("./sprites/map/foilage_shadows.png");

ASSET_MANAGER.queueDownload("./sprites/map/props.png");
ASSET_MANAGER.queueDownload("./sprites/map/prop_shadows.png");

for (var i = 0; i <= 32; i++) {
  ASSET_MANAGER.queueDownload("./sprites/death_transition/death_transition (" + i + ").png");
}

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
