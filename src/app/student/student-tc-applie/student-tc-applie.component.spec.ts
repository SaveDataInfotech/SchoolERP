import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTcApplieComponent } from './student-tc-applie.component';

describe('StudentTcApplieComponent', () => {
  let component: StudentTcApplieComponent;
  let fixture: ComponentFixture<StudentTcApplieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTcApplieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTcApplieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
