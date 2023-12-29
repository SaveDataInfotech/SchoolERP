import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndSubMarkReportComponent } from './ind-sub-mark-report.component';

describe('IndSubMarkReportComponent', () => {
  let component: IndSubMarkReportComponent;
  let fixture: ComponentFixture<IndSubMarkReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndSubMarkReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndSubMarkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
