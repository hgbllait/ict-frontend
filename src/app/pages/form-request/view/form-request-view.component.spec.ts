import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequestViewComponent } from './form-request-view.component';

describe('FormRequestViewComponent', () => {
  let component: FormRequestViewComponent;
  let fixture: ComponentFixture<FormRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
