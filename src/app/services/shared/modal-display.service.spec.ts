import { TestBed } from '@angular/core/testing';

import { ModalDisplayService } from './modal-display.service';

describe('ModalDisplayService', () => {
  let service: ModalDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
