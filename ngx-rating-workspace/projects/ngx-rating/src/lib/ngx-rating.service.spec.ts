import { TestBed } from '@angular/core/testing';

import { NgxRatingService } from './ngx-rating.service';

describe('NgxRatingService', () => {
  let service: NgxRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
