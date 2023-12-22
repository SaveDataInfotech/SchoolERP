import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMarkEntryGradeComponent } from './update-mark-entry-grade.component';

describe('UpdateMarkEntryGradeComponent', () => {
  let component: UpdateMarkEntryGradeComponent;
  let fixture: ComponentFixture<UpdateMarkEntryGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMarkEntryGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMarkEntryGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
