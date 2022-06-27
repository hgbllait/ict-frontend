import { TestBed } from '@angular/core/testing';

import { RequestFormService } from './request-form.service';

describe('PaytrackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestFormService = TestBed.get(RequestFormService);
    expect(service).toBeTruthy();
  });
});
