const engine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// sfx downloads
sfx.paths.forEach((path) => {
  ASSET_MANAGER.queueDownload(path.path);
});

// music downloads
music.paths.forEach((path) => {
  ASSET_MANAGER.queueDownload(path.path);
});

// sprite downloads
sprites.paths.forEach((path) => {
  ASSET_MANAGER.queueDownload(path.path);
});

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
