import { TestBed } from '@angular/core/testing';

import { ActionsOnDDIAListService } from './actions-on-ddia-list.service';

describe('ActionsOnDDIAListService', () => {
  let service: ActionsOnDDIAListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionsOnDDIAListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
