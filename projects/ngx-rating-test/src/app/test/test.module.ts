import { NgModule } from '@angular/core';
import { NgxRatingModule } from 'projects/ngx-rating/src/public-api';
import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    //CommonModule,
    TestRoutingModule,
    NgxRatingModule
  ]
})
export class TestModule { }
