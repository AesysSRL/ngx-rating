import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { getColorScale, toColorString } from './color-generator';
import { Color, Item, ItemDetail, Settings } from './model';

@Component({
  selector: 'ngx-rating-lib',
  template: `
    <div>
      {{showDescription$ | async}}
    </div>
    <div class="container-scale" *ngIf="settings">
        <ng-container *ngFor="let item of items; let idx = index">
          <div [ngSwitch]="theme">
            <div class="item"
            *ngSwitchCase="'squares'"     
            (mouseover)="mouseOver(idx, item)"
            (mouseleave)="mouseLeave()"
            (click)="getScaleItemChange(idx, item)"
            style="
              width: {{details.width}}px;
              height: {{details.height}}px;  
            "
            [ngStyle]="{'background-color': (idx <= showSelection) ? color[idx] : ''}"
            >
            </div>

            <div class="item"
            *ngSwitchCase="'rounded_squares'"     
            (mouseover)="mouseOver(idx, item)"
            (mouseleave)="mouseLeave()"
            (click)="getScaleItemChange(idx, item)"
            style="
              width: {{details.width}}px;
              height: {{details.height}}px;  
            "
            [ngStyle]="{
              'background-color': (idx <= showSelection) ? color[idx] : '', 
              'border-radius': idx === 0 ? '8px 0 0 8px' : idx === items.length-1 ? '0 8px 8px 0' : ''}"
            >
            </div>

            <div 
            *ngSwitchCase="'single_icon'"
            (mouseover)="mouseOver(idx, item)"
            (mouseleave)="mouseLeave()"
            (click)="getScaleItemChange(idx, item)"
            >
              <div
              *ngIf="images"
              style="
                mask: url({{images[0]}});
                height: {{details.height}}px; 
                width: {{details.width}}px;
                -webkit-mask: url({{images[0]}}) no-repeat center;"
              [ngStyle]="{'background-color': (idx <= showSelection) ? color[idx] : 'grey'}"
              >

              </div>
            </div>

            <div
            *ngSwitchCase="'multiple-icons'"     
            (mouseover)="mouseOver(idx, item)"
            (mouseleave)="mouseLeave()"
            (click)="getScaleItemChange(idx, item)"
            >
              <div
                *ngIf="images"
                
              >
                <div *ngIf="idx <= showSelection; else falseItems"
                style="
                  mask: url({{images[0]}});
                  height: {{details.height}}px; 
                  width: {{details.width}}px;
                  -webkit-mask: url({{images[0]}}) no-repeat center;
                  background-color: {{color[idx]}}"
                >
                </div>
                <ng-template #falseItems>
                  <div style="
                    mask: url({{images[1]}});
                    height: {{details.height}}px; 
                    width: {{details.width}}px;
                    -webkit-mask: url({{images[1]}}) no-repeat center;
                    background-color: grey"
                  >
                  </div>
                </ng-template>
              </div>              
            </div>
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
  theme: string = 'squares';
  images?: string[];
  details: ItemDetail = {} as ItemDetail;

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
    this.items = getColorScale(this.items);
    this.color = this.items.map(item => toColorString(item.color || {} as Color));
    this.theme = this.settings?.theme || 'squares';
    this.images = this.settings?.images;
    this.details = this.settings?.itemDetail || {} as ItemDetail;
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
    
    if (this.actualSelection !== indexSelected) {
      this.actualSelection = indexSelected;
      this.showSelection = indexSelected;
      this.actualDescription = item.description;
      this.showDescriptionBS.next(item.description);
      this.onChange(item);
    }
  }

}
