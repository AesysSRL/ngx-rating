import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxRatingComponent } from './ngx-rating.component';


@NgModule({
  declarations: [
    NgxRatingComponent
  ],
  imports: [
    CommonModule,
    //BrowserModule,
    TooltipModule
  ],
  exports: [
    NgxRatingComponent
  ]
})
export class NgxRatingModule { }
