import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignmentComponent } from './user-assignment.component';

describe('UserAssignmentComponent', () => {
  let component: UserAssignmentComponent;
  let fixture: ComponentFixture<UserAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
