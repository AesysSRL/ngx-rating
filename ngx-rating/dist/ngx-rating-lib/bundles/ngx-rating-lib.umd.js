(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('@angular/common'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('ngx-rating-lib', ['exports', '@angular/core', '@angular/forms', 'rxjs', '@angular/common', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ngx-rating-lib"] = {}, global.ng.core, global.ng.forms, global.rxjs, global.ng.common, global.ng.platformBrowser));
})(this, (function (exports, i0, forms, rxjs, i1, platformBrowser) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var NgxRatingLibService = /** @class */ (function () {
        function NgxRatingLibService() {
        }
        return NgxRatingLibService;
    }());
    NgxRatingLibService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingLibService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    NgxRatingLibService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingLibService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingLibService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    function getColorScale(itemNum) {
        var color = [];
        var valueRed = 0;
        var valueGreen = 90;
        var valueBlue = 141;
        color.push("rgb(" + valueRed + "," + valueGreen + "," + valueBlue + ")");
        for (var idx = 0; idx < itemNum - 2; idx++) {
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
            color.push("rgb(" + valueRed + "," + valueGreen + "," + valueBlue + ")");
        }
        valueRed = 180;
        valueGreen = 230;
        valueBlue = 245;
        color.push("rgb(" + valueRed + "," + valueGreen + "," + valueBlue + ")");
        color.reverse();
        return color;
    }

    var NgxRatingLibComponent = /** @class */ (function () {
        function NgxRatingLibComponent() {
            this.items = [];
            this.showDescriptionBS = new rxjs.BehaviorSubject('-');
            this.showDescription$ = this.showDescriptionBS.asObservable();
            this.actualDescription = '-';
            this.showSelection = -1;
            this.actualSelection = -1;
            this.color = [];
            this.onChange = function (item) { };
            this.onTouch = function (item) { };
            console.log('constructor');
        }
        NgxRatingLibComponent.prototype.ngOnInit = function () {
            var _a;
            console.log('on init');
            this.items = ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.items) || [];
            this.color = getColorScale(this.items.length);
        };
        NgxRatingLibComponent.prototype.writeValue = function (item) {
            var _a;
            this.actualDescription = item.description;
            this.showDescriptionBS.next(item.description);
            this.actualSelection = ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.items.indexOf(item)) || -1;
            this.showSelection = this.actualSelection;
        };
        NgxRatingLibComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        NgxRatingLibComponent.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        NgxRatingLibComponent.prototype.mouseOver = function (selectedIdx, item) {
            this.showDescriptionBS.next(item.description);
            this.showSelection = selectedIdx;
        };
        NgxRatingLibComponent.prototype.mouseLeave = function () {
            this.showSelection = this.actualSelection;
            this.showDescriptionBS.next(this.actualDescription);
        };
        NgxRatingLibComponent.prototype.getScaleItemChange = function (indexSelected, item) {
            var index = this.items.indexOf(item);
            if (this.actualSelection !== index) {
                this.actualSelection = index;
                this.showSelection = index;
                this.actualDescription = item.description;
                this.showDescriptionBS.next(item.description);
                this.onChange(item);
            }
        };
        return NgxRatingLibComponent;
    }());
    NgxRatingLibComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingLibComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    NgxRatingLibComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: NgxRatingLibComponent, selector: "ngx-rating-lib", inputs: { settings: "settings" }, providers: [
            {
                provide: forms.NG_VALUE_ACCESSOR,
                multi: true,
                useExisting: NgxRatingLibComponent
            }
        ], ngImport: i0__namespace, template: "\n    <div>\n      {{showDescription$ | async}}\n    </div>\n    <div class=\"container-scale\" *ngIf=\"settings\">\n        <ng-container *ngFor=\"let item of settings.items; let idx = index\">\n          <div class=\"item\"\n          (mouseover)=\"mouseOver(idx, item)\"\n          (mouseleave)=\"mouseLeave()\"\n          (click)=\"getScaleItemChange(idx, item)\"\n          [ngStyle]=\"{'background-color': (idx <= showSelection) ? color[idx] : ''}\"\n        >\n        </div>\n        </ng-container>\n      </div>\n  ", isInline: true, styles: ["\n    .container-scale {\n        display: flex;\n        margin-left: 30.4%;\n    }\n    .item{\n        width: 70px;\n        height: 8px;\n        margin-right: 10px;\n        background-color: grey;\n    }\n    "], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], pipes: { "async": i1__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingLibComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-rating-lib',
                        template: "\n    <div>\n      {{showDescription$ | async}}\n    </div>\n    <div class=\"container-scale\" *ngIf=\"settings\">\n        <ng-container *ngFor=\"let item of settings.items; let idx = index\">\n          <div class=\"item\"\n          (mouseover)=\"mouseOver(idx, item)\"\n          (mouseleave)=\"mouseLeave()\"\n          (click)=\"getScaleItemChange(idx, item)\"\n          [ngStyle]=\"{'background-color': (idx <= showSelection) ? color[idx] : ''}\"\n        >\n        </div>\n        </ng-container>\n      </div>\n  ",
                        styles: [
                            "\n    .container-scale {\n        display: flex;\n        margin-left: 30.4%;\n    }\n    .item{\n        width: 70px;\n        height: 8px;\n        margin-right: 10px;\n        background-color: grey;\n    }\n    "
                        ],
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                multi: true,
                                useExisting: NgxRatingLibComponent
                            }
                        ]
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { settings: [{
                    type: i0.Input
                }] } });

    var NgxRatingLibModule = /** @class */ (function () {
        function NgxRatingLibModule() {
        }
        return NgxRatingLibModule;
    }());
    NgxRatingLibModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingLibModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    NgxRatingLibModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingLibModule, declarations: [NgxRatingLibComponent], imports: [platformBrowser.BrowserModule], exports: [NgxRatingLibComponent] });
    NgxRatingLibModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingLibModule, imports: [[
                platformBrowser.BrowserModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingLibModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            NgxRatingLibComponent
                        ],
                        imports: [
                            platformBrowser.BrowserModule
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

    exports.NgxRatingLibComponent = NgxRatingLibComponent;
    exports.NgxRatingLibModule = NgxRatingLibModule;
    exports.NgxRatingLibService = NgxRatingLibService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-rating-lib.umd.js.map
