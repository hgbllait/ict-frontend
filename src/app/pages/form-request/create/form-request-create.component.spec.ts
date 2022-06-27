import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequestCreateComponent } from './form-request-create.component';

describe('FormRequestCreateComponent', () => {
  let component: FormRequestCreateComponent;
  let fixture: ComponentFixture<FormRequestCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRequestCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
