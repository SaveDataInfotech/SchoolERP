import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHostelFeesComponent } from './student-hostel-fees.component';

describe('StudentHostelFeesComponent', () => {
  let component: StudentHostelFeesComponent;
  let fixture: ComponentFixture<StudentHostelFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentHostelFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentHostelFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
