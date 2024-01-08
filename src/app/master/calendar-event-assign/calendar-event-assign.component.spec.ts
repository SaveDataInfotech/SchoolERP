import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventAssignComponent } from './calendar-event-assign.component';

describe('CalendarEventAssignComponent', () => {
  let component: CalendarEventAssignComponent;
  let fixture: ComponentFixture<CalendarEventAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarEventAssignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEventAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
