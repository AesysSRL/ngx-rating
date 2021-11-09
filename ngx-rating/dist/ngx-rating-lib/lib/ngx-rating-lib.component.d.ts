import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Item, Settings } from './model';
import * as i0 from "@angular/core";
export declare class NgxRatingLibComponent implements OnInit, ControlValueAccessor {
    settings?: Settings;
    items: Item[];
    showDescriptionBS: BehaviorSubject<string>;
    showDescription$: import("rxjs").Observable<string>;
    actualDescription: string;
    showSelection: number;
    actualSelection: number;
    color: string[];
    onChange: (item: Item) => void;
    onTouch: (item: Item) => void;
    constructor();
    ngOnInit(): void;
    writeValue(item: Item): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    mouseOver(selectedIdx: number, item: Item): void;
    mouseLeave(): void;
    getScaleItemChange(indexSelected: number, item: Item): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxRatingLibComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxRatingLibComponent, "ngx-rating-lib", never, { "settings": "settings"; }, {}, never, never>;
}
