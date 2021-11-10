import * as i0 from '@angular/core';
import { Injectable, Component, Input, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as i1 from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

class NgxRatingService {
    constructor() { }
}
NgxRatingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgxRatingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

function getColorScale(items) {
    if (!checkIntegrity(items)) {
        console.error("ALL RGB VALUES MUST BE BETWEEN 0 AND 255");
        return items.map(item => {
            return Object.assign(Object.assign({}, item), { color: getColor(255, 0, 0) });
        });
    }
    if (!items[0].color) {
        console.error("SET FIRST ITEM'S COLOR FIELD");
        let toReturn = items;
        toReturn[0].color = getColor(255, 0, 0);
    }
    if (items[0].color && !items[items.length - 1].color) {
        const color = items[0].color;
        return items.map(item => { return Object.assign(Object.assign({}, item), { color: color }); });
    }
    else {
        let toReturn = [items[0]];
        while (toReturn.length !== items.length) {
            let toCalculate = [];
            let first = toReturn[toReturn.length - 1].color || {};
            for (let i = toReturn.length; !items[i].color && i < items.length; i++) {
                toCalculate.push(items[i]);
            }
            let last = items[toReturn.length + toCalculate.length].color || {};
            toReturn = toReturn.concat(calculateColors(first, last, toCalculate));
            toReturn.push(items[toReturn.length]);
        }
        return toReturn;
    }
}
function getColor(red, green, blue) {
    return {
        red: red,
        green: green,
        blue: blue
    };
}
function calculateColors(first, last, items) {
    const difference = getColor(last.red - first.red, last.green - first.green, last.blue - first.blue);
    return items.map((item, idx) => {
        return Object.assign(Object.assign({}, item), { color: getColor(first.red + ((difference.red / (items.length + 1)) * (idx + 1)), first.green + ((difference.green / (items.length + 1)) * (idx + 1)), first.blue + ((difference.blue / (items.length + 1)) * (idx + 1))) });
    });
}
function toColorString(color) {
    return `rgb(${color.red},${color.green},${color.blue})`;
}
function checkIntegrity(items) {
    let integrity = true;
    items.forEach(item => {
        if (item.color) {
            if (!checkItem(item.color)) {
                integrity = false;
            }
        }
    });
    return integrity;
}
function checkItem(color) {
    if (color.red < 0 || color.red > 255) {
        return false;
    }
    if (color.green < 0 || color.green > 255) {
        return false;
    }
    if (color.blue < 0 || color.blue > 255) {
        return false;
    }
    return true;
}

class NgxRatingComponent {
    constructor() {
        this.items = [];
        this.theme = 'squares';
        this.styles = [];
        this.showTitle = false;
        this.titlePosition = 'top';
        this.details = {};
        this.style = [];
        this.showDescriptionBS = new BehaviorSubject('-');
        this.showDescription$ = this.showDescriptionBS.asObservable();
        this.actualDescription = '-';
        this.showSelection = -1;
        this.actualSelection = -1;
        this.color = [];
        this.onChange = (item) => { };
        this.onTouch = (item) => { };
    }
    ngOnInit() {
        this.items = this.settings.items || [];
        this.items = getColorScale(this.items);
        this.color = this.items.map(item => toColorString(item.color || {}));
        this.theme = this.settings.theme || 'squares';
        if ('images' in this.settings) {
            this.images = this.settings.images;
        }
        this.showTitle = this.settings.showTitle;
        this.titlePosition = this.settings.titlePosition || 'top';
        this.details = this.settings.itemDetail;
    }
    writeValue(item) {
        if (Object.keys(item).length !== 0) {
            this.actualDescription = item.description;
            this.showDescriptionBS.next(item.description);
            this.actualSelection = this.items.indexOf(this.items.find(el => item.id === el.id) || {});
            this.showSelection = this.actualSelection;
        }
        else {
            this.actualDescription = '-';
            this.showDescriptionBS.next('-');
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    mouseOver(selectedIdx, item) {
        this.showDescriptionBS.next(item.description);
        this.showSelection = selectedIdx;
    }
    mouseLeave() {
        this.showSelection = this.actualSelection;
        this.showDescriptionBS.next(this.actualDescription);
    }
    getScaleItemChange(indexSelected, item) {
        if (this.actualSelection !== indexSelected) {
            this.actualSelection = indexSelected;
            this.showSelection = indexSelected;
            this.actualDescription = item.description;
            this.showDescriptionBS.next(item.description);
            this.onChange(item);
        }
    }
}
NgxRatingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgxRatingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: NgxRatingComponent, selector: "ngx-rating", inputs: { settings: "settings" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: NgxRatingComponent
        }
    ], ngImport: i0, template: "<div class=\"rating-container\"\r\n    [ngStyle]=\"{'flex-direction': (titlePosition === 'top') ? 'column' : (titlePosition === 'left') ? 'row' : (titlePosition === 'right') ? 'row-reverse' : 'column-reverse'}\"\r\n>\r\n    <div\r\n        class=\"title\"\r\n        *ngIf=\"showTitle\"\r\n        [ngStyle]=\"{\r\n            'margin': titlePosition === 'top' ? '0 0 20px 0' :\r\n                    titlePosition === 'bottom' ? '20px 0 0 0' :\r\n                    titlePosition === 'left' ? '0 20px 0 0' :\r\n                    titlePosition === 'right' ? '0 0 0 20px' : ''\r\n        }\"\r\n    >\r\n        {{showDescription$ | async}}\r\n    </div>\r\n    <div class=\"container-scale\" *ngIf=\"settings\">\r\n        <ng-container *ngFor=\"let item of items; let idx = index\">\r\n            <div [ngSwitch]=\"theme\">\r\n                <div class=\"item\"\r\n                    *ngSwitchCase=\"'squares'\"\r\n                    (mouseover)=\"mouseOver(idx, item)\"\r\n                    (mouseleave)=\"mouseLeave()\"\r\n                    (click)=\"getScaleItemChange(idx, item)\"\r\n                    [style.width.px]=\"details.width\"\r\n                    [style.height.px]=\"details.height\"\r\n                    [ngStyle]=\"{'background-color': (idx <= showSelection) ? color[idx] : 'grey'}\"\r\n                >\r\n                </div>\r\n                <div class=\"item\"\r\n                    *ngSwitchCase=\"'rounded_squares'\"\r\n                    (mouseover)=\"mouseOver(idx, item)\"\r\n                    (mouseleave)=\"mouseLeave()\"\r\n                    (click)=\"getScaleItemChange(idx, item)\"\r\n                    [style.width.px]=\"details.width\"\r\n                    [style.height.px]=\"details.height\"\r\n                    [ngStyle]=\"{\r\n                        'background-color': (idx <= showSelection) ? color[idx] : 'grey',\r\n                        'border-radius': idx === 0 ? '8px 0 0 8px' : idx === items.length-1 ? '0 8px 8px 0' : ''}\"\r\n                >\r\n                </div>\r\n\r\n                <div\r\n                    *ngSwitchCase=\"'single_icon'\"\r\n                    (mouseover)=\"mouseOver(idx, item)\"\r\n                    (mouseleave)=\"mouseLeave()\"\r\n                    (click)=\"getScaleItemChange(idx, item)\"\r\n                >\r\n                    <div\r\n                        *ngIf=\"images\"\r\n                        class=\"item\"\r\n                        [style.width.px]=\"details.width\"\r\n                        [style.height.px]=\"details.height\"\r\n                        [style.mask.url]=\"images[0]\"\r\n                        style=\"\r\n                            mask-size: {{details.width}}px {{details.height}}px;\r\n                            -webkit-mask: url({{images[0]}}) no-repeat center;\r\n                            -webkit-mask-size: {{details.width}}px {{details.height}}px\"\r\n                        [ngStyle]=\"{'background-color': (idx <= showSelection) ? color[idx] : 'grey'}\"\r\n                    >\r\n                    </div>\r\n                </div>\r\n\r\n                <div\r\n                    *ngSwitchCase=\"'multiple_icons'\"\r\n                    (mouseover)=\"mouseOver(idx, item)\"\r\n                    (mouseleave)=\"mouseLeave()\"\r\n                    (click)=\"getScaleItemChange(idx, item)\"\r\n                >\r\n                    <div\r\n                        *ngIf=\"images\"\r\n                        class=\"item\"\r\n                    >\r\n                        <div *ngIf=\"idx <= showSelection; else falseItems\"\r\n                            [style.width.px]=\"details.width\"\r\n                            [style.height.px]=\"details.height\"\r\n                            [style.backgroundColor]=\"color[idx]\"\r\n                            style=\"\r\n                                mask: url({{images[0]}});\r\n                                mask-size: {{details.width}}px {{details.height}}px;\r\n                                -webkit-mask: url({{images[0]}}) no-repeat center;\r\n                                -webkit-mask-size: {{details.width}}px {{details.height}}px;\"\r\n                        >\r\n                        </div>\r\n                        <ng-template #falseItems>\r\n                            <div\r\n                                [style.width.px]=\"details.width\"\r\n                                [style.height.px]=\"details.height\"\r\n                                [style.backgroundColor]=\"'grey'\"\r\n                                style=\"\r\n                                    mask: url({{images[1]}});\r\n                                    mask-size: {{details.width}}px {{details.height}}px;\r\n                                    -webkit-mask: url({{images[1]}}) no-repeat center;\r\n                                    -webkit-mask-size: {{details.width}}px {{details.height}}px;\"\r\n                            >\r\n                            </div>\r\n                        </ng-template>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n</div>\r\n", styles: ["\n    .rating-container {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n\n    .title {\n      text-transform: lowercase;\n    }\n\n    .container-scale {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n\n    .item{\n        margin-right: 10px;\n    }\n    "], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], pipes: { "async": i1.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-rating',
                    templateUrl: './ngx-rating.component.html',
                    styles: [
                        `
    .rating-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .title {
      text-transform: lowercase;
    }

    .container-scale {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .item{
        margin-right: 10px;
    }
    `
                    ],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: NgxRatingComponent
                        }
                    ]
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { settings: [{
                type: Input
            }] } });

class NgxRatingModule {
}
NgxRatingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxRatingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingModule, declarations: [NgxRatingComponent], imports: [BrowserModule], exports: [NgxRatingComponent] });
NgxRatingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingModule, imports: [[
            BrowserModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NgxRatingComponent
                    ],
                    imports: [
                        BrowserModule
                    ],
                    exports: [
                        NgxRatingComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of ngx-rating
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxRatingComponent, NgxRatingModule, NgxRatingService };
//# sourceMappingURL=ngx-rating.js.map
