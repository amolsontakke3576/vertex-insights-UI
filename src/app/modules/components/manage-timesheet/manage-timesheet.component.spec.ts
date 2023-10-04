import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTimesheetComponent } from './manage-timesheet.component';

describe('ManageTimesheetComponent', () => {
  let component: ManageTimesheetComponent;
  let fixture: ComponentFixture<ManageTimesheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTimesheetComponent]
    });
    fixture = TestBed.createComponent(ManageTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
