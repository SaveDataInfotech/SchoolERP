import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSalaryReportsComponent } from './staff-salary-reports.component';

describe('StaffSalaryReportsComponent', () => {
  let component: StaffSalaryReportsComponent;
  let fixture: ComponentFixture<StaffSalaryReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffSalaryReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffSalaryReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
