import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRatingComponent } from './ngx-rating.component';

describe('NgxRatingComponent', () => {
  let component: NgxRatingComponent;
  let fixture: ComponentFixture<NgxRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
