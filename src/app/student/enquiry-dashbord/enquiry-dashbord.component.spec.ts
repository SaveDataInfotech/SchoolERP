import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryDashbordComponent } from './enquiry-dashbord.component';

describe('EnquiryDashbordComponent', () => {
  let component: EnquiryDashbordComponent;
  let fixture: ComponentFixture<EnquiryDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryDashbordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
