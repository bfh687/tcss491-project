const engine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// sfx downloads
ASSET_MANAGER.queueDownload("./sfx/sword_slash.mp3");
ASSET_MANAGER.queueDownload("./sfx/click.wav");
ASSET_MANAGER.queueDownload("./sfx/text.wav");
ASSET_MANAGER.queueDownload("./sfx/thunderfx0.mp3");
ASSET_MANAGER.queueDownload("./sfx/thunderfx1.mp3");
ASSET_MANAGER.queueDownload("./sfx/thunderfx2.mp3");
ASSET_MANAGER.queueDownload("./sfx/thunderfx3.mp3");
ASSET_MANAGER.queueDownload("./sfx/level1_music.mp3");
ASSET_MANAGER.queueDownload("./sfx/skeleton_hit.mp3");
ASSET_MANAGER.queueDownload("./sfx/skeleton_crit.mp3");
ASSET_MANAGER.queueDownload("./sfx/klang1.mp3");
ASSET_MANAGER.queueDownload("./sfx/klang2.mp3");
ASSET_MANAGER.queueDownload("./sfx/swish1.mp3");
ASSET_MANAGER.queueDownload("./sfx/swish2.mp3");
ASSET_MANAGER.queueDownload("./sfx/menu_select.mp3");
ASSET_MANAGER.queueDownload("./sfx/menu_hover.mp3");

// music downloads
ASSET_MANAGER.queueDownload("./music/homescreen-loud.mp3");
ASSET_MANAGER.queueDownload("./music/Glitterglade_Grove.mp3");
ASSET_MANAGER.queueDownload("./music/Orchestral_RATM.mp3");
ASSET_MANAGER.queueDownload("./music/Charmsnow.mp3");
ASSET_MANAGER.queueDownload("./music/Forgotten_Bramble.mp3");

// knight-related downloads
ASSET_MANAGER.queueDownload("./sprites/entities/knight.png");
ASSET_MANAGER.queueDownload("./sprites/entities/knight_dash.png");

// enemy-related downloads
ASSET_MANAGER.queueDownload("./sprites/entities/skeleton.png");
ASSET_MANAGER.queueDownload("./sprites/entities/eyeball.png");
ASSET_MANAGER.queueDownload("./sprites/entities/minotaur.png");
ASSET_MANAGER.queueDownload("./sprites/entities/spawnvfx.png");
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
ASSET_MANAGER.queueDownload("./sprites/map/level_1.png");
ASSET_MANAGER.queueDownload("./sprites/map/level_2.png");
ASSET_MANAGER.queueDownload("./sprites/map/alt_hub.png");
ASSET_MANAGER.queueDownload("./sprites/map/shop.png");
ASSET_MANAGER.queueDownload("./sprites/map/teleporter.png");
ASSET_MANAGER.queueDownload("./sprites/map/bossroom.png");
ASSET_MANAGER.queueDownload("./sprites/map/bossroom2.png");
// foilage + props
ASSET_MANAGER.queueDownload("./sprites/map/foilage.png");
ASSET_MANAGER.queueDownload("./sprites/map/foilage_shadows.png");

ASSET_MANAGER.queueDownload("./sprites/map/props.png");
ASSET_MANAGER.queueDownload("./sprites/map/prop_shadows.png");

// control keys
ASSET_MANAGER.queueDownload("./sprites/controls/W.png");
ASSET_MANAGER.queueDownload("./sprites/controls/A.png");
ASSET_MANAGER.queueDownload("./sprites/controls/S.png");
ASSET_MANAGER.queueDownload("./sprites/controls/D.png");
ASSET_MANAGER.queueDownload("./sprites/controls/E.png");
ASSET_MANAGER.queueDownload("./sprites/controls/TAB.png");
ASSET_MANAGER.queueDownload("./sprites/controls/SPACEALTERNATIVE.png");
ASSET_MANAGER.queueDownload("./sprites/controls/ui_buttons.png");

for (var i = 0; i <= 32; i++) {
  ASSET_MANAGER.queueDownload("./sprites/death_transition/death_transition (" + i + ").png");
}

ASSET_MANAGER.queueDownload("./vignette.png");

ASSET_MANAGER.downloadAll(() => {
  ASSET_MANAGER.autoRepeat("./music/homescreen-loud.mp3");
  ASSET_MANAGER.autoRepeat("./music/Charmsnow.mp3");
  ASSET_MANAGER.autoRepeat("./music/Forgotten_Bramble.mp3");
  ASSET_MANAGER.autoRepeat("./music/Glitterglade_Grove.mp3");
  ASSET_MANAGER.autoRepeat("./music/Orchestral_RATM.mp3");

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
