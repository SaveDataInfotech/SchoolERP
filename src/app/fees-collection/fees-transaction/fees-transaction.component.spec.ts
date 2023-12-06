import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesTransactionComponent } from './fees-transaction.component';

describe('FeesTransactionComponent', () => {
  let component: FeesTransactionComponent;
  let fixture: ComponentFixture<FeesTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeesTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
