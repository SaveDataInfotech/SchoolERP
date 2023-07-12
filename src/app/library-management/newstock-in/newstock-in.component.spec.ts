import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstockInComponent } from './newstock-in.component';

describe('NewstockInComponent', () => {
  let component: NewstockInComponent;
  let fixture: ComponentFixture<NewstockInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewstockInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewstockInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
