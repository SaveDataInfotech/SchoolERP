import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleExpenseComponent } from './vehicle-expense.component';

describe('VehicleExpenseComponent', () => {
  let component: VehicleExpenseComponent;
  let fixture: ComponentFixture<VehicleExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
