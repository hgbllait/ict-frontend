import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableActionComponent } from './data-table-action.component';

describe('DataTableComponent', () => {
  let component: DataTableActionComponent;
  let fixture: ComponentFixture<DataTableActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataTableActionComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
