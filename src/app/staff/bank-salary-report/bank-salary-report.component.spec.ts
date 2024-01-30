import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSalaryReportComponent } from './bank-salary-report.component';

describe('BankSalaryReportComponent', () => {
  let component: BankSalaryReportComponent;
  let fixture: ComponentFixture<BankSalaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankSalaryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankSalaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
