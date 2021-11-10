import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { getColorScale, toColorString } from './color-generator';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NgxRatingComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJhdGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcmF0aW5nL3NyYy9saWIvbmd4LXJhdGluZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcmF0aW5nL3NyYy9saWIvbmd4LXJhdGluZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUFxQ2pFLE1BQU0sT0FBTyxrQkFBa0I7SUF5QjdCO1FBckJBLFVBQUssR0FBVyxFQUFFLENBQUE7UUFDbEIsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUUxQixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBQ3RCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0Isa0JBQWEsR0FBVyxLQUFLLENBQUM7UUFDOUIsWUFBTyxHQUFlLEVBQWdCLENBQUM7UUFDdkMsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUVyQixzQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxHQUFHLENBQUMsQ0FBQztRQUNyRCxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekQsc0JBQWlCLEdBQVcsR0FBRyxDQUFDO1FBRWhDLGtCQUFhLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDM0Isb0JBQWUsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUN0QixVQUFLLEdBQWEsRUFBRSxDQUFDO1FBRzVCLGFBQVEsR0FBRyxDQUFDLElBQVUsRUFBRSxFQUFFLEdBQUUs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QUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7K0dBbkZVLGtCQUFrQjttR0FBbEIsa0JBQWtCLHVFQVJsQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixLQUFLLEVBQUMsSUFBSTtZQUNWLFdBQVcsRUFBRSxrQkFBa0I7U0FDaEM7S0FDRiwwQkN0Q0gscWxLQXNHQTsyRkQ5RGEsa0JBQWtCO2tCQWxDOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsV0FBVyxFQUFFLDZCQUE2QjtvQkFDMUMsTUFBTSxFQUFFO3dCQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW9CQztxQkFDRjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsS0FBSyxFQUFDLElBQUk7NEJBQ1YsV0FBVyxvQkFBb0I7eUJBQ2hDO3FCQUNGO2lCQUNGOzBFQUdVLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZ2V0Q29sb3JTY2FsZSwgdG9Db2xvclN0cmluZyB9IGZyb20gJy4vY29sb3ItZ2VuZXJhdG9yJztcbmltcG9ydCB7IENvbG9yLCBJdGVtLCBJdGVtRGV0YWlsLCBTZXR0aW5ncywgU2V0dGluZ3NJbWFnZSB9IGZyb20gJy4vbW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtcmF0aW5nJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1yYXRpbmcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgLnJhdGluZy1jb250YWluZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB9XG5cbiAgICAudGl0bGUge1xuICAgICAgdGV4dC10cmFuc2Zvcm06IGxvd2VyY2FzZTtcbiAgICB9XG5cbiAgICAuY29udGFpbmVyLXNjYWxlIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLml0ZW17XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICB9XG4gICAgYFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIG11bHRpOnRydWUsXG4gICAgICB1c2VFeGlzdGluZzogTmd4UmF0aW5nQ29tcG9uZW50XG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neFJhdGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEBJbnB1dCgpIHNldHRpbmdzITogU2V0dGluZ3M7XG5cbiAgaXRlbXM6IEl0ZW1bXSA9IFtdXG4gIHRoZW1lOiBzdHJpbmcgPSAnc3F1YXJlcyc7XG4gIGltYWdlcyE6IHN0cmluZ1tdO1xuICBzdHlsZXM6IHN0cmluZ1tdID0gW107XG4gIHNob3dUaXRsZTogYm9vbGVhbiA9IGZhbHNlO1xuICB0aXRsZVBvc2l0aW9uOiBzdHJpbmcgPSAndG9wJztcbiAgZGV0YWlsczogSXRlbURldGFpbCA9IHt9IGFzIEl0ZW1EZXRhaWw7XG4gIHN0eWxlOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHNob3dEZXNjcmlwdGlvbkJTID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCctJyk7XG4gIHNob3dEZXNjcmlwdGlvbiQgPSB0aGlzLnNob3dEZXNjcmlwdGlvbkJTLmFzT2JzZXJ2YWJsZSgpO1xuICBhY3R1YWxEZXNjcmlwdGlvbjogc3RyaW5nID0gJy0nO1xuXG4gIHNob3dTZWxlY3Rpb246IG51bWJlciA9IC0xO1xuICBhY3R1YWxTZWxlY3Rpb246IG51bWJlciA9IC0xO1xuICBwdWJsaWMgY29sb3I6IHN0cmluZ1tdID0gW107XG5cblxuICBvbkNoYW5nZSA9IChpdGVtOiBJdGVtKSA9PiB7fTtcbiAgb25Ub3VjaCA9IChpdGVtOiBJdGVtKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuc2V0dGluZ3MuaXRlbXMgfHwgW107XG4gICAgdGhpcy5pdGVtcyA9IGdldENvbG9yU2NhbGUodGhpcy5pdGVtcyk7XG4gICAgdGhpcy5jb2xvciA9IHRoaXMuaXRlbXMubWFwKGl0ZW0gPT4gdG9Db2xvclN0cmluZyhpdGVtLmNvbG9yIHx8IHt9IGFzIENvbG9yKSk7XG4gICAgdGhpcy50aGVtZSA9IHRoaXMuc2V0dGluZ3MudGhlbWUgfHwgJ3NxdWFyZXMnO1xuICAgIGlmKCdpbWFnZXMnIGluIHRoaXMuc2V0dGluZ3MpIHtcbiAgICAgIHRoaXMuaW1hZ2VzID0gKDxTZXR0aW5nc0ltYWdlPnRoaXMuc2V0dGluZ3MpLmltYWdlcztcbiAgICB9XG4gICAgdGhpcy5zaG93VGl0bGUgPSB0aGlzLnNldHRpbmdzLnNob3dUaXRsZTtcbiAgICB0aGlzLnRpdGxlUG9zaXRpb24gPSB0aGlzLnNldHRpbmdzLnRpdGxlUG9zaXRpb24gfHwgJ3RvcCc7XG4gICAgdGhpcy5kZXRhaWxzID0gdGhpcy5zZXR0aW5ncy5pdGVtRGV0YWlsO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShpdGVtOiBJdGVtKTogdm9pZCB7XG4gICAgaWYoT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoICE9PSAwKSB7XG4gICAgICB0aGlzLmFjdHVhbERlc2NyaXB0aW9uID0gaXRlbS5kZXNjcmlwdGlvbjtcbiAgICAgIHRoaXMuc2hvd0Rlc2NyaXB0aW9uQlMubmV4dChpdGVtLmRlc2NyaXB0aW9uKTtcbiAgICAgIHRoaXMuYWN0dWFsU2VsZWN0aW9uID0gdGhpcy5pdGVtcy5pbmRleE9mKFxuICAgICAgICB0aGlzLml0ZW1zLmZpbmQoZWwgPT4gaXRlbS5pZCA9PT0gZWwuaWQpIHx8IHt9IGFzIEl0ZW1cbiAgICAgICk7XG4gICAgICB0aGlzLnNob3dTZWxlY3Rpb24gPSB0aGlzLmFjdHVhbFNlbGVjdGlvbjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmFjdHVhbERlc2NyaXB0aW9uID0gJy0nO1xuICAgICAgdGhpcy5zaG93RGVzY3JpcHRpb25CUy5uZXh0KCctJyk7XG4gICAgfVxuXG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoID0gZm47XG4gIH1cblxuICBtb3VzZU92ZXIoc2VsZWN0ZWRJZHg6IG51bWJlciwgaXRlbTogSXRlbSl7XG4gICAgdGhpcy5zaG93RGVzY3JpcHRpb25CUy5uZXh0KGl0ZW0uZGVzY3JpcHRpb24pO1xuICAgIHRoaXMuc2hvd1NlbGVjdGlvbiA9IHNlbGVjdGVkSWR4O1xuICB9XG5cbiAgbW91c2VMZWF2ZSgpe1xuICAgIHRoaXMuc2hvd1NlbGVjdGlvbiA9IHRoaXMuYWN0dWFsU2VsZWN0aW9uO1xuICAgIHRoaXMuc2hvd0Rlc2NyaXB0aW9uQlMubmV4dCh0aGlzLmFjdHVhbERlc2NyaXB0aW9uKTtcbiAgfVxuXG4gIGdldFNjYWxlSXRlbUNoYW5nZShpbmRleFNlbGVjdGVkOiBudW1iZXIsIGl0ZW06IEl0ZW0pe1xuXG4gICAgaWYgKHRoaXMuYWN0dWFsU2VsZWN0aW9uICE9PSBpbmRleFNlbGVjdGVkKSB7XG4gICAgICB0aGlzLmFjdHVhbFNlbGVjdGlvbiA9IGluZGV4U2VsZWN0ZWQ7XG4gICAgICB0aGlzLnNob3dTZWxlY3Rpb24gPSBpbmRleFNlbGVjdGVkO1xuICAgICAgdGhpcy5hY3R1YWxEZXNjcmlwdGlvbiA9IGl0ZW0uZGVzY3JpcHRpb247XG4gICAgICB0aGlzLnNob3dEZXNjcmlwdGlvbkJTLm5leHQoaXRlbS5kZXNjcmlwdGlvbik7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGl0ZW0pO1xuICAgIH1cbiAgfVxuXG59XG4iLCI8ZGl2IGNsYXNzPVwicmF0aW5nLWNvbnRhaW5lclwiXHJcbiAgICBbbmdTdHlsZV09XCJ7J2ZsZXgtZGlyZWN0aW9uJzogKHRpdGxlUG9zaXRpb24gPT09ICd0b3AnKSA/ICdjb2x1bW4nIDogKHRpdGxlUG9zaXRpb24gPT09ICdsZWZ0JykgPyAncm93JyA6ICh0aXRsZVBvc2l0aW9uID09PSAncmlnaHQnKSA/ICdyb3ctcmV2ZXJzZScgOiAnY29sdW1uLXJldmVyc2UnfVwiXHJcbj5cclxuICAgIDxkaXZcclxuICAgICAgICBjbGFzcz1cInRpdGxlXCJcclxuICAgICAgICAqbmdJZj1cInNob3dUaXRsZVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgICAgICAnbWFyZ2luJzogdGl0bGVQb3NpdGlvbiA9PT0gJ3RvcCcgPyAnMCAwIDIwcHggMCcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlUG9zaXRpb24gPT09ICdib3R0b20nID8gJzIwcHggMCAwIDAnIDpcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZVBvc2l0aW9uID09PSAnbGVmdCcgPyAnMCAyMHB4IDAgMCcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlUG9zaXRpb24gPT09ICdyaWdodCcgPyAnMCAwIDAgMjBweCcgOiAnJ1xyXG4gICAgICAgIH1cIlxyXG4gICAgPlxyXG4gICAgICAgIHt7c2hvd0Rlc2NyaXB0aW9uJCB8IGFzeW5jfX1cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1zY2FsZVwiICpuZ0lmPVwic2V0dGluZ3NcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zOyBsZXQgaWR4ID0gaW5kZXhcIj5cclxuICAgICAgICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwidGhlbWVcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCJcclxuICAgICAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3NxdWFyZXMnXCJcclxuICAgICAgICAgICAgICAgICAgICAobW91c2VvdmVyKT1cIm1vdXNlT3ZlcihpZHgsIGl0ZW0pXCJcclxuICAgICAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJtb3VzZUxlYXZlKClcIlxyXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJnZXRTY2FsZUl0ZW1DaGFuZ2UoaWR4LCBpdGVtKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cImRldGFpbHMud2lkdGhcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiZGV0YWlscy5oZWlnaHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IChpZHggPD0gc2hvd1NlbGVjdGlvbikgPyBjb2xvcltpZHhdIDogJ2dyZXknfVwiXHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCJcclxuICAgICAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3JvdW5kZWRfc3F1YXJlcydcIlxyXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZW92ZXIpPVwibW91c2VPdmVyKGlkeCwgaXRlbSlcIlxyXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cIm1vdXNlTGVhdmUoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImdldFNjYWxlSXRlbUNoYW5nZShpZHgsIGl0ZW0pXCJcclxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwiZGV0YWlscy53aWR0aFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJkZXRhaWxzLmhlaWdodFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IChpZHggPD0gc2hvd1NlbGVjdGlvbikgPyBjb2xvcltpZHhdIDogJ2dyZXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IGlkeCA9PT0gMCA/ICc4cHggMCAwIDhweCcgOiBpZHggPT09IGl0ZW1zLmxlbmd0aC0xID8gJzAgOHB4IDhweCAwJyA6ICcnfVwiXHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidzaW5nbGVfaWNvbidcIlxyXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZW92ZXIpPVwibW91c2VPdmVyKGlkeCwgaXRlbSlcIlxyXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cIm1vdXNlTGVhdmUoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImdldFNjYWxlSXRlbUNoYW5nZShpZHgsIGl0ZW0pXCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiaW1hZ2VzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpdGVtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cImRldGFpbHMud2lkdGhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImRldGFpbHMuaGVpZ2h0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLm1hc2sudXJsXT1cImltYWdlc1swXVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrLXNpemU6IHt7ZGV0YWlscy53aWR0aH19cHgge3tkZXRhaWxzLmhlaWdodH19cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtd2Via2l0LW1hc2s6IHVybCh7e2ltYWdlc1swXX19KSBuby1yZXBlYXQgY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLXdlYmtpdC1tYXNrLXNpemU6IHt7ZGV0YWlscy53aWR0aH19cHgge3tkZXRhaWxzLmhlaWdodH19cHhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiAoaWR4IDw9IHNob3dTZWxlY3Rpb24pID8gY29sb3JbaWR4XSA6ICdncmV5J31cIlxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ211bHRpcGxlX2ljb25zJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlb3Zlcik9XCJtb3VzZU92ZXIoaWR4LCBpdGVtKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwibW91c2VMZWF2ZSgpXCJcclxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZ2V0U2NhbGVJdGVtQ2hhbmdlKGlkeCwgaXRlbSlcIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpbWFnZXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIml0ZW1cIlxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImlkeCA8PSBzaG93U2VsZWN0aW9uOyBlbHNlIGZhbHNlSXRlbXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cImRldGFpbHMud2lkdGhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJkZXRhaWxzLmhlaWdodFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImNvbG9yW2lkeF1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB1cmwoe3tpbWFnZXNbMF19fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzay1zaXplOiB7e2RldGFpbHMud2lkdGh9fXB4IHt7ZGV0YWlscy5oZWlnaHR9fXB4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC13ZWJraXQtbWFzazogdXJsKHt7aW1hZ2VzWzBdfX0pIG5vLXJlcGVhdCBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLXdlYmtpdC1tYXNrLXNpemU6IHt7ZGV0YWlscy53aWR0aH19cHgge3tkZXRhaWxzLmhlaWdodH19cHg7XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNmYWxzZUl0ZW1zPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJkZXRhaWxzLndpZHRoXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImRldGFpbHMuaGVpZ2h0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cIidncmV5J1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdXJsKHt7aW1hZ2VzWzFdfX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrLXNpemU6IHt7ZGV0YWlscy53aWR0aH19cHgge3tkZXRhaWxzLmhlaWdodH19cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC13ZWJraXQtbWFzazogdXJsKHt7aW1hZ2VzWzFdfX0pIG5vLXJlcGVhdCBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC13ZWJraXQtbWFzay1zaXplOiB7e2RldGFpbHMud2lkdGh9fXB4IHt7ZGV0YWlscy5oZWlnaHR9fXB4O1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19