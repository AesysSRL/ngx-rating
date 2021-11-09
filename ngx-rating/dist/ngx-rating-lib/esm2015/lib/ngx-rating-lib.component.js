import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { getColorScale } from './color-generator';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NgxRatingLibComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJhdGluZy1saWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXJhdGluZy1saWIvc3JjL2xpYi9uZ3gtcmF0aW5nLWxpYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUEyQ2xELE1BQU0sT0FBTyxxQkFBcUI7SUFpQmhDO1FBZEEsVUFBSyxHQUFXLEVBQUUsQ0FBQTtRQUVsQixzQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxHQUFHLENBQUMsQ0FBQztRQUNyRCxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekQsc0JBQWlCLEdBQVcsR0FBRyxDQUFDO1FBRWhDLGtCQUFhLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDM0Isb0JBQWUsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUN0QixVQUFLLEdBQWEsRUFBRSxDQUFDO1FBRzVCLGFBQVEsR0FBRyxDQUFDLElBQVUsRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQzlCLFlBQU8sR0FBRyxDQUFDLElBQVUsRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFFBQVE7O1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUEsTUFBQSxJQUFJLENBQUMsUUFBUSwwQ0FBRSxLQUFLLEtBQUksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFVOztRQUNuQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUEsTUFBQSxJQUFJLENBQUMsUUFBUSwwQ0FBRSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsU0FBUyxDQUFDLFdBQW1CLEVBQUUsSUFBVTtRQUN2QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztJQUNuQyxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxhQUFxQixFQUFFLElBQVU7UUFDbEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLEtBQUssRUFBRTtZQUVsQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7a0hBOURVLHFCQUFxQjtzR0FBckIscUJBQXFCLDJFQVJyQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixLQUFLLEVBQUMsSUFBSTtZQUNWLFdBQVcsRUFBRSxxQkFBcUI7U0FDbkM7S0FDRiwwQkFwQ1M7Ozs7Ozs7Ozs7Ozs7OztHQWVUOzJGQXVCVSxxQkFBcUI7a0JBeENqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7b0JBQ0QsTUFBTSxFQUFFO3dCQUNOOzs7Ozs7Ozs7OztLQVdDO3FCQUNGO29CQUNELFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixLQUFLLEVBQUMsSUFBSTs0QkFDVixXQUFXLHVCQUF1Qjt5QkFDbkM7cUJBQ0Y7aUJBQ0Y7MEVBR1UsUUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBnZXRDb2xvclNjYWxlIH0gZnJvbSAnLi9jb2xvci1nZW5lcmF0b3InO1xuaW1wb3J0IHsgSXRlbSwgU2V0dGluZ3MgfSBmcm9tICcuL21vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXJhdGluZy1saWInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICB7e3Nob3dEZXNjcmlwdGlvbiQgfCBhc3luY319XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1zY2FsZVwiICpuZ0lmPVwic2V0dGluZ3NcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzZXR0aW5ncy5pdGVtczsgbGV0IGlkeCA9IGluZGV4XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIlxuICAgICAgICAgIChtb3VzZW92ZXIpPVwibW91c2VPdmVyKGlkeCwgaXRlbSlcIlxuICAgICAgICAgIChtb3VzZWxlYXZlKT1cIm1vdXNlTGVhdmUoKVwiXG4gICAgICAgICAgKGNsaWNrKT1cImdldFNjYWxlSXRlbUNoYW5nZShpZHgsIGl0ZW0pXCJcbiAgICAgICAgICBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiAoaWR4IDw9IHNob3dTZWxlY3Rpb24pID8gY29sb3JbaWR4XSA6ICcnfVwiXG4gICAgICAgID5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAuY29udGFpbmVyLXNjYWxlIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDMwLjQlO1xuICAgIH1cbiAgICAuaXRlbXtcbiAgICAgICAgd2lkdGg6IDcwcHg7XG4gICAgICAgIGhlaWdodDogOHB4O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG4gICAgfVxuICAgIGBcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICBtdWx0aTp0cnVlLFxuICAgICAgdXNlRXhpc3Rpbmc6IE5neFJhdGluZ0xpYkNvbXBvbmVudFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hSYXRpbmdMaWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yICB7XG5cbiAgQElucHV0KCkgc2V0dGluZ3M/OiBTZXR0aW5ncztcbiAgaXRlbXM6IEl0ZW1bXSA9IFtdXG5cbiAgc2hvd0Rlc2NyaXB0aW9uQlMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJy0nKTtcbiAgc2hvd0Rlc2NyaXB0aW9uJCA9IHRoaXMuc2hvd0Rlc2NyaXB0aW9uQlMuYXNPYnNlcnZhYmxlKCk7XG4gIGFjdHVhbERlc2NyaXB0aW9uOiBzdHJpbmcgPSAnLSc7XG5cbiAgc2hvd1NlbGVjdGlvbjogbnVtYmVyID0gLTE7XG4gIGFjdHVhbFNlbGVjdGlvbjogbnVtYmVyID0gLTE7XG4gIHB1YmxpYyBjb2xvcjogc3RyaW5nW10gPSBbXTtcblxuXG4gIG9uQ2hhbmdlID0gKGl0ZW06IEl0ZW0pID0+IHt9O1xuICBvblRvdWNoID0gKGl0ZW06IEl0ZW0pID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdjb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ29uIGluaXQnKTtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5zZXR0aW5ncz8uaXRlbXMgfHwgW107XG4gICAgdGhpcy5jb2xvciA9IGdldENvbG9yU2NhbGUodGhpcy5pdGVtcy5sZW5ndGgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShpdGVtOiBJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5hY3R1YWxEZXNjcmlwdGlvbiA9IGl0ZW0uZGVzY3JpcHRpb247XG4gICAgdGhpcy5zaG93RGVzY3JpcHRpb25CUy5uZXh0KGl0ZW0uZGVzY3JpcHRpb24pO1xuICAgIHRoaXMuYWN0dWFsU2VsZWN0aW9uID0gdGhpcy5zZXR0aW5ncz8uaXRlbXMuaW5kZXhPZihpdGVtKSB8fCAtMTtcbiAgICB0aGlzLnNob3dTZWxlY3Rpb24gPSB0aGlzLmFjdHVhbFNlbGVjdGlvbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIG1vdXNlT3ZlcihzZWxlY3RlZElkeDogbnVtYmVyLCBpdGVtOiBJdGVtKXtcbiAgICB0aGlzLnNob3dEZXNjcmlwdGlvbkJTLm5leHQoaXRlbS5kZXNjcmlwdGlvbik7XG4gICAgdGhpcy5zaG93U2VsZWN0aW9uID0gc2VsZWN0ZWRJZHg7XG4gIH1cblxuICBtb3VzZUxlYXZlKCl7XG4gICAgdGhpcy5zaG93U2VsZWN0aW9uID0gdGhpcy5hY3R1YWxTZWxlY3Rpb247XG4gICAgdGhpcy5zaG93RGVzY3JpcHRpb25CUy5uZXh0KHRoaXMuYWN0dWFsRGVzY3JpcHRpb24pO1xuICB9XG5cbiAgZ2V0U2NhbGVJdGVtQ2hhbmdlKGluZGV4U2VsZWN0ZWQ6IG51bWJlciwgaXRlbTogSXRlbSl7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgaWYgKHRoaXMuYWN0dWFsU2VsZWN0aW9uICE9PSBpbmRleCkge1xuXG4gICAgICB0aGlzLmFjdHVhbFNlbGVjdGlvbiA9IGluZGV4O1xuICAgICAgdGhpcy5zaG93U2VsZWN0aW9uID0gaW5kZXg7XG4gICAgICB0aGlzLmFjdHVhbERlc2NyaXB0aW9uID0gaXRlbS5kZXNjcmlwdGlvbjtcbiAgICAgIHRoaXMuc2hvd0Rlc2NyaXB0aW9uQlMubmV4dChpdGVtLmRlc2NyaXB0aW9uKTtcbiAgICAgIHRoaXMub25DaGFuZ2UoaXRlbSk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==