// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        // Entities to be added at the end of each update
        this.entitiesToAdd = [];

        // Information on the input
        this.click = false;
        this.left_click = false;
        this.keys = {};

        // information about pointer lock
        this.locked = false;

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
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
        this.mouse = { x: this.ctx.canvas.width / 2, y: this.ctx.canvas.height / 2 };
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
            if (
                document.pointerLockElement === self.ctx.canvas ||
                document.mozPointerLockElement === self.ctx.canvas
            ) {
                document.addEventListener("mousemove", updatePosition, false);
            } else {
                document.removeEventListener("mousemove", updatePosition, false);
                self.locked = false;
            }
        }

        function updatePosition(e) {
            self.mouse.x = Math.min(
                Math.max(0 + 5, (self.mouse.x += e.movementX)),
                self.ctx.canvas.width - 5
            );

            self.mouse.y = Math.min(
                Math.max(0 + 5, (self.mouse.y += e.movementY)),
                self.ctx.canvas.height - 5
            );
        }

        // key listeners
        window.addEventListener("keydown", (e) => {
            this.keys[e.key] = true;
        });
        window.addEventListener("keyup", (e) => {
            this.keys[e.key] = false;
        });

        // click listeners
        this.ctx.canvas.addEventListener("click", (e) => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("mousedown", (e) => {
            this.left_click = true;
        });

        this.ctx.canvas.addEventListener("mouseup", (e) => {
            this.left_click = false;
        });
    }

    addEntity(entity) {
        this.entitiesToAdd.push(entity);
    }

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
    }

    update() {
        // Update Entities
        this.entities.forEach((entity) => entity.update(this));

        // Remove dead things
        this.entities = this.entities.filter((entity) => !entity.removeFromWorld);

        // Add new things
        this.entities = this.entities.concat(this.entitiesToAdd);
        this.entitiesToAdd = [];

        // sort entities to give 3d look
        this.entities.sort((e1, e2) => {
            if (!e1.boundingBox && !e2.boundingBox) {
                return e2.priority - e1.priority;
            } else if (!e1.boundingBox) {
                return e2.boundingBox - e1.priority;
            } else if (!e2.boundingBox) {
                return e2.priority - e1.boundingBox;
            }
            return e2.boundingBox.top - e1.boundingBox.top;
        });
        console.log(this.entities);
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    }

    get ["deltaTime"]() {
        return this.clockTick;
    }

    get ["width"]() {
        return this.ctx?.canvas?.width || 0;
    }

    get ["height"]() {
        return this.ctx?.canvas?.height || 0;
    }
}
