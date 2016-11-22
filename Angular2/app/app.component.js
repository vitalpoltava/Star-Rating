"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var StarComponent = (function () {
    function StarComponent(el) {
        var _getAttribute = function (el, attr) { return el.nativeElement.getAttribute(attr); };
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
    StarComponent.prototype.changeRating = function (e) {
        this.selWidth = e.clientX - this.el.nativeElement.getBoundingClientRect().left + 'px';
        this.percent = parseInt(this.selWidth, 10) / this.radius * 2 * this.items + '%';
    };
    StarComponent.prototype.leaveRating = function () {
        this.selWidth = this.securedWidth;
    };
    StarComponent.prototype.secureNewRating = function () {
        this.securedWidth = this.percent;
    };
    StarComponent = __decorate([
        core_1.Component({
            selector: 'stars',
            template: "\n        <div class=\"stars\" \n            (click)=\"secureNewRating()\"\n            (mouseleave)=\"leaveRating()\"\n            (mousemove)=\"changeRating($event)\">\n            <div class=\"stars-selected\" \n                [ngStyle]=\"{'width': selWidth, 'background-color': selColor}\"></div>\n            <star-item *ngFor=\"let i of itemsIterable\" [radius]=\"radius\"></star-item>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
    ], StarComponent);
    return StarComponent;
    var _a;
}());
exports.StarComponent = StarComponent;
var StarItemComponent = (function () {
    function StarItemComponent(myElement) {
        this.root = myElement;
    }
    StarItemComponent.prototype._drawRect = function (ctx, dim, backColor) {
        if (!ctx)
            throw Error('No Canvas context found!');
        ctx.save();
        ctx.width = dim;
        ctx.height = dim;
        ctx.fillStyle = backColor;
        ctx.fillRect(0, 0, dim, dim);
        ctx.restore();
    };
    StarItemComponent.prototype._star = function (ctx, r) {
        if (!ctx)
            throw Error('No Canvas context found!');
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
    };
    StarItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            var el = _this.root.nativeElement.querySelector('.star');
            var ctx = el.getContext("2d");
            _this._drawRect(ctx, _this.radius * 2, 'white');
            _this._star(ctx, _this.radius);
        });
    };
    StarItemComponent = __decorate([
        core_1.Component({
            selector: 'star-item',
            inputs: ['radius'],
            template: "\n        <canvas \n            class=\"star\" \n            height=\"{{ radius*2 }}\" \n            width=\"{{ radius*2 }}\"></canvas>"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
    ], StarItemComponent);
    return StarItemComponent;
    var _a;
}());
exports.StarItemComponent = StarItemComponent;
//# sourceMappingURL=app.component.js.map