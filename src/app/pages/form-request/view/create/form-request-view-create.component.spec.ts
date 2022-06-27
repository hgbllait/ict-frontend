import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequestViewCreateComponent } from './form-request-view-create.component';

describe('FormRequestViewCreateComponent', () => {
  let component: FormRequestViewCreateComponent;
  let fixture: ComponentFixture<FormRequestViewCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRequestViewCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequestViewCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
