import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchYearComponent } from './batch-year.component';

describe('BatchYearComponent', () => {
  let component: BatchYearComponent;
  let fixture: ComponentFixture<BatchYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
