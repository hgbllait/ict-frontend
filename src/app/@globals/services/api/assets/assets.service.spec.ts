import { TestBed } from '@angular/core/testing';

import { AssetsService } from './signup.service';

describe('SignupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetsService = TestBed.get(AssetsService);
    expect(service).toBeTruthy();
  });
});
