import { TestBed } from '@angular/core/testing';

import { NgxRatingLibService } from './ngx-rating-lib.service';

describe('NgxRatingLibService', () => {
  let service: NgxRatingLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRatingLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
