import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsActionComponent } from './forms-action.component';

describe('FormsComponent', () => {
  let component: FormsActionComponent;
  let fixture: ComponentFixture<FormsActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FormsActionComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
