import { TestBed } from '@angular/core/testing';

import { BaseForm } from './base.form';

describe('BaseForm', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseForm = TestBed.get(BaseForm);
    expect(service).toBeTruthy();
  });
});
