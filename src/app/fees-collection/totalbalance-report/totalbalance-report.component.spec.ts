import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalbalanceReportComponent } from './totalbalance-report.component';

describe('TotalbalanceReportComponent', () => {
  let component: TotalbalanceReportComponent;
  let fixture: ComponentFixture<TotalbalanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalbalanceReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalbalanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
