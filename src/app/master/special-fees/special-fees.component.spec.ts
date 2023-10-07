import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialFeesComponent } from './special-fees.component';

describe('SpecialFeesComponent', () => {
  let component: SpecialFeesComponent;
  let fixture: ComponentFixture<SpecialFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
