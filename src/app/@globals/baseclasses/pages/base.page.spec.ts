import { TestBed } from '@angular/core/testing';

import { BasePage } from './base.page';

describe('BasePage', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasePage = TestBed.get(BasePage);
    expect(service).toBeTruthy();
  });
});
