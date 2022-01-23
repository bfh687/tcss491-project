/**
 * draws bounding box to the screen
 */
const drawBoundingBox = (boundingBox, ctx, color) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.25;
    ctx.fillRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
    ctx.restore();
};

/**
 * draws healthbar to the screen
 */
const drawHealthBar = (ctx, hurtBox, name, health, maxHealth) => {
    var width = hurtBox.right - hurtBox.left;
    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = "10px Arial";
    ctx.fillText(name, hurtBox.left, hurtBox.top - 24, width);
    ctx.fillStyle = "black";
    ctx.fillRect(hurtBox.left + 1, hurtBox.top - 17, width, 5);
    ctx.fillStyle = "red";
    ctx.fillRect(hurtBox.left, hurtBox.top - 16, width, 5);
    ctx.fillStyle = "#32CD32";
    ctx.fillRect(hurtBox.left, hurtBox.top - 16, Math.max(0, health / maxHealth) * width, 5);
    ctx.restore();
};
