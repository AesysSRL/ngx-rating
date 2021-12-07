import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxRatingComponent } from './ngx-rating.component';



@NgModule({
  declarations: [
    NgxRatingComponent
  ],
  imports: [
    CommonModule
    //BrowserModule
  ],
  exports: [
    NgxRatingComponent
  ]
})
export class NgxRatingModule { }
