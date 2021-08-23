import { TestBed } from '@angular/core/testing';

import { PusherSourceStructureService } from './pusher-source-structure.service';

describe('PusherSourceStructureService', () => {
  let service: PusherSourceStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusherSourceStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
