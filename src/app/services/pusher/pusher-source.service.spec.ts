import { TestBed } from '@angular/core/testing';

import { PusherSourceService } from './pusher-source.service';

describe('PusherSourceService', () => {
  let service: PusherSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusherSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
