import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { getColorScale } from './color-generator';
import { Item, Settings } from './model';

@Component({
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
      multi:true,
      useExisting: NgxRatingLibComponent
    }
  ]
})
export class NgxRatingLibComponent implements OnInit, ControlValueAccessor  {

  @Input() settings?: Settings;
  items: Item[] = []

  showDescriptionBS = new BehaviorSubject<string>('-');
  showDescription$ = this.showDescriptionBS.asObservable();
  actualDescription: string = '-';

  showSelection: number = -1;
  actualSelection: number = -1;
  public color: string[] = [];


  onChange = (item: Item) => {};
  onTouch = (item: Item) => {};

  constructor() {}

  ngOnInit(): void {
    this.items = this.settings?.items || [];
    this.color = getColorScale(this.items.length);
  }

  writeValue(item: Item): void {
    if(Object.keys(item).length !== 0) {
      this.actualDescription = item.description;
      this.showDescriptionBS.next(item.description);
      this.actualSelection = this.items.indexOf(
        this.items.find(el => item.id === el.id) || {} as Item
      );
      this.showSelection = this.actualSelection;
    }
    else {
      this.actualDescription = '-';
      this.showDescriptionBS.next('-');
    }

  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  mouseOver(selectedIdx: number, item: Item){
    this.showDescriptionBS.next(item.description);
    this.showSelection = selectedIdx;
  }

  mouseLeave(){
    this.showSelection = this.actualSelection;
    this.showDescriptionBS.next(this.actualDescription);
  }

  getScaleItemChange(indexSelected: number, item: Item){
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
