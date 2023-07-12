import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPermissionComponent } from './student-permission.component';

describe('StudentPermissionComponent', () => {
  let component: StudentPermissionComponent;
  let fixture: ComponentFixture<StudentPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
