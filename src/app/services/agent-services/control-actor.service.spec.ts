import { TestBed } from '@angular/core/testing';

import { ControlActorService } from './control-actor.service';

describe('ControlActorService', () => {
  let service: ControlActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlActorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
