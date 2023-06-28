import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAttendanceComponent } from './vehicle-attendance.component';

describe('VehicleAttendanceComponent', () => {
  let component: VehicleAttendanceComponent;
  let fixture: ComponentFixture<VehicleAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
