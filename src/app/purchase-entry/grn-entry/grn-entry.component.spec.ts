import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GRNEntryComponent } from './grn-entry.component';

describe('GRNEntryComponent', () => {
  let component: GRNEntryComponent;
  let fixture: ComponentFixture<GRNEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GRNEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GRNEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
