import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPermissionComponent } from './staff-permission.component';

describe('StaffPermissionComponent', () => {
  let component: StaffPermissionComponent;
  let fixture: ComponentFixture<StaffPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
