import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSectionComponent } from './request-section.component';

describe('RequestSectionComponent', () => {
  let component: RequestSectionComponent;
  let fixture: ComponentFixture<RequestSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
