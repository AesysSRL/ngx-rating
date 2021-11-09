import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { getColorScale, toColorString } from './color-generator';
import { Color, Item, ItemDetail, Settings, SettingsImage } from './model';

@Component({
  selector: 'ngx-rating-lib',
  templateUrl: './ngx-rating-lib.component.html',
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
      multi:true,
      useExisting: NgxRatingLibComponent
    }
  ]
})
export class NgxRatingLibComponent implements OnInit, ControlValueAccessor  {

  @Input() settings!: Settings;

  items: Item[] = []
  theme: string = 'squares';
  images!: string[];
  styles: string[] = [];
  showTitle: boolean = false;
  titlePosition: string = 'top';
  details: ItemDetail = {} as ItemDetail;
  style: string[] = [];

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
    this.items = this.settings.items || [];
    this.items = getColorScale(this.items);
    this.color = this.items.map(item => toColorString(item.color || {} as Color));
    this.theme = this.settings.theme || 'squares';
    if('images' in this.settings) {
      this.images = (<SettingsImage>this.settings).images;
    }
    this.showTitle = this.settings.showTitle;
    this.titlePosition = this.settings.titlePosition || 'top';
    this.details = this.settings.itemDetail;
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