import {Component, ElementRef} from '@angular/core';

@Component({
    selector: 'star-item',
    inputs: ['radius', 'type', 'backColor'],
    styles: [`
        canvas.star {
            float: left;
            z-index: 1;
        }       
    `],
    template: `
        <canvas 
            class="star" 
            height="{{ radius*2 }}" 
            width="{{ radius*2 }}"></canvas>`
})

export class StarItemComponent {
    radius: number;
    root: ElementRef;
    backColor: string;
    type: string;

    constructor(myElement: ElementRef) {
        this.root = myElement;
    }

    // Entry point for item drawing
    drawItem(type: string, ctx: CanvasRenderingContext2D, r: number) {
        return typeof this[type] === 'function' ? this[type](ctx, r) : this.star(ctx, r);
    }

    // Draw star image
    star(ctx: CanvasRenderingContext2D, r: number) {
        if (!ctx) throw Error('No Canvas context found!');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';

        ctx.beginPath();
        ctx.translate(r, r);
        ctx.moveTo(0, 0 - r);
        for (var i = 0; i < 5; i++) {
            ctx.rotate(Math.PI / 5);
            ctx.lineTo(0, 0 - (r * 0.5));
            ctx.rotate(Math.PI / 5);
            ctx.lineTo(0, 0 - r);
        }
        ctx.fill();
        ctx.restore();
    }

    // Draw circle image
    circle(ctx: CanvasRenderingContext2D, r: number) {
        if (!ctx) throw Error('No Canvas context found!');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(r, r, r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.restore();
    }

    // Draw main canvas area
    drawRect(ctx: CanvasRenderingContext2D, dim: number, backColor: string) {
        if (!ctx) throw Error('No Canvas context found!');
        ctx.save();
        ctx.fillStyle = backColor;
        ctx.fillRect(0, 0, dim, dim);
        ctx.restore();
    }

    // Hook: draw canvas image on the template rendered
    ngOnInit() {
        setTimeout(() => {
            const el: HTMLCanvasElement = this.root.nativeElement.querySelector('.star');
            const ctx: CanvasRenderingContext2D = el.getContext("2d");

            this.drawRect(ctx, this.radius * 2, this.backColor);
            this.drawItem(this.type,  ctx, this.radius);
        });
    }
}