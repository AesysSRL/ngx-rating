import * as i0 from '@angular/core';
import { Injectable, Component, Input, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as i1 from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

class NgxRatingLibService {
    constructor() { }
}
NgxRatingLibService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingLibService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgxRatingLibService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingLibService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingLibService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

function getColorScale(itemNum) {
    let color = [];
    let valueRed = 0;
    let valueGreen = 90;
    let valueBlue = 141;
    color.push(`rgb(${valueRed},${valueGreen},${valueBlue})`);
    for (let idx = 0; idx < itemNum - 2; idx++) {
        if (valueRed <= 180 && valueGreen <= 230 && valueBlue <= 245) {
            valueRed = valueRed + 20;
            valueGreen = valueGreen + 30;
            valueBlue = valueBlue + 30;
        }
        if (valueBlue >= 230) {
            valueRed = valueRed + 20;
            valueGreen = valueGreen + 10;
            if (valueRed >= 230) {
                valueRed = valueRed + 20;
            }
        }
        color.push(`rgb(${valueRed},${valueGreen},${valueBlue})`);
    }
    valueRed = 180;
    valueGreen = 230;
    valueBlue = 245;
    color.push(`rgb(${valueRed},${valueGreen},${valueBlue})`);
    color.reverse();
    return color;
}

class NgxRatingLibComponent {
    constructor() {
        this.items = [];
        this.showDescriptionBS = new BehaviorSubject('-');
        this.showDescription$ = this.showDescriptionBS.asObservable();
        this.actualDescription = '-';
        this.showSelection = -1;
        this.actualSelection = -1;
        this.color = [];
        this.onChange = (item) => { };
        this.onTouch = (item) => { };
        console.log('constructor');
    }
    ngOnInit() {
        var _a;
        console.log('on init');
        this.items = ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.items) || [];
        this.color = getColorScale(this.items.length);
    }
    writeValue(item) {
        var _a;
        this.actualDescription = item.description;
        this.showDescriptionBS.next(item.description);
        this.actualSelection = ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.items.indexOf(item)) || -1;
        this.showSelection = this.actualSelection;
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
        const index = this.items.indexOf(item);
        if (this.actualSelection !== index) {
            this.actualSelection = index;
            this.showSelection = index;
            this.actualDescription = item.description;
            this.showDescriptionBS.next(item.description);
            this.onChange(item);
        }
    }
}
NgxRatingLibComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingLibComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgxRatingLibComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: NgxRatingLibComponent, selector: "ngx-rating-lib", inputs: { settings: "settings" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: NgxRatingLibComponent
        }
    ], ngImport: i0, template: `
    <div>
      {{showDescription$ | async}}
    </div>
    <div class="container-scale" *ngIf="settings">
        <ng-container *ngFor="let item of settings.items; let idx = index">
          <div class="item"
          (mouseover)="mouseOver(idx, item)"
          (mouseleave)="mouseLeave()"
          (click)="getScaleItemChange(idx, item)"
          [ngStyle]="{'background-color': (idx <= showSelection) ? color[idx] : ''}"
        >
        </div>
        </ng-container>
      </div>
  `, isInline: true, styles: ["\n    .container-scale {\n        display: flex;\n        margin-left: 30.4%;\n    }\n    .item{\n        width: 70px;\n        height: 8px;\n        margin-right: 10px;\n        background-color: grey;\n    }\n    "], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], pipes: { "async": i1.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingLibComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-rating-lib',
                    template: `
    <div>
      {{showDescription$ | async}}
    </div>
    <div class="container-scale" *ngIf="settings">
        <ng-container *ngFor="let item of settings.items; let idx = index">
          <div class="item"
          (mouseover)="mouseOver(idx, item)"
          (mouseleave)="mouseLeave()"
          (click)="getScaleItemChange(idx, item)"
          [ngStyle]="{'background-color': (idx <= showSelection) ? color[idx] : ''}"
        >
        </div>
        </ng-container>
      </div>
  `,
                    styles: [
                        `
    .container-scale {
        display: flex;
        margin-left: 30.4%;
    }
    .item{
        width: 70px;
        height: 8px;
        margin-right: 10px;
        background-color: grey;
    }
    `
                    ],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: NgxRatingLibComponent
                        }
                    ]
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { settings: [{
                type: Input
            }] } });

class NgxRatingLibModule {
}
NgxRatingLibModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingLibModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxRatingLibModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingLibModule, declarations: [NgxRatingLibComponent], imports: [BrowserModule], exports: [NgxRatingLibComponent] });
NgxRatingLibModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingLibModule, imports: [[
            BrowserModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxRatingLibModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NgxRatingLibComponent
                    ],
                    imports: [
                        BrowserModule
                    ],
                    exports: [
                        NgxRatingLibComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of ngx-rating-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxRatingLibComponent, NgxRatingLibModule, NgxRatingLibService };
//# sourceMappingURL=ngx-rating-lib.js.map
