import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTakenLeaveComponent } from './update-taken-leave.component';

describe('UpdateTakenLeaveComponent', () => {
  let component: UpdateTakenLeaveComponent;
  let fixture: ComponentFixture<UpdateTakenLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTakenLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTakenLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
