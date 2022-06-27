import { TestBed } from '@angular/core/testing';

import { HrisService } from './hris.service';

describe('HrisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrisService = TestBed.get(HrisService);
    expect(service).toBeTruthy();
  });
});
