import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkEntryGradeReportComponent } from './mark-entry-grade-report.component';

describe('MarkEntryGradeReportComponent', () => {
  let component: MarkEntryGradeReportComponent;
  let fixture: ComponentFixture<MarkEntryGradeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkEntryGradeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkEntryGradeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
