import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStudentEnquiryComponent } from './register-student-enquiry.component';

describe('RegisterStudentEnquiryComponent', () => {
  let component: RegisterStudentEnquiryComponent;
  let fixture: ComponentFixture<RegisterStudentEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterStudentEnquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStudentEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
