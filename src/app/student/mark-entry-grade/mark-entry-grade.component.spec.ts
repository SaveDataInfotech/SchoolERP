import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkEntryGradeComponent } from './mark-entry-grade.component';

describe('MarkEntryGradeComponent', () => {
  let component: MarkEntryGradeComponent;
  let fixture: ComponentFixture<MarkEntryGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkEntryGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkEntryGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
