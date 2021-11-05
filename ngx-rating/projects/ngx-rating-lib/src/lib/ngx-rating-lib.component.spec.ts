import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRatingLibComponent } from './ngx-rating-lib.component';

describe('NgxRatingLibComponent', () => {
  let component: NgxRatingLibComponent;
  let fixture: ComponentFixture<NgxRatingLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxRatingLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRatingLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
