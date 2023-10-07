import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFeesComponent } from './general-fees.component';

describe('GeneralFeesComponent', () => {
  let component: GeneralFeesComponent;
  let fixture: ComponentFixture<GeneralFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
