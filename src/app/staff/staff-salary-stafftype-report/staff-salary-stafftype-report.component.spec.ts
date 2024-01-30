import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSalaryStafftypeReportComponent } from './staff-salary-stafftype-report.component';

describe('StaffSalaryStafftypeReportComponent', () => {
  let component: StaffSalaryStafftypeReportComponent;
  let fixture: ComponentFixture<StaffSalaryStafftypeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffSalaryStafftypeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffSalaryStafftypeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
