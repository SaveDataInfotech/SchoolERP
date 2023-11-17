import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformBillingComponent } from './uniform-billing.component';

describe('UniformBillingComponent', () => {
  let component: UniformBillingComponent;
  let fixture: ComponentFixture<UniformBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniformBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniformBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
