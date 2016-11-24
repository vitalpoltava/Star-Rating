import {Component, ElementRef} from '@angular/core';

@Component({
    selector: 'stars',
    styles: [`
        .stars {
            display: inline-block;
            position: relative;
            z-index: 0;
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
            [ngStyle]="{'background-color': starBackColor}"
            (click)="secureNewRating()"
            (mouseleave)="leaveRating()"
            (mousemove)="changeRating($event)">
            <div class="stars-selected" 
                [ngStyle]="{'width': selWidth, 'background-color': selColor}"></div>
            <star-item *ngFor="let i of itemsIterable" [type]="type" [backColor]="backColor" [radius]="radius"></star-item>
        </div>
    `
})

export class StarComponent {
    radius: number;
    type: string;
    items: number;
    itemsIterable: number[];
    selColor: string;
    backColor: string;
    starBackColor: string;
    securedWidth: string;
    selWidth: string;
    percent: string;
    starsSelected: number;
    disabled: boolean;
    el: ElementRef;

    constructor(el: ElementRef) {
        const _getAttribute = (el, attr, def) => el.nativeElement.getAttribute(attr) || def;

        // Pass attributes inside
        this.selColor = _getAttribute(el, 'sel-color', 'gold');
        this.backColor = _getAttribute(el, 'back-color', 'white');
        this.starBackColor = _getAttribute(el, 'star-back-color', 'lightgray');
        this.radius = parseInt(_getAttribute(el, 'radius', '30'), 10);
        this.items = parseInt(_getAttribute(el, 'items', '5'), 10);
        this.percent = _getAttribute(el, 'percent', '0') + '%';
        this.starsSelected = parseFloat(_getAttribute(el, 'stars-selected', 0));
        this.disabled = !!_getAttribute(el, 'disabled', false);
        this.type = _getAttribute(el, 'type', 'star');

        this.itemsIterable = new Array(this.items);
        this.securedWidth = this.starsSelected ? 100 / this.items * this.starsSelected + '%' : this.percent;
        this.el = el;

        // initial rating setup
        this.selWidth = this.securedWidth;
    }

    changeRating(e: MouseEvent) {
        this.selWidth = !this.disabled && e.clientX - this.el.nativeElement.getBoundingClientRect().left + 'px';
        this.percent = parseInt(this.selWidth, 10) / this.radius * 2 * this.items + '%';
    }

    leaveRating() {
        this.selWidth = this.securedWidth;
    }

    secureNewRating() {
        this.securedWidth = this.percent;
    }
}
