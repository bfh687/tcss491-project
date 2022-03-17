class GameEngine {
  constructor(options) {
    this.ctx = null;

    this.entities = [];

    this.interactionCount = 0;

    // information about input
    this.click = false;
    this.left_click = false;
    this.keys = {};
    this.single_click = false;

    // information about pointer lock
    this.locked = false;

    this.running = false;
    this.restart = false;

    this.isShopActive = false;

    // html options
    this.options = options || {
      prevent: {
        contextMenu: true,
        scrolling: true,
      },
      debugging: false,
    };
  }

  init(ctx) {
    this.ctx = ctx;
    this.mouse = {
      x: this.ctx.canvas.width / 2,
      y: this.ctx.canvas.height / 2,
    };
    this.startInput();
    this.timer = new Timer();
  }

  start() {
    this.running = true;
    const gameLoop = () => {
      this.loop();
      if (this.running) {
        requestAnimFrame(gameLoop, this.ctx.canvas);
      }
    };
    gameLoop();
  }

  startInput() {
    const getXandY = (e) => ({
      x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
      y: e.clientY - this.ctx.canvas.getBoundingClientRect().top,
    });

    var self = this;

    // on click, lock input
    this.ctx.canvas.onclick = () => {
      if (!self.locked) {
        this.ctx.canvas.requestPointerLock({
          unadjustedMovement: true,
        });
        this.mouse.x = this.ctx.canvas.width / 2;
        this.mouse.y = this.ctx.canvas.height / 2;
        self.locked = true;
      }
    };

    // handle locked cursor movement
    document.addEventListener("pointerlockchange", lockChangeAlert, false);
    document.addEventListener("mozpointerlockchange", lockChangeAlert, false);

    function lockChangeAlert() {
      if (document.pointerLockElement === self.ctx.canvas || document.mozPointerLockElement === self.ctx.canvas) {
        document.addEventListener("mousemove", updatePosition, false);
        self.locked = true;
        self.interactionCount++;
        if (self.interactionCount == 1) ASSET_MANAGER.playMusic(music.homescreen);
      } else {
        document.removeEventListener("mousemove", updatePosition, false);
        self.locked = false;
      }
    }

    function updatePosition(e) {
      self.mouse.x = Math.min(Math.max(0 + 5, (self.mouse.x += e.movementX)), self.ctx.canvas.width - 5);
      self.mouse.y = Math.min(Math.max(0 + 5, (self.mouse.y += e.movementY)), self.ctx.canvas.height - 5);
    }

    // key listeners
    window.addEventListener("keydown", (e) => {
      if (e.key == " " || e.key == "Tab") e.preventDefault();
      this.keys[e.key] = true;
      if (this.keys.c) {
        params.DEBUG = !params.DEBUG;
        if (params.DEBUG == true) {
          document.getElementById("debug").checked = true;
        } else if (params.DEBUG == false) {
          document.getElementById("debug").checked = false;
        }
      }
    });
    window.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });

    // click listeners
    this.ctx.canvas.addEventListener("click", (e) => {
      this.click = getXandY(e);
    });

    this.ctx.canvas.addEventListener("mousedown", (e) => {
      this.left_click = true;
      this.single_click = true;
      setTimeout(() => {
        this.single_click = false;
      }, 300);
    });

    this.ctx.canvas.addEventListener("mouseup", (e) => {
      this.left_click = false;
    });

    this.mouse.x = this.ctx.canvas.width / 2;
    this.mouse.y = this.ctx.canvas.height / 2;
    this.propcount = 0;
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  draw() {
    // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // Draw latest things first
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].draw(this.ctx, this);
    }
  }

  update() {
    // Update Entities
    this.entities.forEach((entity) => entity.update(this));

    // Remove dead things
    this.entities = this.entities.filter((entity) => !entity.removeFromWorld);

    // sort entities to give 3d look, if e1 < e2 return -1
    this.entities.sort((e1, e2) => {
      if (e1 instanceof Map) {
        return -1;
      } else if (e2 instanceof Map) {
        return 1;
      } else if (e1 instanceof Cursor) {
        return 1;
      } else if (e2 instanceof Cursor) {
        return -1;
      } else if (e1.boundingBox && e2.boundingBox) {
        return e1.boundingBox.top - e2.boundingBox.top;
      } else if (e1.boundingBox && !e2.boundingBox) {
        return -1;
      } else if (!e1.boundingBox && e2.boundingBox) {
        return 1;
      } else if (!e1.boundingBox && !e2.boundingBox) {
        e1.priority - e2.priority;
      }
    });

    // update debug param
    params.DEBUG = document.getElementById("debug").checked;
  }

  loop() {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();

    this.camera.update();
    this.camera.draw(this.ctx);
  }

  width() {
    return this.ctx?.canvas?.width || 0;
  }

  height() {
    return this.ctx?.canvas?.height || 0;
  }
}
