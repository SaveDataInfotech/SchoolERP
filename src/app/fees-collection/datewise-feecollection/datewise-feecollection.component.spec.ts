import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatewiseFeecollectionComponent } from './datewise-feecollection.component';

describe('DatewiseFeecollectionComponent', () => {
  let component: DatewiseFeecollectionComponent;
  let fixture: ComponentFixture<DatewiseFeecollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatewiseFeecollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatewiseFeecollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
