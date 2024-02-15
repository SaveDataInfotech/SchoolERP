import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentNoDialogComponent } from './enrollment-no-dialog.component';

describe('EnrollmentNoDialogComponent', () => {
  let component: EnrollmentNoDialogComponent;
  let fixture: ComponentFixture<EnrollmentNoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentNoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
