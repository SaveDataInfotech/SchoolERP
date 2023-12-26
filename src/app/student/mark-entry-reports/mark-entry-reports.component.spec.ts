import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkEntryReportsComponent } from './mark-entry-reports.component';

describe('MarkEntryReportsComponent', () => {
  let component: MarkEntryReportsComponent;
  let fixture: ComponentFixture<MarkEntryReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkEntryReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkEntryReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
