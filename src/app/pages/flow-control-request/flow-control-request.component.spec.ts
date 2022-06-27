import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowControlRequestComponent } from './flow-control-request.component';

describe('FormRequestComponent', () => {
  let component: FlowControlRequestComponent;
  let fixture: ComponentFixture<FlowControlRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowControlRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowControlRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
