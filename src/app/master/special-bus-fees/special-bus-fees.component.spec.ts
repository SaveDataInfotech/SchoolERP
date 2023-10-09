import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialBusFeesComponent } from './special-bus-fees.component';

describe('SpecialBusFeesComponent', () => {
  let component: SpecialBusFeesComponent;
  let fixture: ComponentFixture<SpecialBusFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialBusFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialBusFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
