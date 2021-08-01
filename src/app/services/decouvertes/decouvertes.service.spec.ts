import { TestBed } from '@angular/core/testing';

import { DecouvertesService } from './decouvertes.service';

describe('DecouvertesService', () => {
  let service: DecouvertesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecouvertesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
