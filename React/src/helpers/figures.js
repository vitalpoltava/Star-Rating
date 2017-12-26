const Figures = {

  // Draw star image
  star(ctx, r) {
    if (!ctx) throw Error('No Canvas context found!');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    ctx.beginPath();
    ctx.translate(r, r);
    ctx.moveTo(0, 0 - r);
    for (let i = 0; i < 5; i++) {
      ctx.rotate(Math.PI / 5);
      ctx.lineTo(0, 0 - (r * 0.5));
      ctx.rotate(Math.PI / 5);
      ctx.lineTo(0, 0 - r);
    }
    ctx.fill();
    ctx.restore();
  },

  // Draw circle image
  circle(ctx, r) {
    if (!ctx) throw Error('No Canvas context found!');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(r, r, r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
  },

  // Add your own rating figure here...
};

export default Figures;