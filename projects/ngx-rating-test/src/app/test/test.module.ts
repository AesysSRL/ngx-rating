import { NgModule } from '@angular/core';
import { NgxRatingModule } from './../../../../../dist/ngx-rating/lib/ngx-rating.module';
import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    TestRoutingModule,
    NgxRatingModule
  ]
})
export class TestModule { }
