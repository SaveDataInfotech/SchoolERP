import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLoginMenusComponent } from './staff-login-menus.component';

describe('StaffLoginMenusComponent', () => {
  let component: StaffLoginMenusComponent;
  let fixture: ComponentFixture<StaffLoginMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffLoginMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffLoginMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
