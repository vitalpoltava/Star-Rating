const Helpers = {
  // Helpers: Draw main canvas area
  drawRect (ctx, dim, backColor) {
    if (!ctx) throw Error('No Canvas context found!');
    ctx.save();
    ctx.fillStyle = backColor;
    ctx.fillRect(0, 0, dim, dim);
    ctx.restore();
  },

  // Helpers: Entry point for item drawing
  drawItem(foo, ctx, r) {
    typeof foo === 'function' && foo(ctx, r)
  }
};

export default Helpers;