import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPromoteComponent } from './student-promote.component';

describe('StudentPromoteComponent', () => {
  let component: StudentPromoteComponent;
  let fixture: ComponentFixture<StudentPromoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPromoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
