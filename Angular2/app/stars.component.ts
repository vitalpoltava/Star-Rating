import {Component, ElementRef, Input} from '@angular/core';

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
                [ngStyle]="{'width': selectedWidth, 'background-color': selectedColor}"></div>
            <star-item *ngFor="let i of itemsIterable" [type]="type" [backColor]="backColor" [radius]="radius"></star-item>
        </div>
    `
})

export class StarComponent {
    @Input('radius') radius: number;
    @Input('type') type: string;
    @Input('items') items: number;
    @Input('sel-color') selectedColor: string;
    @Input('back-color') backColor: string;
    @Input('star-back-color') starBackColor: string;
    @Input('percent') percent: string;
    @Input('stars-selected') starsSelected: number;
    @Input('disabled') disabled: boolean;

    securedWidth: string;
    selectedWidth: string;
    itemsIterable: number[];
    elDimensions: ClientRect;
    el: ElementRef;
    nativeEl: HTMLElement;

    constructor(el: ElementRef) {
        this.nativeEl = el.nativeElement;
        this.el = el;
    }

    ngOnInit() {
        const getAttr = (nEl: HTMLElement, attr: string, def?: string) :string => nEl.getAttribute(attr) || def;

        // Pass attributes into app
        this.selectedColor = this.selectedColor || getAttr(this.nativeEl, 'sel-color', 'gold');
        this.backColor = this.backColor || getAttr(this.nativeEl, 'back-color', 'white');
        this.starBackColor = this.starBackColor || getAttr(this.nativeEl, 'star-back-color', 'lightgray');
        this.radius = this.radius || parseInt(getAttr(this.nativeEl, 'radius', '30'), 10);
        this.items = this.items || parseInt(getAttr(this.nativeEl, 'items', '5'), 10);
        this.percent = this.percent || getAttr(this.nativeEl, 'percent', '0') + '%';
        this.starsSelected = this.starsSelected || parseFloat(getAttr(this.nativeEl, 'stars-selected', '0'));
        this.disabled = this.disabled || !!getAttr(this.nativeEl, 'disabled');
        this.type = this.type || getAttr(this.nativeEl, 'type', 'star');

        this.itemsIterable = new Array(this.items);
        this.securedWidth = this.starsSelected ? 100 / this.items * this.starsSelected + '%' : this.percent;
        this.elDimensions = this.nativeEl.getBoundingClientRect();

        // initial rating setup
        this.selectedWidth = this.securedWidth;
    }

    changeRating(e: MouseEvent) {
        this.selectedWidth = !this.disabled && e.clientX - this.elDimensions.left + 'px';
        this.percent = parseInt(this.selectedWidth, 10) / this.radius * 2 * this.items + '%';
    }

    leaveRating() {
        this.selectedWidth = this.securedWidth;
    }

    secureNewRating() {
        this.securedWidth = this.percent;
    }
}