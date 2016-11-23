import {Component, ElementRef} from '@angular/core';

@Component({
    selector: 'stars',
    styles: [`
        .stars {
            display: inline-block;
            position: relative;
            z-index: 0;
            background-color: lightgray;
        }

        .stars-selected {
            position: absolute;
            max-width: 100%;
            height: 100%;
            z-index: -1;
        }
    `],
    template: `
        <div class="stars" 
            (click)="secureNewRating()"
            (mouseleave)="leaveRating()"
            (mousemove)="changeRating($event)">
            <div class="stars-selected" 
                [ngStyle]="{'width': selWidth, 'background-color': selColor}"></div>
            <star-item *ngFor="let i of itemsIterable" [radius]="radius"></star-item>
        </div>
    `
})

export class StarComponent {
    radius: number;
    items: number;
    itemsIterable: number[];
    selColor: string;
    securedWidth: string;
    selWidth: string;
    percent: string;
    starsSelected: number;
    el: ElementRef;

    constructor(el: ElementRef) {
        const _getAttribute = (el, attr) => el.nativeElement.getAttribute(attr);

        this.selColor = _getAttribute(el, 'sel-color') || 'gold';
        this.radius = parseInt(_getAttribute(el, 'radius') || '30', 10);
        this.items = parseInt(_getAttribute(el, 'items') || '5', 10);
        this.percent = (_getAttribute(el, 'percent') || '0') + '%';
        this.starsSelected = parseFloat(_getAttribute(el, 'stars-selected')) || 0;

        this.itemsIterable = new Array(this.items);
        this.securedWidth = this.starsSelected ? 100 / this.items * this.starsSelected + '%' : this.percent;
        this.el = el;

        // initial setup
        this.selWidth = this.securedWidth;
    }

    changeRating(e) {
        this.selWidth = e.clientX - this.el.nativeElement.getBoundingClientRect().left + 'px';
        this.percent = parseInt(this.selWidth, 10) / this.radius * 2 * this.items + '%';
    }

    leaveRating() {
        this.selWidth = this.securedWidth;
    }

    secureNewRating() {
        this.securedWidth = this.percent;
    }
}

@Component({
    selector: 'star-item',
    inputs: ['radius'],
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

    constructor(myElement: ElementRef) {
        this.root = myElement;
    }

    _drawRect(ctx, dim, backColor) {
        if (!ctx) throw Error('No Canvas context found!');
        ctx.save();
        ctx.width = dim;
        ctx.height = dim;
        ctx.fillStyle = backColor;
        ctx.fillRect(0, 0, dim, dim);
        ctx.restore();
    }

    _star(ctx, r) {
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

    ngOnInit() {
        setTimeout(() => {
            const el: HTMLCanvasElement = this.root.nativeElement.querySelector('.star');
            const ctx: CanvasRenderingContext2D = el.getContext("2d");

            this._drawRect(ctx, this.radius * 2, 'white');
            this._star(ctx, this.radius);
        });
    }
}