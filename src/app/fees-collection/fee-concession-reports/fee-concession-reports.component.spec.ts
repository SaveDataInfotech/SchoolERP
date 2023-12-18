import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeConcessionReportsComponent } from './fee-concession-reports.component';

describe('FeeConcessionReportsComponent', () => {
  let component: FeeConcessionReportsComponent;
  let fixture: ComponentFixture<FeeConcessionReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeConcessionReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeConcessionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
