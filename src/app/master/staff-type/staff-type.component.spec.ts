import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffTypeComponent } from './staff-type.component';

describe('StaffTypeComponent', () => {
  let component: StaffTypeComponent;
  let fixture: ComponentFixture<StaffTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
