import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMarkEntryComponent } from './student-mark-entry.component';

describe('StudentMarkEntryComponent', () => {
  let component: StudentMarkEntryComponent;
  let fixture: ComponentFixture<StudentMarkEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMarkEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMarkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
