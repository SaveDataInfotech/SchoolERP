import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLoanComponent } from './staff-loan.component';

describe('StaffLoanComponent', () => {
  let component: StaffLoanComponent;
  let fixture: ComponentFixture<StaffLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
