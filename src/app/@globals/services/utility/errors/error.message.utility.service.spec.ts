import { TestBed } from '@angular/core/testing';

import { ErrorMessageUtilityService } from './error.message.utility.service';

describe('ErrorMessageUtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorMessageUtilityService = TestBed.get(ErrorMessageUtilityService);
    expect(service).toBeTruthy();
  });
});
