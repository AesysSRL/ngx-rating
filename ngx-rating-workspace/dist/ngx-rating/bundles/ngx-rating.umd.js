(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('@angular/common'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('ngx-rating', ['exports', '@angular/core', '@angular/forms', 'rxjs', '@angular/common', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ngx-rating"] = {}, global.ng.core, global.ng.forms, global.rxjs, global.ng.common, global.ng.platformBrowser));
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

    var NgxRatingService = /** @class */ (function () {
        function NgxRatingService() {
        }
        return NgxRatingService;
    }());
    NgxRatingService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    NgxRatingService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    function getColorScale(items) {
        if (!checkIntegrity(items)) {
            console.error("ALL RGB VALUES MUST BE BETWEEN 0 AND 255");
            return items.map(function (item) {
                return Object.assign(Object.assign({}, item), { color: getColor(255, 0, 0) });
            });
        }
        if (!items[0].color) {
            console.error("SET FIRST ITEM'S COLOR FIELD");
            var toReturn = items;
            toReturn[0].color = getColor(255, 0, 0);
        }
        if (items[0].color && !items[items.length - 1].color) {
            var color_1 = items[0].color;
            return items.map(function (item) { return Object.assign(Object.assign({}, item), { color: color_1 }); });
        }
        else {
            var toReturn = [items[0]];
            while (toReturn.length !== items.length) {
                var toCalculate = [];
                var first = toReturn[toReturn.length - 1].color || {};
                for (var i = toReturn.length; !items[i].color && i < items.length; i++) {
                    toCalculate.push(items[i]);
                }
                var last = items[toReturn.length + toCalculate.length].color || {};
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
        var difference = getColor(last.red - first.red, last.green - first.green, last.blue - first.blue);
        return items.map(function (item, idx) {
            return Object.assign(Object.assign({}, item), { color: getColor(first.red + ((difference.red / (items.length + 1)) * (idx + 1)), first.green + ((difference.green / (items.length + 1)) * (idx + 1)), first.blue + ((difference.blue / (items.length + 1)) * (idx + 1))) });
        });
    }
    function toColorString(color) {
        return "rgb(" + color.red + "," + color.green + "," + color.blue + ")";
    }
    function checkIntegrity(items) {
        var integrity = true;
        items.forEach(function (item) {
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

    var NgxRatingComponent = /** @class */ (function () {
        function NgxRatingComponent() {
            this.items = [];
            this.theme = 'squares';
            this.styles = [];
            this.showTitle = false;
            this.titlePosition = 'top';
            this.details = {};
            this.style = [];
            this.showDescriptionBS = new rxjs.BehaviorSubject('-');
            this.showDescription$ = this.showDescriptionBS.asObservable();
            this.actualDescription = '-';
            this.showSelection = -1;
            this.actualSelection = -1;
            this.color = [];
            this.onChange = function (item) { };
            this.onTouch = function (item) { };
        }
        NgxRatingComponent.prototype.ngOnInit = function () {
            this.items = this.settings.items || [];
            this.items = getColorScale(this.items);
            this.color = this.items.map(function (item) { return toColorString(item.color || {}); });
            this.theme = this.settings.theme || 'squares';
            if ('images' in this.settings) {
                this.images = this.settings.images;
            }
            this.showTitle = this.settings.showTitle;
            this.titlePosition = this.settings.titlePosition || 'top';
            this.details = this.settings.itemDetail;
        };
        NgxRatingComponent.prototype.writeValue = function (item) {
            if (Object.keys(item).length !== 0) {
                this.actualDescription = item.description;
                this.showDescriptionBS.next(item.description);
                this.actualSelection = this.items.indexOf(this.items.find(function (el) { return item.id === el.id; }) || {});
                this.showSelection = this.actualSelection;
            }
            else {
                this.actualDescription = '-';
                this.showDescriptionBS.next('-');
            }
        };
        NgxRatingComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        NgxRatingComponent.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        NgxRatingComponent.prototype.mouseOver = function (selectedIdx, item) {
            this.showDescriptionBS.next(item.description);
            this.showSelection = selectedIdx;
        };
        NgxRatingComponent.prototype.mouseLeave = function () {
            this.showSelection = this.actualSelection;
            this.showDescriptionBS.next(this.actualDescription);
        };
        NgxRatingComponent.prototype.getScaleItemChange = function (indexSelected, item) {
            if (this.actualSelection !== indexSelected) {
                this.actualSelection = indexSelected;
                this.showSelection = indexSelected;
                this.actualDescription = item.description;
                this.showDescriptionBS.next(item.description);
                this.onChange(item);
            }
        };
        return NgxRatingComponent;
    }());
    NgxRatingComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    NgxRatingComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: NgxRatingComponent, selector: "ngx-rating", inputs: { settings: "settings" }, providers: [
            {
                provide: forms.NG_VALUE_ACCESSOR,
                multi: true,
                useExisting: NgxRatingComponent
            }
        ], ngImport: i0__namespace, template: "<div class=\"rating-container\"\r\n    [ngStyle]=\"{'flex-direction': (titlePosition === 'top') ? 'column' : (titlePosition === 'left') ? 'row' : (titlePosition === 'right') ? 'row-reverse' : 'column-reverse'}\"\r\n>\r\n    <div\r\n        class=\"title\"\r\n        *ngIf=\"showTitle\"\r\n        [ngStyle]=\"{\r\n            'margin': titlePosition === 'top' ? '0 0 20px 0' :\r\n                    titlePosition === 'bottom' ? '20px 0 0 0' :\r\n                    titlePosition === 'left' ? '0 20px 0 0' :\r\n                    titlePosition === 'right' ? '0 0 0 20px' : ''\r\n        }\"\r\n    >\r\n        {{showDescription$ | async}}\r\n    </div>\r\n    <div class=\"container-scale\" *ngIf=\"settings\">\r\n        <ng-container *ngFor=\"let item of items; let idx = index\">\r\n            <div [ngSwitch]=\"theme\">\r\n                <div class=\"item\"\r\n                    *ngSwitchCase=\"'squares'\"\r\n                    (mouseover)=\"mouseOver(idx, item)\"\r\n                    (mouseleave)=\"mouseLeave()\"\r\n                    (click)=\"getScaleItemChange(idx, item)\"\r\n                    [style.width.px]=\"details.width\"\r\n                    [style.height.px]=\"details.height\"\r\n                    [ngStyle]=\"{'background-color': (idx <= showSelection) ? color[idx] : 'grey'}\"\r\n                >\r\n                </div>\r\n                <div class=\"item\"\r\n                    *ngSwitchCase=\"'rounded_squares'\"\r\n                    (mouseover)=\"mouseOver(idx, item)\"\r\n                    (mouseleave)=\"mouseLeave()\"\r\n                    (click)=\"getScaleItemChange(idx, item)\"\r\n                    [style.width.px]=\"details.width\"\r\n                    [style.height.px]=\"details.height\"\r\n                    [ngStyle]=\"{\r\n                        'background-color': (idx <= showSelection) ? color[idx] : 'grey',\r\n                        'border-radius': idx === 0 ? '8px 0 0 8px' : idx === items.length-1 ? '0 8px 8px 0' : ''}\"\r\n                >\r\n                </div>\r\n\r\n                <div\r\n                    *ngSwitchCase=\"'single_icon'\"\r\n                    (mouseover)=\"mouseOver(idx, item)\"\r\n                    (mouseleave)=\"mouseLeave()\"\r\n                    (click)=\"getScaleItemChange(idx, item)\"\r\n                >\r\n                    <div\r\n                        *ngIf=\"images\"\r\n                        class=\"item\"\r\n                        [style.width.px]=\"details.width\"\r\n                        [style.height.px]=\"details.height\"\r\n                        [style.mask.url]=\"images[0]\"\r\n                        style=\"\r\n                            mask-size: {{details.width}}px {{details.height}}px;\r\n                            -webkit-mask: url({{images[0]}}) no-repeat center;\r\n                            -webkit-mask-size: {{details.width}}px {{details.height}}px\"\r\n                        [ngStyle]=\"{'background-color': (idx <= showSelection) ? color[idx] : 'grey'}\"\r\n                    >\r\n                    </div>\r\n                </div>\r\n\r\n                <div\r\n                    *ngSwitchCase=\"'multiple_icons'\"\r\n                    (mouseover)=\"mouseOver(idx, item)\"\r\n                    (mouseleave)=\"mouseLeave()\"\r\n                    (click)=\"getScaleItemChange(idx, item)\"\r\n                >\r\n                    <div\r\n                        *ngIf=\"images\"\r\n                        class=\"item\"\r\n                    >\r\n                        <div *ngIf=\"idx <= showSelection; else falseItems\"\r\n                            [style.width.px]=\"details.width\"\r\n                            [style.height.px]=\"details.height\"\r\n                            [style.backgroundColor]=\"color[idx]\"\r\n                            style=\"\r\n                                mask: url({{images[0]}});\r\n                                mask-size: {{details.width}}px {{details.height}}px;\r\n                                -webkit-mask: url({{images[0]}}) no-repeat center;\r\n                                -webkit-mask-size: {{details.width}}px {{details.height}}px;\"\r\n                        >\r\n                        </div>\r\n                        <ng-template #falseItems>\r\n                            <div\r\n                                [style.width.px]=\"details.width\"\r\n                                [style.height.px]=\"details.height\"\r\n                                [style.backgroundColor]=\"'grey'\"\r\n                                style=\"\r\n                                    mask: url({{images[1]}});\r\n                                    mask-size: {{details.width}}px {{details.height}}px;\r\n                                    -webkit-mask: url({{images[1]}}) no-repeat center;\r\n                                    -webkit-mask-size: {{details.width}}px {{details.height}}px;\"\r\n                            >\r\n                            </div>\r\n                        </ng-template>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n</div>\r\n", styles: ["\n    .rating-container {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n\n    .title {\n      text-transform: lowercase;\n    }\n\n    .container-scale {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n\n    .item{\n        margin-right: 10px;\n    }\n    "], directives: [{ type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1__namespace.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], pipes: { "async": i1__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-rating',
                        templateUrl: './ngx-rating.component.html',
                        styles: [
                            "\n    .rating-container {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n\n    .title {\n      text-transform: lowercase;\n    }\n\n    .container-scale {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n\n    .item{\n        margin-right: 10px;\n    }\n    "
                        ],
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                multi: true,
                                useExisting: NgxRatingComponent
                            }
                        ]
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { settings: [{
                    type: i0.Input
                }] } });

    var NgxRatingModule = /** @class */ (function () {
        function NgxRatingModule() {
        }
        return NgxRatingModule;
    }());
    NgxRatingModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    NgxRatingModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingModule, declarations: [NgxRatingComponent], imports: [platformBrowser.BrowserModule], exports: [NgxRatingComponent] });
    NgxRatingModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingModule, imports: [[
                platformBrowser.BrowserModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxRatingModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            NgxRatingComponent
                        ],
                        imports: [
                            platformBrowser.BrowserModule
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

    exports.NgxRatingComponent = NgxRatingComponent;
    exports.NgxRatingModule = NgxRatingModule;
    exports.NgxRatingService = NgxRatingService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-rating.umd.js.map
