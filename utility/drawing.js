/**
 * Draws bounding box to the screen in the given color
 */
const drawBoundingBox = (boundingBox, ctx, color) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.rect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
    ctx.stroke();
    ctx.restore();
};
