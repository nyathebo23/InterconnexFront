import { TestBed } from '@angular/core/testing';

import { AuthorityLocalinformerService } from './authority-localinformer.service';

describe('AuthorityLocalinformerService', () => {
  let service: AuthorityLocalinformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorityLocalinformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
